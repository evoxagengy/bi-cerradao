"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  LayoutDashboard,
  FileSpreadsheet
} from "lucide-react";

export default function CartasConvitePage() {

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {

    fetch("https://bi-cerradao.onrender.com/cartas")
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
              href: "/"
            },
            {
              title: "Cartas Convite",
              icon: FileSpreadsheet,
              href: "/cartas-convite",
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

      </aside>

      {/* CONTENT */}
      <section className="flex-1 overflow-auto p-6">

        {/* HEADER */}
        <div className="mb-6">

          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a3652a]">
            Gestão Operacional
          </p>

          <h1 className="mt-1 text-[34px] font-black text-[#004d33]">
            Cartas Convite
          </h1>

        </div>

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