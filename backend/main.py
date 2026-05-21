from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np

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
# EXCEL
# ==========================================

EXCEL_FILE = r"D:\0 - Sites\BI - Cartas Convites\backend\Controle Cartas Convites.xlsx"


# ==========================================
# HELPERS
# ==========================================

def clean_value(value):
    if pd.isna(value):
        return ""
    return str(value).strip()


# ==========================================
# DASHBOARD
# ==========================================

@app.get("/dashboard")
def dashboard():

    # ==========================================
    # LOAD EXCEL
    # ==========================================

    df = pd.read_excel(EXCEL_FILE)

    # ==========================================
    # NORMALIZAÇÃO
    # ==========================================

    print(df.columns.tolist())

    print(df.columns.tolist())

    # ==========================================
    # LIMPEZA
    # ==========================================

    # STATUS
    df["STATUS"] = (
        df["STATUS"]
        .fillna("")
        .astype(str)
        .str.upper()
        .str.strip()
    )

    df["DATA ENVIO COMPRAS"] = (
        df["DATA ENVIO COMPRAS"]
        .replace(np.nan, "", regex=True)
        .astype(str)
        .str.strip()
    )

    # limpa valores inválidos comuns
    df["DATA ENVIO COMPRAS"] = df["DATA ENVIO COMPRAS"].replace(
        ["nan", "NaT", "None"],
        ""
    )

    df.loc[
        (
            df["DATA ENVIO COMPRAS"].isna()
        ) |
        (
            df["DATA ENVIO COMPRAS"] == ""
        ),
        "STATUS"
    ] = "PENDENTE"

    # ÁREA
    df["ÁREA"] = (
        df["ÁREA"]
        .fillna("SEM ÁREA")
        .astype(str)
        .str.strip()
    )

    # COMPRADOR
    df["COMPRADOR"] = (
        df["COMPRADOR"]
        .fillna("SEM COMPRADOR")
        .astype(str)
        .str.strip()
    )

    # EMPRESA NEGOCIADA
    df["EMPRESA NEGOCIADA"] = (
        df["EMPRESA NEGOCIADA"]
        .fillna("SEM FORNECEDOR")
        .astype(str)
        .str.strip()
    )

    # TIPO DE MANUTENÇÃO
    df["TIPO DE MANUTENÇÃO"] = (
        df["TIPO DE MANUTENÇÃO"]
        .fillna("")
        .astype(str)
        .str.upper()
        .str.strip()
    )

    # ==========================================
    # KPI
    # ==========================================

    total_cartas = len(df)

    finalizadas = len(
        df[df["STATUS"].str.contains("FINAL")]
    )

    em_andamento = len(
        df[df["STATUS"].str.contains("AND")]
    )

    pendentes = (
        total_cartas
        - finalizadas
        - em_andamento
    )

    # ==========================================
    # SETORES
    # ==========================================

    setores = (
        df["ÁREA"]
        .value_counts()
        .head(5)
        .to_dict()
    )

    # ==========================================
    # COMPRADORES
    # ==========================================

    compradores = (
        df["COMPRADOR"]
        .value_counts()
        .head(5)
        .to_dict()
    )

    # ==========================================
    # EFICIÊNCIA COMPRADORES
    # ==========================================

    compradores_meta = {
        "EDVALDO": "In Loco",
        "JHONATAN": "Manut. Externa",
        "LUÃ": "Apoio"
    }

    # ==========================================
    # FERIADOS
    # ==========================================

    feriados = np.array([
        "2026-01-01",
        "2026-02-16",
        "2026-02-17",
        "2026-04-03",
        "2026-04-21",
        "2026-05-01",
        "2026-09-07",
        "2026-10-12",
        "2026-11-02",
        "2026-11-15",
        "2026-12-25"
    ], dtype="datetime64[D]")

    eficiencia_compradores = []

    for comprador, tipo in compradores_meta.items():

        comprador_df = df[
            df["COMPRADOR"]
            .str.upper()
            .str.contains(comprador, na=False)
        ]

        total = len(comprador_df)

        dentro_sla = 0

        soma_dias = 0

        cartas_validas = 0

        for _, row in comprador_df.iterrows():

            data_envio = row.get("DATA ENVIO COMPRAS")

            data_pedido = row.get("DATA DO PEDIDO")

            if pd.isna(data_envio) or pd.isna(data_pedido):
                continue

            try:

                inicio = np.datetime64(
                    pd.to_datetime(data_envio).date()
                )

                fim = np.datetime64(
                    pd.to_datetime(data_pedido).date()
                )

                dias_uteis = np.busday_count(
                    inicio,
                    fim,
                    holidays=feriados
                )

                soma_dias += dias_uteis

                cartas_validas += 1

                if dias_uteis <= 22:
                    dentro_sla += 1

            except:
                pass

        eficiencia = 0

        tempo_medio = 0

        if cartas_validas > 0:

            eficiencia = round(
                (dentro_sla / cartas_validas) * 100,
                1
            )

            tempo_medio = round(
                soma_dias / cartas_validas,
                1
            )

        eficiencia_compradores.append({

            "nome": comprador.title(),

            "tipo": tipo,

            "cartas": total,

            "eficiencia": eficiencia,

            "tempo_medio": tempo_medio

        })

    # ==========================================
    # MANUTENÇÃO
    # ==========================================

    externa = len(
        df[
            df["TIPO DE MANUTENÇÃO"]
            .str.contains("EXTER")
        ]
    )

    in_loco = len(
        df[
            df["TIPO DE MANUTENÇÃO"]
            .str.contains("LOCO")
        ]
    )

    # ==========================================
    # SLA MÉDIO
    # ==========================================

    try:

        sla = round(
            pd.to_numeric(
                df["TEMPO P/ FECHAMENTO"],
                errors="coerce"
            ).mean(),
            1
        )

        if np.isnan(sla):
            sla = 0

    except:
        sla = 0

    # ==========================================
    # ÚLTIMAS CARTAS
    # ==========================================

    ultimas = []

    latest_rows = df.tail(5).iloc[::-1]

    for _, row in latest_rows.iterrows():

        ultimas.append({

            "carta": clean_value(
                row.get("Nº CARTA CONVITE")
            ),

            "pacote": clean_value(
            row.get("PACOTES")
            ),

            "setor": clean_value(
                row.get("ÁREA")
            ),

            "tipo": clean_value(
                row.get("TIPO DE MANUTENÇÃO")
            ),

            "status": clean_value(
                row.get("STATUS")
            ),

            "comprador": clean_value(
                row.get("COMPRADOR")
            )

        })

    # ==========================================
    # CUSTO TOTAL
    # ==========================================

    try:

        custo_total = pd.to_numeric(
            df["VALOR"],
            errors="coerce"
        ).fillna(0).sum()

        custo_total = round(
            float(custo_total),
            2
        )

    except:

        custo_total = 0

    # ==========================================
    # RESPONSE
    # ==========================================

    return {

        "kpis": {
            "total_cartas": total_cartas,
            "finalizadas": finalizadas,
            "em_andamento": em_andamento,
            "pendentes": pendentes,
            "sla": sla,
        },

        "custo_total": custo_total,

        "manutencao": {
            "externa": externa,
            "in_loco": in_loco,
        },

        "setores": setores,

        "compradores": compradores,

        "eficiencia_compradores": eficiencia_compradores,

        "ultimas": ultimas

    }

