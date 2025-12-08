import React from "react";
import { formatPendapatan } from "../../utils/formatNumber";

const CustomYAxisTick = ({ x, y, payload, currency }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-55" y="-10" width="80" height="20">
        <div className="flex gap-1 items-center text-textColor">
          <span
            className="text-xs"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {currency}
          </span>
          <span
            className="text-xs"
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {formatPendapatan(payload.value)}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomYAxisTick;
