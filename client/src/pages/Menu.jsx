import React, { useEffect, useMemo, useState } from "react";
import Item from "../components/Item";
import { useAppContext } from "../context/AppContext";
import KolomPencarian from "../components/KolomPencarian";

const Menu = () => {
  const { products, searchQuery } = useAppContext();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Relevant");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [availableTypes, setAvailableTypes] = useState([]);
  const itemsPerPage = 8;

  const semuaKategori = useMemo(
    () => ["Makanan", "Minuman", "Appetizer", "Dessert"],
    []
  );

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const selectedKate = category.length > 0 ? category : semuaKategori;
    const filteredProds = products.filter((prod) =>
      selectedKate.includes(prod.category)
    );
    const typeSet = new Set(filteredProds.map((prod) => prod.type));
    const newAvailableTypes = [...typeSet].sort();
    setAvailableTypes(newAvailableTypes);

    setType((prev) => prev.filter((t) => typeSet.has(t)));
  }, [category, products, semuaKategori]);

  const totalHalaman = 7;

  return (
    <div className="max-padd-container px-0 mt-18">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filter Kategori */}
        <div className="min-w-72 bg-secondary p-4 pl-6 lg:pl-12 rounded-r-xl my-4">
          <KolomPencarian />
          <div className="px-4 py-3 mt-2 bg-primary rounded-xl">
            <h5 className="mb-4">Urutkan Harga</h5>
            <select
              onChange={(e) => setSelectedSort(e.target.value)}
              className="border-2 border-secondary outline-none bg-secondary text-textColor text-sm font-medium h-8 w-full px-1 rounded-md"
            >
              <option value="relevant">Relevan</option>
              <option value="high">Tertinggi</option>
              <option value="low">Terendah</option>
            </select>
          </div>
          <div className="pl-5 py-3 mt-4 bg-primary rounded-xl">
            <h5 className="mb-4">Kategori</h5>
            <div className="flex flex-col gap-2 text-xl font-light">
              {semuaKategori.map((kate) => (
                <label
                  key={kate}
                  className="flex gap-2 text-sm font-medium text-textColor"
                >
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    value={kate}
                    checked={category.includes(kate)}
                    className="w-4"
                  />
                  {kate}
                </label>
              ))}
            </div>
          </div>
          <div className="pl-5 py-3 mt-4 bg-primary rounded-xl">
            <h5 className="mb-4">Tipe</h5>
            <div className="flex flex-col gap-2 text-xl font-light">
              {availableTypes.map((tipe) => (
                <label
                  key={tipe}
                  className="flex gap-2 text-sm font-medium text-textColor"
                >
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setType)}
                    type="checkbox"
                    value={tipe}
                    checked={type.includes(tipe)}
                    className="w-4"
                  />
                  {tipe}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Menu */}
        <div className="max-sm:px-10 sm:pr-10 bg-primary px-4 rounded-l-xl my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
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
