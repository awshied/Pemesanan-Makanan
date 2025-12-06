import React from "react";

const CustomTooltip = ({ active, payload, currency }) => {
  if (!active || !payload || payload.length === 0) return null;

  const revenue = payload.find((p) => p.dataKey === "revenue");
  const expenses = payload.find((p) => p.dataKey === "expenses");

  return (
    <div className="bg-secondary p-4 rounded-xl flex flex-col gap-2 min-w-[140px] border-2 border-textColor">
      {/* Label Bulan */}
      <span className="text-textColor font-bold text-sm">
        {payload && payload.length > 0 && payload[0].payload.monthMeans}
      </span>

      {/* Pendapatan */}
      {revenue && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-solidThree rounded-full"></div>
          <span
            className="text-sm text-textColor font-medium"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {currency} {revenue.value.toLocaleString()}
          </span>
        </div>
      )}

      {/* Pengeluaran */}
      {expenses && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-solidTwo rounded-full"></div>

          <span
            className="text-sm text-textColor font-medium"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {currency} {expenses.value.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
