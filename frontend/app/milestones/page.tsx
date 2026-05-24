"use client";

import { useEffect, useState, useRef } from "react";

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
  ClipboardList,
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
  Legend,
} from "recharts";

const API_URL = "https://ppcm-milestones-api.onrender.com/milestones";

export default function MilestonesPage() {

    const [rows, setRows] = useState<any[]>([]);
    const [curvaData, setCurvaData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const progresso = rows.length
        ? (
            rows.filter(
            (r) =>
                r.status?.toUpperCase() === "REALIZADO"
            ).length / rows.length
        * 100
        ).toFixed(1)
        : "0";

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

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  loadData();

}, []);

const scrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {

    const container = scrollRef.current;

    if (!container) return;

    let direction = 1;

    const interval = setInterval(() => {

        const isHovered =
        container.matches(":hover");

        if (isHovered) return;

        container.scrollTop += direction;

        if (
        container.scrollTop +
        container.clientHeight >=
        container.scrollHeight
        ) {
        direction = -1;
        }

        if (container.scrollTop <= 0) {
        direction = 1;
        }

    }, 100);

    return () => clearInterval(interval);

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

const curvaRealizado = curvaData.map(
  (item: any) => {

    if (
      Number(item.semana) > weekNumber
    ) {
      return {
        ...item,
        realizado: null,
      };
    }

    return item;

  }
);

const semanaAtual =
  (curvaData as any).find(
    (item: any) =>
      Number(item.semana) === weekNumber
  );

const proximaSemana =
  (curvaData as any).find(
    (item: any) =>
      Number(item.semana) === weekNumber + 1
  );

const planejadoAtual =
  semanaAtual?.planejado || 0;

const realizadoAtual =
  semanaAtual?.realizado || 0;

  const aderenciaAtual =
  planejadoAtual > 0
    ? (
        (realizadoAtual / planejadoAtual)
        * 100
      ).toFixed(1)
    : "0";

const diferencaAtual = (
  planejadoAtual - realizadoAtual
).toFixed(1);

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

            Bruno Santos

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

          <div className="absolute right-0 top-0 h-full w-[400px] opacity-70">

        <img
        src="/fundo.png"
        className="
            h-full
            w-full
            object-cover
            opacity-70
            scale-105
            contrast-125
            brightness-95
        "
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

{/* KPI */}

<div className="grid grid-cols-5 gap-4 mb-3 mt-4 justify-center">

  <div className="rounded-[26px] border border-[#e7dcc7] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(80,60,20,0.04)]">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f9587]">
          Progresso Geral
        </p>

        <h2 className="mt-3 text-[42px] font-black leading-none text-[#004d33]">
          {progresso}%
        </h2>

      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef7d2]">

        <TrendingUp
          size={26}
          className="text-[#97c30a]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[26px] border border-[#e7dcc7] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(80,60,20,0.04)]">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f9587]">
          Atividades Totais
        </p>

        <h2 className="mt-3 text-[42px] font-black leading-none text-[#111111]">
          {rows.length}
        </h2>

      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f3f3]">

        <BarChart3
          size={26}
          className="text-[#5d5d5d]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[26px] border border-[#e7dcc7] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(80,60,20,0.04)]">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f9587]">
          Concluídas
        </p>

        <h2 className="mt-3 text-[42px] font-black leading-none text-[#004d33]">
          {
            rows.filter(
              (r) =>
                r.status?.toUpperCase() === "REALIZADO"
            ).length
          }
        </h2>

      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dcf4e4]">

        <CheckCircle2
          size={26}
          className="text-[#0b8f45]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[26px] border border-[#e7dcc7] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(80,60,20,0.04)]">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f9587]">
          Agendado
        </p>

        <h2 className="mt-3 text-[42px] font-black leading-none text-[#7a4b00]">
          {
            rows.filter((r) =>
              ["AGENDADO", "EM ANDAMENTO", "EM EXECUÇÃO"].includes(
                r.status?.toUpperCase()
              )
            ).length
          }
        </h2>

      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7e8d0]">

        <Clock3
          size={26}
          className="text-[#d97706]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[26px] border border-[#e7dcc7] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(80,60,20,0.04)]">

    <div className="flex items-start justify-between">

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f9587]">
          Em Atraso
        </p>

        <h2 className="mt-3 text-[42px] font-black leading-none text-[#9f1111]">
          {
            rows.filter(
              (r) =>
                r.status?.toUpperCase() === "ATRASADO"
            ).length
          }
        </h2>

      </div>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8dede]">

        <AlertTriangle
          size={26}
          className="text-[#d61f1f]"
        />

      </div>

    </div>

  </div>

