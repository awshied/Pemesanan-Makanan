import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { dummySalesByCategory } from "../../assets/data";

const ChartPenjualanMenu = () => {
  const [filter, setFilter] = useState("harian");

  const chartData = dummySalesByCategory[0][filter];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      return (
        <div
          className="bg-[#1f2630] p-3 rounded-xl min-w-[100px]"
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={item.imageIcon}
              alt="icon"
              className="w-6 h-6 object-contain"
            />
            <div
              className="text-textColor text-lg font-bold"
              style={{
                fontFamily: "var(--font-poppins)",
              }}
            >
              {item.value}%
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const StatBar = ({ label, categoryName, value, color }) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center gap-3 min-w-0">
            <img
              src={label}
              alt="icon"
              className="md:h-5 h-4 md:w-5 w-4 object-contain shrink-0"
            />
            <span
              className="text-textColor truncate text-xs md:text-[14px]"
              style={{
                fontFamily: "var(--font-poppins)",
              }}
            >
              {categoryName}
            </span>
          </span>
          <span
            className="text-xs md:text-[14px]"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {value}%
          </span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{ width: `${value}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-secondary backdrop-blur-xl rounded-xl p-5 w-full">
      {/* Header */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:gap-0">
        <div className="flex flex-col gap-2">
          <big className="text-base font-bold text-textColor">
            Penjualan Menu
          </big>
          <p className="text-xs text-textColor leading-relaxed font-medium">
            Distribusi penjualan berdasarkan kategori.
          </p>
        </div>
        <select
          className="hidden md:flex outline-none bg-primary text-textColor text-xs font-medium h-8 w-full p-1 rounded-md cursor-pointer"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            fontFamily: "var(--font-poppins)",
          }}
        >
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          <option value="tahunan">Tahunan</option>
        </select>
      </div>
      <div className="flexCenter md:hidden gap-2 w-full">
        <button
          className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
            filter === "harian" ? "bg-gray-600 font-bold" : "bg-primary"
          }`}
          onClick={() => setFilter("harian")}
        >
          Harian
        </button>

        <button
          className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
            filter === "mingguan" ? "bg-gray-600 font-bold" : "bg-primary"
          }`}
          onClick={() => setFilter("mingguan")}
        >
          Mingguan
        </button>
        <button
          className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
            filter === "bulanan" ? "bg-gray-600 font-bold" : "bg-primary"
          }`}
          onClick={() => setFilter("bulanan")}
        >
          Bulanan
        </button>
        <button
          className={`text-xs font-semibold py-1.5 px-3 rounded-md cursor-pointer ${
            filter === "tahunan" ? "bg-gray-600 font-bold" : "bg-primary"
          }`}
          onClick={() => setFilter("tahunan")}
        >
          Tahunan
        </button>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="gap-x-3 grid grid-cols-1 md:grid-cols-2 md:mt-3">
        {chartData.map((item, index) => {
          return (
            <StatBar
              key={index}
              label={item.imageIcon}
              categoryName={item.categoryName}
              value={item.statsBar}
              color={item.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChartPenjualanMenu;
