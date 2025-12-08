import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { pertumbuhanPembeliTahunan } from "../../assets/data";
import CustomYAxis from "./CustomYAxis";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div
        className="bg-[#1f2630] py-3 px-5 rounded-xl flex flex-col gap-2"
        style={{
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <p className="text-textColor font-bold text-sm">{data.kepanjangan}</p>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <span
            className="text-sm text-textColor font-medium"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            2023: <span className="text-gray-400">{data.y2023}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-solidTwo rounded-full"></div>
          <span
            className="text-sm text-textColor font-medium"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            2024: <span className="text-[#f64b42]">{data.y2024}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-solidThree rounded-full"></div>
          <span
            className="text-sm text-textColor font-medium"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            2025: <span className="text-solidThree">{data.y2025}</span>
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const ChartPertumbuhanPembeli = () => {
  return (
    <div className="backdrop-blur-xl rounded-xl w-full bg-secondary p-5">
      <div className="flexBetween mb-6 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-base font-bold text-textColor">
            Pertumbuhan Pelanggan
          </span>
          <p className="text-xs text-textColor font-medium">
            Dinamika pertumbuhan pelanggan sepanjang tahun.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="text-[14px] text-textColor">
              <span>2023</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-solidTwo rounded-full"></div>
            <div className="text-[14px] text-textColor">
              <span>2024</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-solidThree rounded-full"></div>
            <div className="text-[14px] text-textColor">
              <span>2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-82">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={pertumbuhanPembeliTahunan}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.2}
            />

            <XAxis
              dataKey="bulan"
              stroke="#d6d6d6"
              fontSize={14}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#d6d6d6"
              fontSize={14}
              tickLine={false}
              axisLine={false}
              tick={(props) => <CustomYAxis {...props} />}
            />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="y2023"
              name="Tahun 2023"
              stroke="var(--color-gray-600)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="y2024"
              name="Tahun 2024"
              stroke="#e6392f"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="y2025"
              name="Tahun 2025"
              stroke="#ffc586"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPertumbuhanPembeli;