</div>

        {/* GRID SUPERIOR */}

        <div className="grid grid-cols-3 gap-2">

            {/* CURVA S */}

            <div className="col-span-2 bg-white rounded-3xl border border-[#e3dccd] p-5 shadow-[0_2px_8px_rgba(120,94,47,0.05)] h-[470px]">

            <div className="flex justify-between items-center mb-8">

                <div>

                <h2 className="text-xl font-semibold text-[#1d1d1d]">
                    MILESTONES | Curva S - Progresso Acumulado
                </h2>

                <p className="text-sm text-sm text-gray-500 mt-1">
                    Planejado x realizado
                </p>

                </div>

            </div>

            <ResponsiveContainer width="100%" height={360}>

        <LineChart data={curvaRealizado}>

        <CartesianGrid
            strokeDasharray="3 3"
            stroke="#d1cdc5"
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
        domain={[0, 110]}
        tickLine={false}
        axisLine={false}
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
        name="Planejado"
        type="natural"
        dataKey="planejado"
        stroke="#97c30a"
        strokeWidth={4}
        dot={false}
        activeDot={{ r: 6 }}

        label={(props: any) => {

        const { x, y, index } = props;

        const item =
            (curvaData as any)[index];

        if (!item) return null;

        const semana =
            Number(item.semana);

        const percentual =
            Number(item.planejado);

        const isUltimaSemana =
            index === curvaData.length - 1;

        const mostrarEscala =

        percentual === 21.2 ||

        percentual === 51.3 ||

        percentual === 36.5 ||

        percentual === 77.2 ||

        percentual === 93 ||

        percentual === 100;

        const mostrarSemanaAtual =
            semana === weekNumber;

        const mostrarProximaSemana =
            semana === weekNumber + 1;

        if (

            !mostrarEscala &&

            !mostrarSemanaAtual &&

            !mostrarProximaSemana &&

            !isUltimaSemana

        ) {
            return null;
        }

        return (

            <text
            x={
            percentual === 100
                ? Number(x) - 8
                : x
            }
            y={Number(y) - 8}
            fill="#97bd10"
            fontSize={12}
            fontWeight="bold"
            textAnchor={
            percentual === 100
                ? "end"
                : "middle"
            }
            >
            {item.planejado}%
            </text>

        );

        }}
        />

        <Line
        name="Realizado"
        type="natural"
        dataKey="realizado"
        stroke="#004d33"
        strokeWidth={4}
        dot={false}
        activeDot={{ r: 6 }}

        label={(props: any) => {

            const { x, y, index } = props;

            const item =
            (curvaData as any)[index];

            if (!item) return null;

            const semana =
            Number(item.semana);

            if (semana !== weekNumber) {
            return null;
            }

            return (

            <text
                x={x}
                y={Number(y) - 30}
                fill="#004d33"
                fontSize={14}
                fontWeight="bold"
                textAnchor="middle"
            >
                {item.realizado}%
            </text>

            );

        }}
        />

        </LineChart>

            </ResponsiveContainer>

<p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#9f9587] mb-2 mt-2">
  Semanas
</p>

<div className="flex items-center justify-center gap-12 mt-2">

  <div className="flex items-center gap-3">

    <div className="h-[4px] w-10 rounded-full bg-[#97c30a]" />

    <p className="text-[13px] font-semibold text-[#6f6557] uppercase tracking-[0.08em]">
      Planejado
    </p>

  </div>

  <div className="flex items-center gap-3">

    <div className="h-[4px] w-10 rounded-full bg-[#004d33]" />

    <p className="text-[13px] font-semibold text-[#6f6557] uppercase tracking-[0.08em]">
      Realizado
    </p>

  </div>

</div>

{/* FOOTER */}

