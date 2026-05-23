from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import requests
from io import BytesIO
import time

app = FastAPI()

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# SHAREPOINT
# ==========================================

MILESTONES_URL = "https://uscerradao-my.sharepoint.com/:x:/g/personal/bruno_santos_cerradao_com_br/IQDG4jL7aJDyTbqReQvatnArAdNWd4rr4hVk6JvS83Nj5a4?download=1"

# ==========================================
# CACHE
# ==========================================

cached_df = None
last_update = 0
CACHE_TIME = 300

# ==========================================
# HELPERS
# ==========================================

def clean_value(value):

    if pd.isna(value):
        return ""

    return str(value).strip()

# ==========================================
# LOAD EXCEL
# ==========================================

def load_milestones():

    global cached_df
    global last_update

    now = time.time()

    if cached_df is not None and (now - last_update < CACHE_TIME):
        return cached_df

    response = requests.get(
        MILESTONES_URL,
        headers={
            "Cache-Control": "no-cache"
        },
        timeout=30
    )

    excel_file = BytesIO(response.content)

    df = pd.read_excel(
        excel_file,
        sheet_name="BASE_CURVA",
        engine="openpyxl",
        usecols=[
            "ASSUNTO",
            "TÓPICO",
            "DETALHAMENTO DA AÇÃO",
            "RESPONSÁVEL",
            "MÊS",
            "DATA DE INICIO",
            "DATA DE FIM",
            "TÉRMINO REAL",
            "SEMANA",
            "STATUS",
            "AVANÇO",
            "COD_UNIC",
            "OBSERVAÇÃO"
        ]
    )

    df.columns = df.columns.str.strip()

    df = df.fillna("").astype(str)

    cached_df = df

    last_update = now

    return df

# ==========================================
# MILESTONES
# ==========================================

@app.get("/milestones")

def milestones():

    df = load_milestones()

    rows = []

    for _, row in df.iterrows():

        rows.append({

            "assunto": clean_value(
                row.get("ASSUNTO")
            ),

            "topico": clean_value(
                row.get("TÓPICO")
            ),

            "detalhamento": clean_value(
                row.get("DETALHAMENTO DA AÇÃO")
            ),

            "responsavel": clean_value(
                row.get("RESPONSÁVEL")
            ),

            "mes": clean_value(
                row.get("MÊS")
            ),

            "data_inicio": clean_value(
                row.get("DATA DE INICIO")
            ),

            "data_fim": clean_value(
                row.get("DATA DE FIM")
            ),

            "termino_real": clean_value(
                row.get("TÉRMINO REAL")
            ),

            "semana": clean_value(
                row.get("SEMANA")
            ),

            "status": clean_value(
                row.get("STATUS")
            ),

            "avanco": clean_value(
                row.get("AVANÇO")
            ),

            "cod_unic": clean_value(
                row.get("COD_UNIC")
            ),

            "observacao": clean_value(
                row.get("OBSERVAÇÃO")
            )

        })

    return rows

@app.get("/curva-s")
def curva_s():

    df = load_milestones()

    semanas = sorted(
        df["SEMANA"].dropna().unique()
    )

    resultado = []

    acumulado_planejado = 0
    acumulado_realizado = 0

    for semana in semanas:

        semana_df = df[
            df["SEMANA"] == semana
        ]

        planejado = len(semana_df)

        realizado = len(
            semana_df[
                (
                    semana_df["STATUS"]
                    .astype(str)
                    .str.upper()
                    == "REALIZADO"
                )
                |
                (
                    semana_df["AVANÇO"]
                    .astype(str)
                    .str.contains("100")
                )
            ]
        )

        acumulado_planejado += planejado
        acumulado_realizado += realizado

        resultado.append({

            "semana": str(semana),

            "planejado":
                acumulado_planejado,

            "realizado":
                acumulado_realizado

        })

    return resultado