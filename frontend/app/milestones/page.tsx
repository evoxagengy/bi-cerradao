"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  LayoutDashboard,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Menu,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

const API_URL = "https://ppcm-milestones-api.onrender.com/milestones";

export default function MilestonesPage() {

      const [rows, setRows] = useState<any[]>([]);
      const [curvaData, setCurvaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadData() {

      try {

        const response = await fetch(API_URL);

        const data = await response.json();

        if (Array.isArray(data)) {

        setRows(data);

        const curvaResponse = await fetch(
            "https://ppcm-milestones-api.onrender.com/curva-s"
        );

        const curva = await curvaResponse.json();

        setCurvaData(curva);

        } else {

        console.error("Resposta inválida:", data);

        setRows([]);

        }

          setRows([]);

        }

       catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    }

    loadData();

  }, []);

  console.log(rows);

  const currentWeek = new Date();

const firstDay = new Date(
  currentWeek.getFullYear(),
  0,
  1
);

const pastDays = (
  currentWeek.getTime() -
  firstDay.getTime()
) / 86400000;

const weekNumber = Math.ceil(
  (pastDays + firstDay.getDay() + 1) / 7
);

  return (

    <div className="min-h-screen bg-[#f3efe6] flex">

      {/* SIDEBAR */}
      <aside className="relative flex w-[190px] flex-col overflow-hidden bg-gradient-to-b from-[#004d33] via-[#005c3d] to-[#002e1f] text-white">

        {/* BG */}
        <div className="absolute inset-0 opacity-[0.06]">
          <img
            src="/arvore.png"
            className="h-full w-full object-cover"
          />
        </div>

        {/* LOGO */}
        <div className="relative z-10 flex items-center justify-center pt-6">
          <img
            src="/logo_cerradao.png"
            className="w-[105px]"
          />
        </div>

        {/* MENU */}
        <nav className="relative z-10 mt-8 flex flex-col gap-1.5 px-3">

        {[
            {
            title: "Visão Geral",
            icon: LayoutDashboard,
            href: "/",
            active: false
            },

            {
            title: "Cartas Convite",
            icon: FileSpreadsheet,
            href: "/cartas-convite",
            active: false
            },

            {
            title: "Milestones",
            icon: BarChart3,
            href: "/milestones",
            active: true
            }

        ].map((item) => {

    const Icon = item.icon;

    return (

      <Link
        key={item.title}
        href={item.href}
        className={`group flex items-center gap-3 rounded-2xl px-3 py-2 transition-all ${
          item.active
            ? "bg-[#97c30a] text-[#004d33]"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >

        <div
          className={`rounded-xl p-1.5 ${
            item.active
              ? "bg-white/40"
              : "bg-white/5"
          }`}
        >
          <Icon size={16} />
        </div>

        <div className="text-left">

          <p className="text-[12px] font-semibold">
            {item.title}
          </p>

          <p
            className={`text-[10px] ${
              item.active
                ? "text-[#004d33]/70"
                : "text-white/40"
            }`}
          >
            Analytics
          </p>

        </div>

      </Link>

    );
  })}

</nav>

        {/* FOOTER */}
        <div className="relative z-10 mt-auto p-3">

        {/* AUTHOR */}
        <div className="mb-3 rounded-[18px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">

          <p className="text-[10px] uppercase tracking-widest text-white/40">
            Create by
          </p>

          <a
            href="https://www.linkedin.com/in/bruno-raphael-450601236/"
            target="_blank"
            className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-[#97c30a] transition hover:text-white"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.66H6.26V17H8.34M7.3 9.73A1.2 1.2 0 1 0 7.3 7.33A1.2 1.2 0 0 0 7.3 9.73M17.74 17V13.31C17.74 11.33 16.68 10.41 15.27 10.41C14.13 10.41 13.62 11.04 13.34 11.48V10.66H11.26C11.29 11.2 11.26 17 11.26 17H13.34V13.46C13.34 13.27 13.35 13.08 13.41 12.94C13.57 12.56 13.93 12.17 14.54 12.17C15.34 12.17 15.66 12.78 15.66 13.68V17H17.74Z"/>
            </svg>

            Bruno Raphael

          </a>

        </div>

          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">

            <p className="text-[10px] uppercase tracking-widest text-white/40">
              Sistema
            </p>

            <div className="mt-2 flex items-center gap-2">

              <div className="h-2 w-2 rounded-full bg-[#97c30a]" />

              <p className="text-[12px] font-semibold">
                Online
              </p>

            </div>

            <p className="mt-2 text-[11px] text-white/50">
              Integração SharePoint
            </p>

          </div>

        </div>

      </aside>


      {/* CONTENT */}

      <main className="flex flex-1 flex-col overflow-hidden">

        {/* HEADER */}
        <header className="relative overflow-hidden border-b border-[#eadfca] bg-[#f4efe6] px-4 py-2">

          <div className="absolute right-0 top-0 h-full w-[400px] opacity-10">

            <img
              src="/fundo.png"
              className="h-full w-full object-cover"
            />

          </div>

          <div className="relative z-10 flex items-center justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3652a]">
                Dashboard
              </p>

              <h1 className="mt-1 text-[30px] font-black leading-none tracking-tight text-[#004d33]">
                Milestones
              </h1>

              <p className="mt-1 text-[11px] text-[#6f6557]">
                Visão de acompanhamento dos Milestones 360 - Entressafra
              </p>

            </div>

              <div className="flex items-center gap-3">

                {/* AMBIENTE */}
                <div className="rounded-2xl border border-[#e3d7c0] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(120,94,47,0.05)]">

                  <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
                    Ambiente
                  </p>

                  <div className="mt-1 flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-[#0a8f08]" />

                    <span className="text-[11px] font-bold text-[#004d33]">
                      Online
                    </span>

                  </div>

                </div>

                {/* UPDATE */}
                <div className="rounded-2xl border border-[#e3d7c0] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(120,94,47,0.05)]">

                  <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
                    Atualização
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-[#004d33]">
                    Tempo Real
                  </p>

                </div>

                {/* DATA */}
                <div className="rounded-2xl border border-[#e3d7c0] bg-white px-4 py-2 shadow-[0_2px_8px_rgba(120,94,47,0.05)]">

                  <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
                    Data/Hora
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-[#004d33]">
                    {new Date().toLocaleString("pt-BR")}
                  </p>

                </div>

              </div>

          </div>

        </header>

        {/* FILTROS */}

        <div className="flex justify-end gap-4 mb-6">

            <div className="bg-white border border-[#e3dccd] rounded-2xl px-5 py-3 shadow-[0_2px_8px_rgba(120,94,47,0.05)] min-w-[260px]">
            <p className="text-sm text-gray-500">
                01/01/2026 - 31/12/2026
            </p>
            </div>

            <div className="bg-white border border-[#e3dccd] rounded-2xl px-5 py-3 shadow-[0_2px_8px_rgba(120,94,47,0.05)] min-w-[220px]">
            <p className="text-sm text-gray-500">
                Todos os setores
            </p>
            </div>

            <button className="
            bg-[#0b5d3b]
            hover:bg-[#08452c]
            transition
            text-white
            rounded-2xl
            px-6
            py-3
            shadow-[0_2px_8px_rgba(120,94,47,0.05)]
            font-medium
            ">
            Atualizar dados
            </button>

        </div>

        {/* KPI */}

        <div className="grid grid-cols-5 gap-5 mb-6">

            <Card
            title="PROGRESSO GERAL"
            value="68,4%"
            subtitle="+8,7% vs semana anterior"
            color="lime"
            />

            <Card
            title="ATIVIDADES TOTAIS"
            value={rows.length}
            subtitle="+12 novas esta semana"
            color="gray"
            />

            <Card
            title="CONCLUÍDAS"
            value={
            rows.filter(
                (r) =>
                r.status?.toUpperCase() === "REALIZADO"
            ).length
            }
            subtitle="67,7% do total"
            color="green"
            />

            <Card
            title="EM ANDAMENTO"
            value={
            rows.filter((r) =>
                ["AGENDADO", "EM ANDAMENTO", "EM EXECUÇÃO"].includes(
                r.status?.toUpperCase()
                )
            ).length
            }
            subtitle="25,8% do total"
            color="orange"
            />

            <Card
            title="EM ATRASO"
            value={
            rows.filter(
                (r) =>
                r.status?.toUpperCase() === "ATRASADO"
            ).length
            }
            subtitle="6,5% do total"
            color="red"
            />

        </div>

        {/* GRID SUPERIOR */}

        <div className="grid grid-cols-3 gap-5">

            {/* CURVA S */}

            <div className="col-span-2 bg-white rounded-3xl border border-[#e3dccd] p-5 shadow-[0_2px_8px_rgba(120,94,47,0.05)] h-[470px]">

            <div className="flex justify-between items-center mb-8">

                <div>

                <h2 className="text-xl font-semibold text-[#1d1d1d]">
                    Curva S - Progresso Acumulado
                </h2>

                <p className="text-sm text-sm text-gray-500 mt-1">
                    Planejado x realizado
                </p>

                </div>

                <button className="border border-[#e3dccd] rounded-xl px-4 py-2 text-sm">
                Semanal
                </button>

            </div>

            <ResponsiveContainer width="100%" height={360}>

        <LineChart data={curvaData}>

        <CartesianGrid
            strokeDasharray="3 3"
            stroke="#ece7dc"
        />

        <XAxis
            dataKey="semana"
            tickLine={false}
            axisLine={false}
            tick={{
            fontSize: 11,
            fill: "#6f6557"
            }}
        />

        <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{
            fontSize: 11,
            fill: "#6f6557"
            }}
        />

        <Tooltip
            formatter={(value: any) => [`${value}%`]}
            contentStyle={{
            borderRadius: "14px",
            border: "1px solid #eadfca",
            fontSize: "12px",
            }}
        />

        <ReferenceLine
            x={String(weekNumber)}
            stroke="#ff6d00"
            strokeDasharray="6 6"
            label={{
            value: "Semana Atual",
            position: "top",
            fill: "#ff6d00",
            fontSize: 11,
            }}
        />

        <Line
            type="natural"
            dataKey="planejado"
            stroke="#97c30a"
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 6 }}
        />

        <Line
            type="natural"
            dataKey="realizado"
            stroke="#004d33"
            strokeWidth={4}
            dot={false}
            activeDot={{ r: 6 }}
        />

        </LineChart>

            </ResponsiveContainer>

            {/* FOOTER */}

            <div className="grid grid-cols-4 gap-4 mt-6">

                {[
                ["PLANEJADO", "68,4%"],
                ["REALIZADO", "68,4%"],
                ["PREVISTO", "100%"],
                ["DIFERENÇA", "0,0%"],
                ].map((item) => (

                <div
                    key={item[0]}
                    className="bg-[#fafafa] border border-[#e3dccd] rounded-2xl p-4"
                >

                    <p className="text-xs text-gray-400">
                    {item[0]}
                    </p>

                    <h3 className="text-3xl font-bold text-[#0b5d3b] mt-2">
                    {item[1]}
                    </h3>

                </div>

                ))}

            </div>

            </div>

            {/* RESPONSÁVEIS */}

            <div className="bg-white rounded-3xl border border-[#e3dccd] p-5 shadow-[0_2px_8px_rgba(120,94,47,0.05)] h-[470px]">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-xl font-semibold text-[#1d1d1d]">
                Entrega por Responsável
                </h2>

                <div className="bg-[#0b5d3b] text-white rounded-xl px-3 py-2 text-sm">
                %
                </div>

            </div>

            <div className="space-y-8">

                {[
                ["Jhonatan", "42,6%", "w-[85%]"],
                ["Edvaldo", "25,8%", "w-[65%]"],
                ["Luã", "15,3%", "w-[45%]"],
                ["Leandro", "8,7%", "w-[25%]"],
                ["Outros", "7,6%", "w-[20%]"],
                ].map((item, index) => (

                <div key={index}>

                    <div className="flex justify-between text-sm mb-2">

                    <span className="font-medium">
                        {item[0]}
                    </span>

                    <span className="font-semibold">
                        {item[1]}
                    </span>

                    </div>

                    <div className="w-full h-4 bg-[#f1f1f1] rounded-full overflow-hidden">

                    <div
                        className={`h-full rounded-full ${item[2]}`}
                        style={{
                        background:
                            index === 0
                            ? "#0b5d3b"
                            : index === 1
                            ? "#1f7a4d"
                            : index === 2
                            ? "#97c30a"
                            : index === 3
                            ? "#ff6b00"
                            : "#652e17"
                        }}
                    />

                    </div>

                </div>

                ))}

            </div>

            </div>

        </div>

        </main>

    </div>

  );
}

function Card({
  title,
  value,
  icon,
  color,
}: any) {

  return (

    <div className="bg-white rounded-3xl border border-[#e3dccd] p-5 shadow-[0_2px_8px_rgba(120,94,47,0.05)]">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-4 text-[#1d1d1d]">
            {value}
          </h2>

        </div>

        <div
          className={`
            w-14 h-14 rounded-2xl flex items-center justify-center

            ${color === "green" && "bg-green-100 text-green-700"}
            ${color === "lime" && "bg-lime-100 text-lime-700"}
            ${color === "orange" && "bg-orange-100 text-orange-700"}
            ${color === "red" && "bg-red-100 text-red-700"}
          `}
        >
          {icon}
        </div>

      </div>

    </div>

  );
}