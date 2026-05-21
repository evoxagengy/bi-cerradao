"use client";

import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Bar,
  Area,
  AreaChart,
  CartesianGrid,
  LabelList
} from "recharts";

// ==========================================
// TYPES
// ==========================================

interface SectorChartProps {
  data: {
    setor: string;
    qtd: number;
  }[];
}

interface DonutChartProps {
  externa: number;
  inLoco: number;
}

interface RadialPerformanceProps {
  total: number;
  finalizadas: number;
  andamento: number;
  pendentes: number;
}

// ==========================================
// COLORS
// ==========================================

const COLORS = ["#004d33", "#97c30a"];

// ==========================================
// SECTOR CHART
// ==========================================

export function SectorChartCard({
  data
}: SectorChartProps) {

  return (
    <div className="rounded-[22px] border border-[#eadfca] bg-white p-4 shadow-sm">

      <div className="mb-2 flex items-center justify-between">

        <h3 className="text-[15px] font-bold text-[#004d33]">
          Quantidade por Setor
        </h3>

        <span className="text-[11px] text-[#8f8578]">
          2026
        </span>

      </div>

      <div className="h-[190px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis
              dataKey="setor"
              tick={{
                fill: "#6f6557",
                fontSize: 11
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="qtd"
              radius={[6, 6, 0, 0]}
              barSize={32}
              fill="#004d33"
            >

              <LabelList
                dataKey="qtd"
                position="insideTop"
                fill="#ffffff"
                fontSize={11}
                fontWeight={700}
              />

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
}

// ==========================================
// DONUT CHART
// ==========================================

export function DonutChartCard({
  externa,
  inLoco
}: DonutChartProps) {

  const donutData = [
    {
      name: "Externa",
      value: externa || 0
    },
    {
      name: "In Loco",
      value: inLoco || 0
    }
  ];

  const total = (externa || 0) + (inLoco || 0);

  return (

    <div className="rounded-[22px] border border-[#eadfca] bg-white p-4 shadow-sm">

      <h3 className="text-[15px] font-bold text-[#004d33]">
        Manutenção Externa vs In Loco
      </h3>

      <div className="relative mt-2 flex h-[190px] items-center justify-center">

        <div className="absolute h-[120px] w-[120px] rounded-full bg-[#97c30a]/10 blur-2xl" />

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={donutData}
              dataKey="value"
              innerRadius={42}
              outerRadius={62}
              paddingAngle={4}
            >

              {donutData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

        <div className="absolute text-center">

          <h2 className="text-2xl font-black text-[#111111]">
            {total}
          </h2>

          <p className="text-[11px] uppercase tracking-wide text-[#8f8578]">
            Total
          </p>

        </div>

      </div>

      <div className="-mt-2 flex items-center justify-center gap-8">

        <div className="flex items-center gap-2">

          <div className="h-2.5 w-2.5 rounded-full bg-[#004d33]" />

          <p className="text-[11px] text-[#6f6557]">
            Externa ({externa || 0})
          </p>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-2.5 w-2.5 rounded-full bg-[#97c30a]" />

          <p className="text-[11px] text-[#6f6557]">
            In Loco ({inLoco || 0})
          </p>

        </div>

      </div>

    </div>
  );
}

// ==========================================
// RADIAL PERFORMANCE
// ==========================================

interface RadialPerformanceProps {
  total: number;
  finalizadas: number;
  andamento: number;
  pendentes: number;
}

export function RadialPerformanceCard({
  total,
  finalizadas,
  andamento,
  pendentes
}: RadialPerformanceProps) {

  const finalizadasPct = total
    ? ((finalizadas / total) * 100).toFixed(1)
    : "0";

  const andamentoPct = total
    ? ((andamento / total) * 100).toFixed(1)
    : "0";

  const pendentesPct = total
    ? ((pendentes / total) * 100).toFixed(1)
    : "0";

  const eficiencia = total
    ? Math.round((finalizadas / total) * 100)
    : 0;

  return (

    <div className="rounded-[22px] border border-[#eadfca] bg-white p-5 shadow-sm">

      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between">

        <div>

          <h3 className="text-[15px] font-bold text-[#004d33]">
            Status das Cartas
          </h3>

          <p className="mt-1 text-[11px] text-[#7c7265]">
            Performance operacional
          </p>

        </div>

        <div className="rounded-xl bg-[#eef8df] px-3 py-1 text-[11px] font-bold text-[#5c7f00]">
          ONLINE
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex gap-3">

        {/* CHART */}
        <div className="relative flex w-[220px] items-center justify-center">

        <motion.svg
          initial={{
            scale: 0.5,
            opacity: 0,
            rotate: -180
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
          width="220"
          height="220"
          viewBox="0 0 300 300"
          className="-rotate-90"
        >

          {/* BG OUTER */}
          <circle
            cx="150"
            cy="150"
            r="92"
            fill="none"
            stroke="#f1eadf"
            strokeWidth="14"
          />

          {/* FINALIZADAS */}
          <circle
            cx="150"
            cy="150"
            r="92"
            fill="none"
            stroke="#0a8f08"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${
              (578 * Number(finalizadasPct)) / 100
            } 578`}
          />

          {/* BG MIDDLE */}
          <circle
            cx="150"
            cy="150"
            r="66"
            fill="none"
            stroke="#f5efe5"
            strokeWidth="12"
          />

          {/* ANDAMENTO */}
          <circle
            cx="150"
            cy="150"
            r="74"
            fill="none"
            stroke="#ff6d00"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${
              (414 * Number(andamentoPct)) / 100
            } 414`}
          />

          {/* BG INNER */}
          <circle
            cx="150"
            cy="150"
            r="56"
            fill="none"
            stroke="#f5efe5"
            strokeWidth="10"
          />

          {/* PENDENTES */}
          <circle
            cx="150"
            cy="150"
            r="48"
            fill="none"
            stroke="#8b3f00"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${
              (264 * Number(pendentesPct)) / 100
            } 264`}
          />

        </motion.svg>

          {/* CENTER */}
          <div className="absolute text-center">

            <h2 className="text-[22px] font-black leading-none text-[#004d33]">
            {eficiencia}%
            </h2>

            <p className="mt-1 text-[9px] uppercase tracking-wide text-[#8f8578]">
              Eficiência
            </p>

          </div>

        </div>

        {/* LEGEND */}
        <div className="flex flex-1 flex-col justify-center">

          {/* FINALIZADAS */}
          <div className="flex items-center justify-between border-b border-[#f2e8d4] py-4">

            <div className="flex items-center gap-3">

              <div className="h-4 w-4 rounded-full bg-[#0a8f08]" />

              <p className="text-[12px] font-medium text-[#2f2f2f]">
                Finalizadas
              </p>

            </div>

            <div className="flex items-center gap-6">

              <span className="text-[12px] font-bold text-[#111111]">
                {finalizadasPct}%
              </span>

              <span className="w-[35px] text-right text-[13px] font-black text-[#004d33]">
                {finalizadas}
              </span>

            </div>

          </div>

          {/* ANDAMENTO */}
          <div className="flex items-center justify-between border-b border-[#f2e8d4] py-4">

            <div className="flex items-center gap-3">

              <div className="h-4 w-4 rounded-full bg-[#ff6d00]" />

              <p className="text-[14px] font-medium text-[#2f2f2f]">
                Em andamento
              </p>

            </div>

            <div className="flex items-center gap-6">

              <span className="text-[14px] font-bold text-[#111111]">
                {andamentoPct}%
              </span>

              <span className="w-[45px] text-right text-[15px] font-black text-[#004d33]">
                {andamento}
              </span>

            </div>

          </div>

          {/* PENDENTES */}
          <div className="flex items-center justify-between py-4">

            <div className="flex items-center gap-3">

              <div className="h-4 w-4 rounded-full bg-[#8b3f00]" />

              <p className="text-[14px] font-medium text-[#2f2f2f]">
                Pendentes
              </p>

            </div>

            <div className="flex items-center gap-6">

              <span className="text-[14px] font-bold text-[#111111]">
                {pendentesPct}%
              </span>

              <span className="w-[45px] text-right text-[15px] font-black text-[#004d33]">
                {pendentes}
              </span>

            </div>

          </div>

          {/* CARD */}
          <div className="mt-3 rounded-[16px] border border-[#efe4cf] bg-[#faf8f3] p-4">

            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8f8578]">
              Taxa de Retorno
            </p>

            <div className="mt-2 flex items-end justify-between">

              <h2 className="text-3xl font-black leading-none text-[#111111]">
                {finalizadasPct}%
              </h2>

              <div className="flex items-end gap-1">

                <div className="h-2 w-5 rounded-full bg-[#97c30a]/40" />
                <div className="h-4 w-5 rounded-full bg-[#97c30a]/60" />
                <div className="h-3 w-5 rounded-full bg-[#97c30a]/50" />
                <div className="h-5 w-5 rounded-full bg-[#97c30a]/70" />
                <div className="h-8 w-5 rounded-full bg-[#97c30a]" />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// ==========================================
// EVOLUTION CHART
// ==========================================

const evolutionData = [
  { mes: "Jan", cartas: 120 },
  { mes: "Fev", cartas: 190 },
  { mes: "Mar", cartas: 240 },
  { mes: "Abr", cartas: 280 },
  { mes: "Mai", cartas: 350 },
  { mes: "Jun", cartas: 420 },
  { mes: "Jul", cartas: 510 }
];

interface CustoTotalProps {
  valor: number;
}

export function CustoTotalCard({
  valor
}: CustoTotalProps) {

  const valorFormatado = Number(valor || 0)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const ORCAMENTO_MAXIMO = 32000000;

const percentual = Math.min(
  (Number(valor || 0) / ORCAMENTO_MAXIMO) * 100,
  100
);

const progressColor =
  percentual < 40
    ? "from-[#97c30a] to-[#004d33]"
    : percentual < 70
    ? "from-[#ffb800] to-[#ff6d00]"
    : "from-[#ff6d00] to-[#8b0000]";

  return (

    <div className="rounded-[22px] border border-[#eadfca] bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-[15px] font-bold text-[#004d33]">
            Custo Estimado Geral
          </h3>

          <p className="mt-1 text-[11px] text-[#7c7265]">
            Soma total das cartas convite
          </p>

        </div>

        <div className="rounded-xl bg-[#eef8df] px-3 py-1 text-[11px] font-bold text-[#5c7f00]">
          LIVE
        </div>

      </div>

      <div className="mt-8">

        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8f8578]">
          Valor Total
        </p>

        <h2 className="mt-2 text-[42px] font-black leading-none text-[#004d33]">
          {valorFormatado}
        </h2>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-[#ece6db]">

        <motion.div
          initial={{
            width: 0
          }}
          animate={{
            width: `${percentual}%`
          }}
          transition={{
            duration: 2,
            ease: "easeOut"
          }}
          className={`h-full rounded-full bg-gradient-to-r ${progressColor}`}
        />

        </div>

        <div className="mt-3 flex items-center justify-between">

          <p className="text-[11px] text-[#7c7265]">
            Orçamento ES: R$ 32.000.000
          </p>

          <span className="text-[11px] font-bold text-[#004d33]">
            Atualizado em tempo real
          </span>

        </div>

      </div>

    </div>
  );
}