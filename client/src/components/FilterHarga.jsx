import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useAppContext } from "../context/AppContext";

const FilterHarga = () => {
  const { currency } = useAppContext();
  const hargaMinimum = 0;
  const hargaMaksimum = 50000;

  const [value, setValue] = useState([hargaMinimum, hargaMaksimum]);

  return (
    <div className="px-4 py-3 mt-2 bg-primary rounded-xl">
      <h5 className="mb-4 block">Harga</h5>

      <Slider
        range
        value={value}
        onChange={setValue}
        min={hargaMinimum}
        max={hargaMaksimum}
        allowCross={false}
        trackStyle={[
          {
            backgroundColor: "#ffc586",
            height: 4,
            marginLeft: 2,
            marginRight: 2,
          },
        ]}
        railStyle={{
          backgroundColor: "var(--color-gray-600)",
          height: 4,
          marginLeft: 2,
          marginRight: 2,
        }}
        handleStyle={[
          {
            width: 14,
            height: 14,
            marginTop: -5,
            backgroundColor: "#ffc586",
            opacity: 1,
            outline: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            border: "2px solid #ffac54",
          },
          {
            width: 14,
            height: 14,
            marginTop: -5,
            backgroundColor: "#ffc586",
            opacity: 1,
            outline: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            border: "2px solid #ffac54",
          },
        ]}
      />

      <div className="flex justify-between mt-2">
        <span className="text-xs font-medium">
          {currency} {value[0]}
        </span>
        <span className="text-xs font-medium">
          {currency} {value[1]}
        </span>
      </div>
    </div>
  );
};

export default FilterHarga;
