import React from "react";

const TabelPesanan = () => {
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
                  Menu
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
              <tbody>
                <tr className="border-b border-[#49535d] hover:bg-primary transition-colors">
                  <td className="p-3">
                    <span className="text-sm font-medium text-textColor">
                      Kode Pesanan
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium text-white">
                      Pelanggan
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium text-white">Menu</span>
                  </td>
                  <td className="p-3">
                    <span className="text-sm font-medium text-white">
                      Total Harga
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-white font-medium text-xs px-3 py-1 rounded-full`}
                    >
                      Status Pesanan
                    </span>
                  </td>
                </tr>
              </tbody>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TabelPesanan;