<div className="grid grid-cols-4 gap-4 mt-2">

  <div className="rounded-[28px] border border-[#dfe8c7] bg-gradient-to-br from-[#fbfff2] to-[#f3f8df] px-6 py-5 shadow-[0_2px_12px_rgba(151,195,10,0.06)]">

    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9cad71]">
      Planejado
    </p>

    <div className="flex items-end justify-between mt-4">

      <h3 className="text-[42px] font-black leading-none text-[#6fa300]">
        {planejadoAtual}%
      </h3>

      <div className="h-12 w-12 rounded-2xl bg-[#e7f2ba] flex items-center justify-center">

        <ClipboardList
        size={22}
        className="text-[#8dbc00]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[28px] border border-[#cfe7dc] bg-gradient-to-br from-[#f7fffb] to-[#e7f8f0] px-6 py-5 shadow-[0_2px_12px_rgba(0,77,51,0.05)]">

    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#77a392]">
      Realizado
    </p>

    <div className="flex items-end justify-between mt-4">

      <h3 className="text-[42px] font-black leading-none text-[#004d33]">
        {realizadoAtual}%
      </h3>

      <div className="h-12 w-12 rounded-2xl bg-[#d7f0e5] flex items-center justify-center">

        <CheckCircle2
          size={22}
          className="text-[#00754d]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[28px] border border-[#d9e3f7] bg-gradient-to-br from-[#fbfdff] to-[#edf4ff] px-6 py-5 shadow-[0_2px_12px_rgba(0,80,180,0.04)]">

    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7890b8]">
      Aderência
    </p>

    <div className="flex items-end justify-between mt-4">

      <h3 className="text-[42px] font-black leading-none text-[#2457a7]">
        {aderenciaAtual}%
      </h3>

      <div className="h-12 w-12 rounded-2xl bg-[#dce9ff] flex items-center justify-center">

        <BarChart3
          size={22}
          className="text-[#2d63ba]"
        />

      </div>

    </div>

  </div>

  <div className="rounded-[28px] border border-[#f0ddcf] bg-gradient-to-br from-[#fffaf7] to-[#fff1e7] px-6 py-5 shadow-[0_2px_12px_rgba(255,120,0,0.05)]">

    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#bf8d63]">
      Diferença
    </p>

    <div className="flex items-end justify-between mt-4">

      <h3 className="text-[42px] font-black leading-none text-[#d16c00]">
        {diferencaAtual}%
      </h3>

      <div className="h-12 w-12 rounded-2xl bg-[#ffe5d1] flex items-center justify-center">

        <AlertTriangle
          size={22}
          className="text-[#e97b00]"
        />

      </div>

    </div>

  </div>

</div>
</div>

        {/* PRÓXIMAS ATIVIDADES */}

        <div className="bg-white rounded-3xl border border-[#e3dccd] p-5 shadow-[0_2px_8px_rgba(120,94,47,0.05)] h-[660]">

        <div className="flex items-center justify-between mb-6">

            <div>

            <h2 className="text-[32px] font-semibold text-[#1d1d1d]">
                Próximas Atividades
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                Atividades críticas da semana atual
            </p>

            </div>

            <div className="h-10 w-10 rounded-2xl bg-[#004d33] flex items-center justify-center text-white text-sm font-bold">
            !
            </div>

        </div>

        <div
        ref={scrollRef}
        className="space-y-4 max-h-[420px] overflow-y-auto pr-2"
        >

            {(rows as any)

  .filter((item: any) => {

    const semana =
      Number(item.semana);

    return (

      item.status?.toUpperCase() === "ATRASADO"

      ||

      semana === weekNumber

      ||

      semana === weekNumber + 1

    );

  })

  .sort((a: any, b: any) => {

    const statusA =
      a.status?.toUpperCase();

    const statusB =
      b.status?.toUpperCase();

    if (
      statusA === "ATRASADO" &&
      statusB !== "ATRASADO"
    ) {
      return -1;
    }

    if (
      statusA !== "ATRASADO" &&
      statusB === "ATRASADO"
    ) {
      return 1;
    }

    return (
      Number(a.semana) -
      Number(b.semana)
    );

  })

  .slice(0, 6)

  .map((item: any, index: number) => (

    <div
      key={index}
      className={`rounded-2xl p-4 border transition-all ${
        item.status?.toUpperCase() === "ATRASADO"
          ? "border-[#ffb4b4] bg-[#fff5f5] shadow-[0_0_0_1px_rgba(255,0,0,0.04)]"
          : "border-[#ece4d3] bg-[#faf8f3]"
      }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
              item.status?.toUpperCase() === "ATRASADO"
                ? "bg-[#ffdfdf] text-[#c10000]"
                : "bg-[#e7f7ea] text-[#0b7a33]"
            }`}
          >
            {item.status}
          </p>

          <h3 className="mt-1 text-[15px] font-semibold text-[#1d1d1d] leading-snug">
            {item.topico}
          </h3>

          <p className="mt-2 text-[13px] text-[#6f6557]">
            {item.detalhamento}
          </p>

        </div>

        <div className="min-w-[90px] text-right">

          <p className="text-[11px] text-gray-400">
            Responsável
          </p>

          <p className="mt-1 text-[13px] font-bold text-[#004d33]">
            {item.responsavel}
          </p>

          <p className="mt-3 text-[11px] text-gray-400">
            Semana
          </p>

          <p className="mt-1 text-[13px] font-bold text-[#a3652a]">
            {item.semana}
          </p>

        </div>

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

    <div className="bg-white rounded-3xl border border-[#e3dccd] p-5 shadow-[0_2px_8px_rgba(120,94,47,0.05)] overflow-hidden">

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
