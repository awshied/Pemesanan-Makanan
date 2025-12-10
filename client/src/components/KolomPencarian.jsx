import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/data";

const KolomPencarian = () => {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <div className="py-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-secondary ring-1 ring-slate-900/20 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Menu..."
            className="border-none outline-none w-full text-sm p-2"
          />
          <div className="pr-1">
            <img src={assets.search} alt="" className="w-5 h-5 mx-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KolomPencarian;
