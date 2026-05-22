interface TableRow {
  carta: string;
  pacote: string;
  setor: string;
  tipo: string;
  status: string;
  comprador: string;
}

interface TableProps {
  rows: TableRow[];
}

export default function TableCard({
  rows
}: TableProps) {

  return (
    <div className="rounded-[22px] border border-[#eadfca] bg-white p-3 shadow-sm">

      {/* HEADER */}
      <div className="mb-2 flex items-center justify-between">

        <div>

          <h3 className="text-[15px] font-bold text-[#004d33]">
            Últimas Cartas Convite
          </h3>

          <p className="mt-0.5 text-[11px] text-[#7c7265]">
            Gestão operacional da entressafra
          </p>

        </div>

        <button className="rounded-xl border border-[#eadfca] px-3 py-1 text-[11px] font-medium text-[#004d33] transition hover:bg-[#f7f3eb]">
          Ver Todas
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-[16px] border border-[#efe4cf]">

        <table className="w-full border-collapse">

          <thead className="bg-[#f7f3eb]">

            <tr className="text-left text-[9px] uppercase tracking-wide text-[#8f8578]">

              <th className="px-3 py-2 font-semibold">
                Nº Carta
              </th>

              <th className="px-3 py-2 font-semibold">
              Pacotes
              </th>

              <th className="px-3 py-2 font-semibold">
                Setor
              </th>

              <th className="px-3 py-2 font-semibold">
                Tipo
              </th>

              <th className="px-3 py-2 font-semibold">
                Status
              </th>

              <th className="px-3 py-2 font-semibold">
                Comprador
              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row) => (

              <tr
                key={row.carta}
                className="border-t border-[#f2e8d4] transition hover:bg-[#faf7f1]"
              >

                <td className="px-3 py-2 text-[11px] font-semibold text-[#111111]">
                  {row.carta}
                </td>

                <td className="px-3 py-2 text-[11px] text-[#4f4a42]">
                  {row.pacote}
                </td>

                <td className="px-3 py-2 text-[11px] text-[#4f4a42]">
                  {row.setor}
                </td>

                <td className="px-3 py-2 text-[11px] text-[#4f4a42]">
                  {row.tipo}
                </td>

                <td className="px-3 py-2">

                  <span
                    className={`rounded-full px-2 py-[4px] text-[9px] font-bold ${
                      row.status?.toUpperCase().includes("FINAL")
                        ? "bg-[#e6f7e8] text-[#0a8f08]"
                        : row.status?.toUpperCase().includes("AND")
                        ? "bg-[#fff0e2] text-[#ff6d00]"
                        : "bg-[#f6e5db] text-[#8b3f00]"
                    }`}
                  >
                    {row.status}
                  </span>

                </td>

                <td className="px-3 py-2 text-[11px] text-[#4f4a42]">
                  {row.comprador}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}