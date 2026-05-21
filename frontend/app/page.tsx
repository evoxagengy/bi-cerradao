"use client";

import { useEffect, useState } from "react";

import {
  DonutChartCard,
  SectorChartCard,
  RadialPerformanceCard,
  CustoTotalCard
} from "@/components/Charts";

import TableCard from "@/components/Table";

import Link from "next/link";

import {
  LayoutDashboard,
  FileSpreadsheet,
} from "lucide-react";

export default function Home() {

  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {

  const fetchDashboard = () => {
  
    fetch("https://bi-cerradao.onrender.com/dashboard", {
      cache: "no-store"
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
      });

    };

    fetchDashboard();

    const interval = setInterval(() => {

      fetchDashboard();

    }, 30000);

    return () => clearInterval(interval);

  }, []);

  // =========================
  // DATA
  // =========================

  const kpis = dashboard?.kpis || {};

  const manutencao = dashboard?.manutencao || {};

  const ultimas = dashboard?.ultimas || [];

  const setores = dashboard?.setores || {};

  const fornecedores = dashboard?.fornecedores
    ? Object.entries(dashboard.fornecedores)
    : [];

  return (
    <main className="flex h-screen overflow-hidden bg-[#f4efe6]">

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
      active: true
    },
    {
      title: "Cartas Convite",
      icon: FileSpreadsheet,
      href: "/cartas-convite"
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
      <section className="flex flex-1 flex-col overflow-hidden">

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
                Cartas Convite
              </h1>

              <p className="mt-1 text-[11px] text-[#6f6557]">
                Gestão e acompanhamento da entressafra industrial
              </p>

            </div>

              <div className="flex items-center gap-3">

                {/* AMBIENTE */}
                <div className="rounded-2xl border border-[#e3d7c0] bg-white px-3 py-2 shadow-sm">

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
                <div className="rounded-2xl border border-[#e3d7c0] bg-white px-3 py-2 shadow-sm">

                  <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
                    Atualização
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-[#004d33]">
                    Tempo Real
                  </p>

                </div>

                {/* DATA */}
                <div className="rounded-2xl border border-[#e3d7c0] bg-white px-4 py-2 shadow-sm">

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

        {/* DASHBOARD */}
        <div className="flex-1 overflow-hidden p-2">

          {/* KPI */}
          <div className="mt-2 grid grid-cols-4 gap-2">

            {[
              {
                title: "TOTAL DE CARTAS",
                value: kpis.total_cartas || 0,
                color: "#004d33"
              },
              {
                title: "FINALIZADAS",
                value: kpis.finalizadas || 0,
                color: "#0a8f08"
              },
              {
                title: "EM ANDAMENTO",
                value: kpis.em_andamento || 0,
                color: "#ff6d00"
              },
              {
                title: "PENDENTES",
                value: kpis.pendentes || 0,
                color: "#8b3f00"
              }
            ].map((card) => (

             <div
              key={card.title}
              className="rounded-[18px] border border-[#eadfca] bg-white px-3 py-2 shadow-sm"
            >

              {/* TOP */}
              <div className="flex items-center gap-2">

                <div
                  className="h-3.5 w-3.5 rounded-full"
                  style={{
                    background: card.color
                  }}
                />

                <p className="text-[10px] font-bold uppercase tracking-wide text-[#8f8578]">
                  {card.title}
                </p>

              </div>

              {/* VALUE */}
              <h2 className="mt-2 text-[38px] font-black leading-none text-[#111111]">
                {card.value}
              </h2>

            </div>

            ))}

          </div>

          {/* MAIN GRID */}
          <div className="mt-2 grid h-[calc(100vh-255px)] grid-cols-12 gap-2">

      {/* LEFT */}
      <div className="col-span-4 flex flex-col gap-2">

        <SectorChartCard
        data={Object.entries(setores).map(
          ([setor, qtd]) => ({
            setor,
            qtd: Number(qtd)
          })
        )}
        />

      {/* EFICIÊNCIA COMPRADORES */}
      <div className="rounded-[22px] border border-[#eadfca] bg-white p-4 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="text-[15px] font-bold text-[#004d33]">
              Eficiência Compradores
            </h3>

            <p className="mt-1 text-[11px] text-[#7c7265]">
              SLA até 22 dias úteis
            </p>

          </div>

          <span className="text-[11px] text-[#8f8578]">
            LIVE
          </span>

        </div>

        <div className="space-y-4">

          {dashboard?.eficiencia_compradores?.map((item: any) => {

            const color =
              item.eficiencia >= 80
                ? "#0a8f08"
                : item.eficiencia >= 50
                ? "#ff6d00"
                : "#8b3f00";

            return (

              <div
                key={item.nome}
                className="rounded-[18px] border border-[#efe4cf] bg-[#faf8f3] p-3"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="text-[14px] font-bold text-[#004d33]">
                      {item.nome}
                    </h4>

                    <p className="text-[10px] text-[#8f8578]">
                      {item.tipo}
                    </p>

                  </div>

                  <div className="text-right">

                  <p
                    className="text-[22px] font-black leading-none"
                    style={{
                      color
                    }}
                  >
                    {item.cartas === 0
                      ? "N/A"
                      : `${item.eficiencia}%`}
                  </p>

                    <p className="text-[10px] text-[#8f8578]">
                      eficiência
                    </p>

                  </div>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ece6db]">

                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: item.cartas === 0
                      ? "0%"
                      : `${item.eficiencia}%`,
                      background: color
                    }}
                  />

                </div>

                <div className="mt-3 flex items-center justify-between text-[11px]">

                  <span className="text-[#6f6557]">
                    {item.cartas} cartas
                  </span>

                  <span
                    className="font-semibold"
                    style={{
                      color
                    }}
                  >
                    {item.cartas === 0
                    ? "Sem cartas"
                    : item.eficiencia >= 80
                    ? "Excelente"
                    : item.eficiencia >= 60
                    ? "Atenção"
                    : "Crítico"}
                  </span>

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </div>

            {/* CENTER */}
            <div className="col-span-4 flex flex-col gap-2">

              <DonutChartCard
                externa={Number(manutencao.externa) || 0}
                inLoco={Number(manutencao.in_loco) || 0}
              />

              <TableCard rows={ultimas} />

            </div>

            {/* RIGHT */}
            <div className="col-span-4 flex flex-col gap-2">

              <RadialPerformanceCard
                total={Number(kpis.total_cartas) || 0}
                finalizadas={Number(kpis.finalizadas) || 0}
                andamento={Number(kpis.em_andamento) || 0}
                pendentes={Number(kpis.pendentes) || 0}
              />

              <CustoTotalCard
              valor={dashboard?.custo_total || 0}
             />

              {/* SLA */}
              <div className="rounded-[22px] border border-[#eadfca] bg-white p-4 shadow-sm">

                <p className="text-[10px] uppercase tracking-wide text-[#8f8578]">
                  SLA Médio
                </p>

                <h2 className="mt-2 text-4xl font-black text-[#004d33]">
                  {kpis.sla || 0}
                </h2>

                <p className="mt-1 text-[11px] text-[#0a8f08]">
                  Indicador operacional médio
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}
