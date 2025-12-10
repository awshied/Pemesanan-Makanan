import React, { useEffect, useMemo, useState } from "react";
import Item from "../components/Item";
import { useAppContext } from "../context/AppContext";
import KolomPencarian from "../components/KolomPencarian";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { assets, menuCategory } from "../assets/data";

const Menu = () => {
  const { products, currency, searchQuery } = useAppContext();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const hargaMinimum = 0;
  const hargaMaksimum = 50000;
  const [value, setValue] = useState([hargaMinimum, hargaMaksimum]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [isEstimatedTimeOpen, setIsEstimatedTimeOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [estimatedTimeSelected, setEstimatedTimeSelected] =
    React.useState("Semua");
  const [ratingSelected, setRatingSelected] = React.useState("Semua");
  const itemsPerPage = 8;

  const prepTime = [
    "1 - 4 Menit",
    "5 - 8 Menit",
    "9 - 12 Menit",
    "13 - 16 Menit",
    "17 - 20 Menit",
  ];
  const menuRating = ["5", "4", "3", "2", "1"];

  const handleSelectedTime = (time) => {
    setEstimatedTimeSelected(time);
    setIsEstimatedTimeOpen(false);
  };

  const handleSelectedRating = (rate) => {
    setRatingSelected(rate);
    setIsRatingOpen(false);
  };

  const semuaKategori = useMemo(() => menuCategory, []);

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    // Jika tidak ada kategori dipilih → gunakan semua
    const selectedKate =
      category.length > 0 ? category : semuaKategori.map((c) => c.categoryName);

    const filteredProds = products.filter((prod) =>
      selectedKate.includes(prod.category)
    );

    // Ambil semua tipe yang valid dari menuCategory
    let collectedTypes = [];

    selectedKate.forEach((kat) => {
      const categoryObj = semuaKategori.find((c) => c.categoryName === kat);

      if (categoryObj?.types) {
        collectedTypes = [...collectedTypes, ...categoryObj.types];
      }
    });

    // Hilangkan duplikat berdasarkan typeName
    const typeMap = new Map();
    collectedTypes.forEach((t) => typeMap.set(t.typeName, t));

    const newAvailableTypes = Array.from(typeMap.values()).sort((a, b) =>
      a.typeName.localeCompare(b.typeName)
    );
    setAvailableTypes(newAvailableTypes);

    // Hapus tipe yang tidak masuk kategori ini
    setType((prev) => prev.filter((t) => typeMap.has(t)));
  }, [category, products, semuaKategori]);

  const totalHalaman = 7;

  return (
    <div className="max-padd-container px-0 mt-18">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filter Kategori */}
        <div className="max-w-116 min-w-116 bg-primary p-4 rounded-r-xl my-4">
          <div className="px-3">
            <KolomPencarian />
          </div>

          {/* Rentang Harga */}
          <div className="px-4 mt-2 rounded-xl">
            <h5 className="mb-4 block">Harga</h5>
            <div className="px-3">
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
                    boxShadow: "0 4px 10px rgba(0,0,0,0.8)",
                    border: "2px solid #ffac54",
                  },
                  {
                    width: 14,
                    height: 14,
                    marginTop: -5,
                    backgroundColor: "#ffc586",
                    opacity: 1,
                    outline: "none",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.8)",
                    border: "2px solid #ffac54",
                  },
                ]}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-medium">
                {currency} {value[0]}
              </span>
              <span className="text-xs font-medium">
                {currency} {value[1]}
              </span>
            </div>
          </div>

          {/* Kategori Menu */}
          <div className="px-4 mt-6 rounded-xl">
            <h5 className="mb-4">Kategori</h5>
            <div className="grid grid-cols-2 gap-3">
              {semuaKategori.map((kate) => {
                const isActive = category.includes(kate.categoryName);

                return (
                  <button
                    key={kate.categoryName}
                    onClick={() => toggleFilter(kate.categoryName, setCategory)}
                    className={`flexCenter hover:opacity-70 flex-col border-2 rounded-xl p-4 gap-2 cursor-pointer
                  ${
                    isActive
                      ? "text-solidThree bg-secondary border-transparent"
                      : "border-textColor"
                  }
                  `}
                  >
                    <img
                      src={kate.iconSource}
                      className={`w-5 h-5 ${
                        isActive ? "icon-active-yellow" : ""
                      }`}
                    />
                    <small className="text-xs font-medium">
                      {kate.categoryName}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estimasi Waktu dan Rating */}
          <div className="grid grid-cols-[2fr_1fr] gap-3 px-4 mt-6 rounded-xl">
            {/* Estimasi Waktu */}
            <div className="flex flex-col">
              <h5 className="mb-4">Estimasi Waktu</h5>
              <div className="flex flex-col text-xs relative">
                <button
                  onClick={() => {
                    setIsEstimatedTimeOpen(!isEstimatedTimeOpen);
                    setIsRatingOpen(false);
                  }}
                  className="flex justify-between items-center w-full text-left px-4 pr-4 py-2 rounded-md cursor-pointer bg-secondary shadow-md hover:bg-[#262b32] focus:outline-none"
                >
                  <span
                    className="flex gap-2 text-sm font-semibold text-textColor"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    <img src={assets.clock} alt="estimated-time" width={20} />
                    {estimatedTimeSelected}
                  </span>
                  <img
                    src={assets.down}
                    className={`transition-transform duration-300 ${
                      isEstimatedTimeOpen ? "rotate-180" : ""
                    }`}
                    width={16}
                  />
                </button>
                {isEstimatedTimeOpen && (
                  <ul className="w-full bg-secondary rounded-xl absolute top-10 shadow-xl mt-1 py-2">
                    {prepTime.map((time) => (
                      <li
                        key={time}
                        className="flex gap-2 px-4 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        onClick={() => handleSelectedTime(time)}
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img
                          src={assets.clock}
                          alt="estimated-time"
                          width={16}
                        />
                        {time}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Rating */}
            <div className="flex flex-col">
              <h5 className="mb-4">Rating</h5>
              <div className="flex flex-col text-xs relative">
                <button
                  onClick={() => {
                    setIsRatingOpen(!isRatingOpen);
                    setIsEstimatedTimeOpen(false);
                  }}
                  className="flex justify-between items-center w-full text-left px-4 pr-4 py-2 rounded-md cursor-pointer bg-secondary shadow-md hover:bg-[#262b32] focus:outline-none"
                >
                  <span
                    className="flex gap-2 text-sm font-semibold text-textColor"
                    style={{
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    <img
                      src={assets.fullStar}
                      alt="estimated-time"
                      width={20}
                    />
                    {ratingSelected}
                  </span>
                  <img
                    src={assets.down}
                    className={`transition-transform duration-300 ${
                      isRatingOpen ? "rotate-180" : ""
                    }`}
                    width={16}
                  />
                </button>
                {isRatingOpen && (
                  <ul className="w-full bg-secondary rounded-xl absolute top-10 shadow-xl mt-1 py-2">
                    {menuRating.map((rate) => (
                      <li
                        key={rate}
                        className="flex gap-2 px-4 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        onClick={() => handleSelectedRating(rate)}
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img
                          src={assets.fullStar}
                          alt="estimated-time"
                          width={16}
                        />
                        {rate}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Tipe Menu */}
          <div className="px-4 mt-6 rounded-xl">
            <h5 className="mb-4">Tipe</h5>
            <div className="flex flex-wrap gap-2">
              {availableTypes.map((tipe) => {
                const isActive = type.includes(tipe.typeName);

                return (
                  <button
                    key={tipe.typeName}
                    onClick={() => toggleFilter(tipe.typeName, setType)}
                    className={`flex items-center gap-2 border-2 rounded-xl px-4 py-2 cursor-pointer hover:opacity-70
                        ${
                          isActive
                            ? "bg-secondary border-transparent text-solidThree"
                            : "border-textColor"
                        }
                    `}
                  >
                    <img
                      src={tipe.imageSource}
                      className={`w-5 h-5 ${
                        isActive ? "icon-active-yellow" : ""
                      }`}
                    />
                    <small className="text-xs font-medium">
                      {tipe.typeName}
                    </small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Menu */}
        <div className="max-sm:px-10 sm:pr-10 bg-primary px-4 rounded-l-xl my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {products.length > 0 ? (
              products.map((product) => (
                <Item key={product._id} product={product} />
              ))
            ) : (
              <p className="capitalize">
                Oops, gada produk yang cocok dengan filter kamu.
              </p>
            )}
          </div>
          <div className="flexCenter flex-wrap mt-14 mb-10 gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`active:scale-95 transition bg-solidThree text-secondary text-sm font-semibold rounded-full cursor-pointer py-1 px-3 ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Sebelumnya
            </button>
            {Array.from({ length: totalHalaman }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`active:scale-95 transition text-textColor text-sm font-semibold rounded-full cursor-pointer py-1.5 px-3 ${
                  currentPage === index + 1 &&
                  "bg-secondary border-2 border-solidThree text-solidThree"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalHalaman}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`active:scale-95 transition bg-solidThree text-secondary text-sm font-semibold rounded-full cursor-pointer py-1 px-3 ${
                currentPage === totalHalaman && "opacity-50 cursor-not-allowed"
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
