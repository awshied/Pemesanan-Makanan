import React from "react";
import { dummyPesananTerbaru } from "../../assets/data";

const TabelPesanan = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "berhasil":
        return "bg-emerald-800/40 text-emerald-300";
      case "menunggu":
        return "bg-amber-800/40 text-amber-300";
      case "dibatalkan":
        return "bg-rose-800/40 text-rose-300";
      default:
        return "bg-slate-700/40 text-slate-300";
    }
  };
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-secondary backdrop-blur-xl overflow-hidden">
        <div className="p-5 border-b border-[#49535d]">
          <div className="flexBetween">
            <div className="flex flex-col gap-2">
              <big className="text-base font-bold text-textColor">
                Pesanan Terbaru
              </big>
              <p className="text-xs text-textColor leading-relaxed font-medium">
                Rangkuman pesanan terbaru dari pelanggan hari ini.
              </p>
            </div>
            <button className="text-textColor hover:text-solidThree text-xs font-medium">
              Lihat Semua
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-solidThree">
                  Kode Pesanan
                </th>
                <th className="text-left p-3 text-sm font-semibold text-solidThree">
                  Nama
                </th>
                <th className="text-left p-3 text-sm font-semibold text-solidThree">
                  Total Harga
                </th>
                <th className="text-left p-3 text-sm font-semibold text-solidThree">
                  Status
                </th>
                <th className="text-left p-3 text-sm font-semibold text-solidThree">
                  Tanggal
                </th>
              </tr>
            </thead>
          </table>

          {/* SCROLL AREA UNTUK TBODY */}
          <div className="max-h-75 overflow-y-auto">
            <table className="w-full">
              <tbody className="block">
                {dummyPesananTerbaru.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#49535d] hover:bg-primary transition-colors table w-full table-fixed"
                  >
                    <td className="p-3 w-1/5">
                      <span className="text-sm font-medium text-textColor">
                        {order.id}
                      </span>
                    </td>

                    <td className="p-3 w-1/5">
                      <span className="text-sm font-medium text-white">
                        {order.customer}
                      </span>
                    </td>

                    <td className="p-3 w-1/5">
                      <span className="text-sm font-medium text-white">
                        {order.totalHarga}
                      </span>
                    </td>

                    <td className="p-3 w-1/5">
                      <span
                        className={`text-white font-medium text-xs px-3 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-3 w-1/5">
                      <span className="text-sm font-medium text-white">
                        {new Date(order.date).toLocaleDateString("id-ID", {
                          timeZone: "Asia/Jakarta",
                          weekday: "short",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelPesanan;
