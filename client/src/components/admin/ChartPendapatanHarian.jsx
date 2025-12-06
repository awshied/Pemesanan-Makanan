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

const ChartPendapatanHarian = () => {
  const { currency } = useAppContext();

  return (
    <div className="backdrop-blur-xl rounded-xl w-full">
      <div className="flexBetween mb-6 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-base font-bold text-textColor">Pendapatan</span>
          <p className="text-xs text-textColor">
            Pendapatan bulanan dalam setahun.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-solidThree rounded-full"></div>
            <div className="text-xs text-textColor">
              <span>Pendapatan</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-solidTwo rounded-full"></div>
            <div className="text-xs text-textColor">
              <span>Pengeluaran</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dummyRevenueExpenses}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.2}
            />

            <XAxis
              dataKey="month"
              stroke="#d6d6d6"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              contentStyle={{
                display: "flex",
              }}
              stroke="#d6d6d6"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={(props) => (
                <CustomYAxisTick {...props} currency={currency} />
              )}
            />

            <Tooltip content={<CustomTooltip currency={currency} />} />

            <Bar
              dataKey="revenue"
              fill="#ffc586"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="expenses"
              fill="#e6392f"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
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

export default ChartPendapatanHarian;
