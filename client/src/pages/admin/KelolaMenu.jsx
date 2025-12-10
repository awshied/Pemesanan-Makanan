import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { adminMenuCategories, assets } from "../../assets/data";

const KelolaMenu = () => {
  const { user, products, currency, fetchProducts } = useAppContext();
  const { searchQuery, setSearchQuery } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex flex-col pl-3 md:px-0 mt-5 overflow-y-scroll w-full gap-3 md:gap-2 mb-3">
      {/* Header */}
      <div className="flex md:pl-3 pl-2 items-start justify-center flex-col gap-2">
        <big className="text-2xl font-bold text-white">Kelola Menu</big>
        <small className="text-sm leading-relaxed">
          Halo,{" "}
          <span className="text-solidThree font-medium">
            {user?.firstName} {user?.lastName}
          </span>
          . Selamat datang kembali di Mang TekTek.
        </small>
      </div>

      {/* Search + Kategori */}
      <div className="flex items-center justify-between gap-3 w-full flex-wrap">
        {/* Search */}
        <div className="flex items-center px-4 py-3 bg-secondary rounded-lg ring-1 ring-slate-900/20 w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Menu..."
            className="w-full bg-transparent outline-none text-sm"
          />
          <img src={assets.search} alt="" className="w-5 h-5 ml-2 opacity-60" />
        </div>

        {/* Kategori Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {adminMenuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flexCenter bg-secondary rounded-md cursor-pointer hover:bg-[#262b32]"
            >
              <img src={cat.imgPath} className="p-3 w-13 h-13" />

              {activeCategory === cat.id && (
                <div className="flexCenter">
                  <hr className="border border-textColor w-px h-7" />
                  <div className="flex flex-col gap-0.5 py-2 px-3 justify-center text-start">
                    <span className="text-sm font-bold">{cat.label}</span>
                    <span className="text-[10px] font-medium">
                      <span className="text-solidThree font-semibold">
                        {cat.count}
                      </span>{" "}
                      Aneka
                    </span>
                  </div>
                </div>
              )}
            </button>
          ))}

          {/* Tambah Menu */}
          <button className="px-6 py-4 bg-secondary text-sm text-textColor rounded-md font-bold hover:opacity-90">
            Tambah Menu
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="grid grid-cols-[3fr_2fr_1.5fr_2fr_1fr] items-center px-5 py-4 bg-secondary text-solidThree font-semibold rounded-xl">
          <p className="ml-20 text-solidThree">Menu</p>
          <p className="text-solidThree">Kategori</p>
          <p className="text-solidThree">Harga</p>
          <p className="ml-2 text-solidThree">Stok</p>
          <p className="text-center text-solidThree">Aksi</p>
        </div>

        {/* Rows */}
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[3fr_2fr_1.5fr_2fr_1fr] items-center px-5 py-4 bg-secondary rounded-xl gap-x-4"
          >
            {/* Menu */}
            <div className="flex items-center gap-3">
              <img
                src={product.images[0]}
                className="w-12 h-12 rounded-md object-cover"
              />
              <p className="text-sm font-semibold line-clamp-2">
                {product.title}
              </p>
            </div>

            {/* Category */}
            <p className="text-sm font-semibold">{product.category}</p>

            {/* Price */}
            <p className="text-sm font-semibold">
              {currency} {product.price[product.sizes[0]].toFixed(3)}
            </p>

            {/* Switch Stok */}
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={product.inStock}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-600 peer-checked:bg-solidThree rounded-full transition-all" />
                <span className="absolute top-1 left-1 w-4 h-4 bg-secondary rounded-full transition-transform peer-checked:translate-x-4" />
              </label>
            </div>

            {/* Action */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={assets.editMenu}
                className="icon-filter-yellow w-6 cursor-pointer"
              />
              <img
                src={assets.trash}
                className="icon-filter-yellow w-6 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelolaMenu;
