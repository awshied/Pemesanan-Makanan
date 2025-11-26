import React from "react";
import { assets } from "../assets/data";

const Rating = () => {
  return (
    <div className="flex items-center divide-x divide-gray-300">
      <div className="flex -space-x-3 pr-3">
        <img
          src={assets.user1}
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1"
        />
        <img
          src={assets.user2}
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1"
        />
        <img
          src={assets.user3}
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1"
        />
        <img
          src={assets.user4}
          alt="image"
          className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1"
        />
      </div>
      <div className="pl-3">
        <div className="flex items-center gap-1 mb-1">
          <img src={assets.star} alt="rating" width={20} />
          <img src={assets.star} alt="rating" width={20} />
          <img src={assets.star} alt="rating" width={20} />
          <img src={assets.star} alt="rating" width={20} />
          <img src={assets.star} alt="rating" width={20} />
          <p className="text-textColor font-medium ml-2">5.0</p>
        </div>
        <p className="text-sm text-textColor">
          Dipercaya oleh{" "}
          <span className="font-medium text-solidThree">20,000+</span> pembeli
        </p>
      </div>
    </div>
  );
};

export default Rating;
