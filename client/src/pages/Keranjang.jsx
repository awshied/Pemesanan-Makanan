import { useEffect, useState } from "react";
import Title from "../components/Title";
import KeranjangBelanjaTotal from "../components/KeranjangBelanjaTotal";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/data";

const Keranjang = () => {
  const { navigate, products, currency, cartItems, ubahKuantitas } =
    useAppContext();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [products, cartItems]);

  const increment = (id, size) => {
    const kuantitasSekarang = cartItems[id][size];
    ubahKuantitas(id, size, kuantitasSekarang + 1);
  };

  const decrement = (id, size) => {
    const kuantitasSekarang = cartItems[id][size];
    if (kuantitasSekarang > 1) {
      ubahKuantitas(id, size, kuantitasSekarang - 1);
    }
  };
  return products && cartItems ? (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      <div className="grid xl:grid-cols-[2fr_1fr] grid-cols-1 gap-20">
        {/* Bagian Kiri - Detail Belanjaan */}
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src={assets.emptyCart}
              alt="empty-cart"
              className="w-80 mb-6"
            />
            <h3 className="text-lg md:text-xl font-semibold text-textColor">
              Waduh, keranjangmu masih kosong nih!
            </h3>
            <p className="text-[11px] md:text-sm text-textColor font-medium mt-2">
              Ayo pilih dulu menu favoritmu dan segera pesan sekarang juga.
            </p>
          </div>
        ) : (
          <div className="flex flex-2 flex-col gap-3 text-[95%]">
            <Title
              title1={"Keranjang"}
              title2={"Belanja"}
              titleStyles={"pb-5 items-start"}
              paraStyles={"hidden"}
            />
            <div className="grid grid-cols-[6fr_4fr_3fr_1fr] md:grid-cols-[6fr_3fr_2fr_1fr] font-medium bg-secondary p-2 rounded-xl">
              <h5 className="text-left ml-20 text-solidThree">Menu</h5>
              <h5 className="text-center text-solidThree">Harga Satuan</h5>
              <h5 className="text-center text-solidThree">Harga</h5>
              <h5 className="text-center text-solidThree">Aksi</h5>
            </div>
            {cartData.map((item, i) => {
              const product = products.find(
                (product) => product._id === item._id
              );
              const quantity = cartItems[item._id][item.size];
              return (
                <div
                  key={i}
                  className="grid grid-cols-[6fr_4fr_3fr_1fr] md:grid-cols-[6fr_3fr_2fr_1fr] font-medium bg-secondary p-2 rounded-xl"
                >
                  <div className="flex items-center md:gap-6 gap-3 ml-3">
                    <div className="flex">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-12 md:w-20"
                      />
                    </div>
                    <div>
                      <h5 className="hidden sm:block line-clamp-1">
                        {product.title}
                      </h5>
                      <div className="bold-14 flexStart gap-2 mb-1">
                        <small className="text-xs md:text-sm font-semibold hidden md:flex">
                          Ukuran:{" "}
                        </small>
                        <p className="text-xs md:text-sm font-semibold text-solidThree">
                          {product.sizeMeans?.[item.size] || item.size}
                        </p>
                      </div>
                      <div className="flexBetween">
                        <div className="flex items-center ring-2 ring-primary rounded-full shadow-md my-2 cursor-pointer gap-2">
                          <button
                            onClick={() => decrement(item._id, item.size)}
                            className="p-1.5 bg-primary hover:bg-[#40464b] m-0.5 text-white rounded-full shadow-md cursor-pointer"
                          >
                            <img
                              src={assets.minus}
                              alt=""
                              className="md:w-3 w-2"
                            />
                          </button>
                          <p className="">{quantity}</p>
                          <button
                            onClick={() => increment(item._id, item.size)}
                            className="p-1.5 bg-primary hover:bg-[#40464b] m-0.5 text-white hover:text-solidThree rounded-full shadow-md cursor-pointer"
                          >
                            <img
                              src={assets.plus}
                              alt=""
                              className="md:w-3 w-2"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flexCenter text-center md:text-[17px] text-[10px] font-semibold">
                    {currency} {product.price[item.size].toFixed(3)}
                  </div>
                  <div className="flexCenter text-center md:text-[17px] text-[10px] font-semibold">
                    {currency}{" "}
                    {(product.price[item.size] * quantity).toFixed(3)}
                  </div>
                  <button
                    onClick={() => ubahKuantitas(item._id, item.size, 0)}
                    className="cursor-pointer mx-auto"
                  >
                    <img
                      src={assets.trash}
                      alt=""
                      className="icon-filter-yellow w-4 md:w-[22px]"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {/* Bagian Kanan - Checkout */}
        <div className="flex flex-1 flex-col">
          <div className="w-full bg-secondary px-5 py-10 max-md:mt-16 rounded-xl">
            <KeranjangBelanjaTotal />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Keranjang;
