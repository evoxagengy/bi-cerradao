"use client";

import { useEffect, useState } from "react";

export default function HeaderTop() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const formatted = now.toLocaleString("pt-BR", {
        dateStyle: "full",
        timeStyle: "short"
      });

      setDate(formatted);
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-2 flex h-[72px] items-center justify-between rounded-[22px] border border-[#eadfca] bg-white px-5 shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#004d33] shadow-md">
          <img
            src="/arvore.png"
            className="h-5 w-5 object-contain opacity-90"
          />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#a3652a]">
            Sistema Online
          </p>

          <h2 className="leading-none text-[18px] font-black text-[#004d33]">
            BI Executivo Cerradão
          </h2>

          <p className="mt-0.5 text-[11px] text-[#7b7266]">
            Gestão inteligente da entressafra industrial
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        <div className="rounded-2xl border border-[#e6dcc8] bg-[#f7f3eb] px-3 py-2">
          
          <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
            Ambiente
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            
            <div className="h-2 w-2 rounded-full bg-[#0a8f08]" />

            <span className="text-[11px] font-semibold text-[#004d33]">
              Online
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e6dcc8] bg-[#f7f3eb] px-3 py-2">
          
          <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
            Atualização
          </p>

          <p className="mt-1 text-[11px] font-semibold text-[#004d33]">
            Tempo Real
          </p>
        </div>

        <div className="min-w-[240px] rounded-2xl border border-[#e6dcc8] bg-[#f7f3eb] px-3 py-2">
          
          <p className="text-[9px] uppercase tracking-wide text-[#8f8578]">
            Data/Hora
          </p>

          <p className="mt-1 text-[11px] font-semibold text-[#004d33]">
            {date}
          </p>
        </div>

      </div>
    </div>
  );
}