# ==========================================
# CARTAS CONVITE
# ==========================================

@app.get("/cartas")
def cartas():

    df = pd.read_excel(EXCEL_FILE)

    df.columns = df.columns.str.strip()

    print(df.columns.tolist())

    rows = []

    for _, row in df.iterrows():

        rows.append({

            "status": clean_value(
                row.get("STATUS")
            ),

            "carta": clean_value(
                row.get("Nº CARTA CONVITE")
            ),

            "pacotes": clean_value(
                row.get("PACOTES")
            ),

            "area": clean_value(
                row.get("ÁREA")
            ),

            "responsavel": clean_value(
                row.get("RESPONSÁVEL")
            ),

            "comprador": clean_value(
                row.get("COMPRADOR")
            ),

            "tipo_manutencao": clean_value(
                row.get("TIPO DE MANUTENÇÃO")
            ),

            "valor": clean_value(
                row.get("VALOR")
            ),

            "pedido": clean_value(
                row.get("NR. PEDIDO")
            ),

            "empresa": clean_value(
                row.get("EMPRESA NEGOCIADA")
            ),

            "lista": clean_value(
                row.get("LISTA")
            ),

            "prazo": clean_value(
                row.get("PRAZO FINALIZAR")
            ),

            "equalizacao": clean_value(
                row.get("EQUALIZAÇÃO")
            ),

            "proposta_tecnica": clean_value(
                row.get("PROPOSTA TÉCNICA RESPONDIDA?")
            ),

            "pendente": clean_value(
                row.get("PENDENTE")
            ),

            "data_pedido": clean_value(
                row.get("DATA DO PEDIDO")
            ),

            "sc": clean_value(
                row.get("SC - Solicitação")
            ),

            "tempo_fechamento": clean_value(
                row.get("TEMPO P/ FECHAMENTO")
            ),

            "observacoes": clean_value(
                row.get("OBSERVAÇÕES")
            )

        })

    return rows