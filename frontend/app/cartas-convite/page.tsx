"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  LayoutDashboard,
  FileSpreadsheet,
  BarChart3,
} from "lucide-react";

export default function CartasConvitePage() {

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {

    fetch("https://bi-cerradao.onrender.com/cartas", {
    cache: "no-store"
  })
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
            setRows(data);
        }

        else if (Array.isArray(data.cartas)) {
            setRows(data.cartas);
        }

        else {
            setRows([]);
            console.error("Resposta inválida:", data);
        }

        });

  }, []);

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
      active: false
    },

    {
      title: "Cartas Convite",
      icon: FileSpreadsheet,
      href: "/cartas-convite",
      active: true
    },

    {
      title: "Milestones",
      icon: BarChart3,
      href: "/milestones",
      active: false
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
      <section className="flex flex-1 flex-col overflow-hidden">

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
                VISÃO OPERACIONAL
              </p>

              <h1 className="mt-1 text-[30px] font-black leading-none tracking-tight text-[#004d33]">
                Cartas Convites
              </h1>

              <p className="mt-1 text-[11px] text-[#6f6557]">
                Gestão e acompanhamento detalhado das cartas - ES 26/27
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

        {/* TABLE */}
        <div className="overflow-x-auto overflow-y-auto rounded-[22px] border border-[#eadfca] bg-white shadow-sm">

          <table className="min-w-[2600px] border-collapse">

            <thead className="sticky top-0 z-20 bg-[#f7f3eb]">

              <tr className="text-left text-[10px] uppercase tracking-wide text-[#6f6557]">

                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Carta</th>
                <th className="px-4 py-3">Pacotes</th>
                <th className="px-4 py-3">Área</th>
                <th className="px-4 py-3">Responsável</th>
                <th className="px-4 py-3">Comprador</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Lista</th>
                <th className="px-4 py-3">Prazo</th>
                <th className="px-4 py-3">Equalização</th>
                <th className="px-4 py-3">Proposta Técnica</th>
                <th className="px-4 py-3">Pendente</th>
                <th className="px-4 py-3">Data Pedido</th>
                <th className="px-4 py-3">SC</th>
                <th className="px-4 py-3">Tempo Fechamento</th>
                <th className="px-4 py-3">Observações</th>

              </tr>

            </thead>

            <tbody>

              {rows.map((row, index) => (

                <tr
                  key={index}
                  className="border-t border-[#f2e8d4] transition hover:bg-[#faf7f1]"
                >

                  {/* STATUS */}
                  <td className="px-4 py-3">

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold whitespace-nowrap ${
                        row.status?.toUpperCase().includes("FINAL")
                          ? "bg-[#e6f7e8] text-[#0a8f08]"
                          : row.status?.toUpperCase().includes("PEND")
                          ? "bg-[#f6e5db] text-[#8b3f00]"
                          : "bg-[#fff0e2] text-[#ff6d00]"
                      }`}
                    >
                      {row.status}
                    </span>

                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] font-semibold whitespace-nowrap">
                    {row.carta}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] min-w-[280px]">
                    {row.pacotes}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.area}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.responsavel}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.comprador}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.tipo_manutencao}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] font-bold text-[#004d33] whitespace-nowrap">
                    {row.valor}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.pedido}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.empresa}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.lista}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.prazo?.split(" ")[0]}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.equalizacao?.split(" ")[0]}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.proposta_tecnica}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.pendente}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.data_pedido}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.sc}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] whitespace-nowrap">
                    {row.tempo_fechamento}
                  </td>

                  <td className="px-4 py-3 text-[12px] text-[#111111] min-w-[320px]">
                    {row.observacoes}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}
