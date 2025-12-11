import React, { useState } from "react";
import { assets } from "../../assets/data";
import { useAppContext } from "../../context/AppContext";

const TambahMenu = ({ onClose }) => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
    sizeMeans: "",
    rating: "",
    estimatedTime: "",
  });

  const [sizePrices, setSizePrices] = useState([]);
  const [newSize, setNewSize] = useState([]);
  const [newPrice, setNewPrice] = useState([]);
  const [loading, setLoading] = useState([]);
  const [errors, setErrors] = useState({}); // Untuk validasi

  const { currency } = useAppContext();

  const allCategories = ["Makanan", "Minuman", "Appetizer", "Dessert"];

  const allType = [
    "Nasi Biasa",
    "Nasi Goreng",
    "Mie Goreng",
    "Mie Kuah",
    "Kwetiaw Goreng",
    "Air Putih",
    "Latte",
    "Espresso",
    "Teh",
    "Milkshake",
    "Cemilan Ringan",
    "Gorengan",
    "Canapé",
    "Kue Basah",
    "Tepung Beras",
    "Cake",
    "Puding",
    "Waffle",
  ];

  const allRatings = [
    "5",
    "4.5",
    "4",
    "3.5",
    "3",
    "2.5",
    "2",
    "1.5",
    "1",
    "0.5",
  ];

  const allEstimatedTime = [
    "1 - 4 Menit",
    "5 - 8 Menit",
    "9 - 12 Menit",
    "13 - 16 Menit",
    "17 - 20 Menit",
  ];

  // Fungsi validasi sederhana
  const validateForm = () => {
    const newErrors = {};
    if (!inputs.title) newErrors.title = "Nama menu wajib diisi";
    // Tambahkan validasi lain jika perlu
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit logic
    }
  };
  return (
    <div className="bg-secondary px-4 py-6 rounded-2xl shadow-2xl max-w-5xl w-full mx-2 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <img src={assets.addMenu} alt="tambah-menu" className="w-6 h-6" />
          <h2 className="text-lg font-bold text-solidThree">
            Tambah Menu Baru
          </h2>
        </div>
        <button onClick={onClose} className="flexCenter">
          <img
            src={assets.cancel}
            width={20}
            className="icon-filter-yellow cursor-pointer"
          />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        {/* Section 1: Detail Menu */}
        <div className="grid grid-cols-2 gap-5 overflow-y-auto max-h-100">
          <div className="bg-primary p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-[9px]">
                  Nama Menu
                </label>
                <input
                  onChange={(e) =>
                    setInputs({ ...inputs, title: e.target.value })
                  }
                  value={inputs.title}
                  type="text"
                  placeholder="Masukkan Nama Menu . . ."
                  className={`w-full px-1 text-sm py-2 border-b-2 outline-none ${
                    errors.title ? "border-solidTwo" : "border-textColor"
                  }`}
                />
                {errors.title && (
                  <p className="text-solidTwo text-sm mt-2">{errors.title}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-textColor font-semibold mb-1">
                  Kategori
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, category: e.target.value })
                  }
                  value={inputs.category}
                  className="w-full px-1 outline-none border-b-2 border-textColor py-2"
                >
                  <option value="" className="text-sm bg-secondary">
                    Pilih Kategori
                  </option>
                  {allCategories.map((kate, index) => (
                    <option
                      key={index}
                      value={kate}
                      className="text-sm bg-primary rounded-md"
                    >
                      {kate}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-1">
                Deskripsi Menu
              </label>
              <textarea
                onChange={(e) =>
                  setInputs({ ...inputs, description: e.target.value })
                }
                value={inputs.description}
                rows={3}
                placeholder="Masukkan Deskripsi Menu..."
                className="w-full text-sm px-3 py-2 border-b-2 border-textColor outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Tipe</label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, type: e.target.value })
                  }
                  value={inputs.type}
                  className="w-full px-3 py-2 outline-none border-b-2 border-textColor"
                >
                  <option value="" className="text-sm bg-secondary">
                    Pilih Tipe
                  </option>
                  {allType.map((t, index) => (
                    <option
                      key={index}
                      value={t}
                      className="text-sm bg-primary rounded-md"
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Estimasi Waktu
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, estimatedTime: e.target.value })
                  }
                  value={inputs.estimatedTime}
                  className="w-full px-3 py-2 outline-none border-b-2 border-textColor"
                >
                  <option value="" className="text-sm bg-secondary">
                    Waktu
                  </option>
                  {allEstimatedTime.map((time, index) => (
                    <option
                      key={index}
                      value={time}
                      className="text-sm bg-primary rounded-md"
                    >
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Rating
                </label>
                <select
                  onChange={(e) =>
                    setInputs({ ...inputs, rating: e.target.value })
                  }
                  value={inputs.rating}
                  className="w-full px-3 py-2 outline-none border-b-2 border-textColor"
                >
                  <option value="" className="text-sm bg-secondary">
                    Pilih Rating
                  </option>
                  {allRatings.map((rate, index) => (
                    <option
                      key={index}
                      value={rate}
                      className="text-sm bg-primary rounded-md"
                    >
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">Premium?</label>
                <input
                  type="checkbox"
                  checked={inputs.popular}
                  onChange={(e) =>
                    setInputs({ ...inputs, popular: e.target.checked })
                  }
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Harga & Ukuran */}
          <div className="flex flex-col gap-5">
            <div className="bg-primary p-4 rounded-lg">
              <div className="flex flex-col gap-2 mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-[9px]">
                    Ukuran
                  </label>
                  <input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    type="text"
                    placeholder="Tentukan Ukuran (cth: R, J, S, M, L)"
                    className="w-full px-3 text-sm py-2 border-b-2 outline-none"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    <label className="block text-sm font-semibold mb-[9px]">
                      Harga
                    </label>
                    <input
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      type="text"
                      placeholder="Tentukan Harga"
                      className="w-full px-3 text-sm py-2 border-b-2 outline-none"
                    />
                  </div>
                  <div className="flex items-end w-1/2">
                    <button
                      type="button"
                      onClick={() => {
                        // Logika tambah ke sizePrices
                        setSizePrices([
                          ...sizePrices,
                          { size: newSize, price: newPrice },
                        ]);
                        setNewSize("");
                        setNewPrice("");
                      }}
                      className="bg-secondary text-textColor px-4 py-2 w-full rounded-lg hover:bg-[#262b32] font-semibold flexCenter cursor-pointer text-center gap-1"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {sizePrices.map((sp, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-none"
                  >
                    <span className="text-textColor font-medium text-sm">
                      <span className="text-solidThree">{sp.size}</span>:{" "}
                      {currency} {Number(sp.price).toFixed(3)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSizePrices(sizePrices.filter((_, i) => i !== index))
                      }
                      className="flexCenter"
                    >
                      <img
                        src={assets.trash}
                        width={20}
                        className="cursor-pointer icon-filter-yellow"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Gambar */}
            <div className="bg-primary p-4 rounded-lg">
              <h3 className="text-sm font-semibold mb-3">Gambar Produk</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.keys(images).map((key) => (
                  <label
                    key={key}
                    htmlFor={`productImage${key}`}
                    className="cursor-pointer"
                  >
                    <input
                      type="file"
                      onChange={(e) =>
                        setImages({ ...images, [key]: e.target.files[0] })
                      }
                      accept="image/*"
                      id={`productImage${key}`}
                      hidden
                    />
                    <div className="w-20 h-20 border-2 border-dashed bg-secondary border-textColor rounded-lg flex items-center justify-center hover:bg-[#262b32]">
                      <img
                        src={
                          images[key]
                            ? URL.createObjectURL(images[key])
                            : assets.uploadIcon
                        }
                        alt=""
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="active:scale-95 transition bg-primary border border-gray-500/20 text-textColor hover:bg-[#262b32] text-sm font-medium flexCenter w-full rounded-md py-4 gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            <img src={assets.order} width={20} />
            {loading ? "Menambahkan..." : "Tambah Menu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahMenu;
