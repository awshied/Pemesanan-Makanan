import React, { useState } from "react";
import { assets } from "../assets/data";
import { useAppContext } from "../context/AppContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Item = ({ product }) => {
  const { currency, tambahKeranjang } = useAppContext();
  const [size, setSize] = useState(product.sizes[0]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<img key={i} src={assets.fullStar} className="w-5 h-5" />);
      } else if (rating >= i - 0.5) {
        stars.push(<img key={i} src={assets.halfStar} className="w-5 h-5" />);
      } else {
        stars.push(<img key={i} src={assets.emptyStar} className="w-5 h-5" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative mt-24 group">
      {/* Gambar Makanan */}
      <div className="mx-auto rounded-full absolute left-0 right-0 -top-21 h-[177px] w-[177px]">
        <img
          src={product.images[0]}
          alt="productImg"
          height={177}
          width={177}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 drop-shadow-md"
        />
        <img
          src={product.images[1] ? product.images[1] : product.images[0]}
          alt="productImg"
          height={177}
          width={177}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 drop-shadow-md"
        />
      </div>

      {/* Informasi */}
      <div
        className="rounded-4xl transition bg-secondary pt-20 overflow-hidden"
        style={{
          fontFamily: "var(--font-poppins)",
        }}
      >
        <div className="p-3">
          <h4 className="text-base line-clamp-1 mt-2 mb-1">{product.title}</h4>
          <div className="flex items-start justify-between pb-1">
            <small className="mb-1 text-sm font-medium">
              {product.category}
            </small>
            <div className="flex mb-1 items-start justify-start bold-14">
              {renderStars(product.rating)}
              <h5 className="pl-2 text-sm">{product.rating.toFixed(1)}</h5>
            </div>
          </div>
          <p className="line-clamp-1">{product.description}</p>
        </div>
        <div className="flexBetween p-3 pt-0">
          <div className="flex gap-1">
            {product.sizes.map((item, i) => (
              <button
                key={i}
                onClick={() => setSize(item)}
                className={`${
                  item === size ? "btn-outline text-solidThree" : "btn-dark"
                } rounded h-6 w-6 p-2 font-bold text-xs flexCenter`}
              >
                {item}
              </button>
            ))}
          </div>
          <h4 className="text-solidThree">
            {currency} {product.price[size]}k
          </h4>
        </div>
        <div className="flexBetween rounded-xl pl-5 text-[13px] pt-3 font-semibold pb-5">
          <div className="flexStart gap-5">
            <div className="flex flex-col gap-1 relative bottom-1.5">
              <small className="text-sm">Siap</small>
              <p className="text-xs text-solidThree">5m</p>
            </div>
            <hr className="h-8 w-px bg-textColor border-none" />
            <div className="flex flex-col gap-1 relative bottom-1.5">
              <small className="text-sm">Masak</small>
              <p className="text-xs text-solidThree">10m</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 pr-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => tambahKeranjang(product._id, size)}
                  className="btn-solid rounded p-2"
                >
                  <img src={assets.cartAdd} alt="add-to-cart" width={22} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Tambah Keranjang</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
