import React from "react";

const CustomYAxisTick = ({ x, y, payload, currency }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-70" y="-10" width="70" height="20">
        <div className="flex gap-1 items-center text-xs text-textColor">
          <span
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {currency}
          </span>
          <span
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {payload.value / 1000}k
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomYAxisTick;
