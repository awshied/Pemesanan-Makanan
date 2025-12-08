import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { dummyRevenueExpenses } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";
import CustomYAxisTick from "./CustomYAxisTick";
import CustomTooltip from "./CustomTooltip";

const ChartPendapatanTahunan = () => {
  const { currency } = useAppContext();
  const [selectedYear, setSelectedYear] = React.useState("2025");
  const yearData = dummyRevenueExpenses[0][selectedYear];

  return (
    <div className="backdrop-blur-xl rounded-xl w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-0 gap-4 md:mb-6 mb-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-bold text-textColor">Pendapatan</span>
          <p className="text-xs text-textColor font-medium">
            Pendapatan bulanan dalam setahun.
          </p>
        </div>

        {/* Tombol Kanan */}
        <div className="flex flex-col items-end justify-center w-full md:w-auto gap-3">
          <div className="flex gap-2 w-full md:w-auto">
            <button
              className={`text-xs font-semibold md:py-2 py-1.5 md:px-4 px-3 rounded-md cursor-pointer ${
                selectedYear === "2025" ? "bg-gray-600 font-bold" : "bg-primary"
              }`}
              onClick={() => setSelectedYear("2025")}
            >
              2025
            </button>

            <button
              className={`text-xs font-semibold md:py-2 py-1.5 md:px-4 px-3 rounded-md cursor-pointer ${
                selectedYear === "2026" ? "bg-gray-600 font-bold" : "bg-primary"
              }`}
              onClick={() => setSelectedYear("2026")}
            >
              2026
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-solidThree rounded-full"></div>
              <div className="text-xs text-textColor">
                <span>Pendapatan</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-solidTwo rounded-full"></div>
              <div className="text-xs text-textColor">
                <span>Pengeluaran</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Pendapatan */}
      <div className="h-44 md:h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={yearData}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.2}
            />

            <XAxis
              dataKey="month"
              stroke="#d6d6d6"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              contentStyle={{
                display: "flex",
              }}
              stroke="#d6d6d6"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={45}
              tick={(props) => (
                <CustomYAxisTick {...props} currency={currency} />
              )}
            />

            <Tooltip content={<CustomTooltip currency={currency} />} />

            <Bar
              dataKey="revenue"
              fill="#ffc586"
              radius={[4, 4, 0, 0]}
              maxBarSize={25}
            />
            <Bar
              dataKey="expenses"
              fill="#e6392f"
              radius={[4, 4, 0, 0]}
              maxBarSize={25}
            />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPendapatanTahunan;
