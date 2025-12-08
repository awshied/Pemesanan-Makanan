import React from "react";

const CustomYAxis = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x="-40" y="-10" width="70" height="20">
        <div className="flex gap-1 items-center text-xs md:text-[14px] text-textColor">
          <span
            style={{
              fontFamily: "var(--font-poppins)",
            }}
          >
            {payload.value}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

export default CustomYAxis;
