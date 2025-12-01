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
      <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
        {/* Bagian Kiri - Detail Belanjaan */}
        <div className="flex flex-2 flex-col gap-3 text-[95%]">
          <Title
            title1={"Keranjang"}
            title2={"Belanja"}
            titleStyles={"pb-5 items-start"}
            paraStyles={"hidden"}
          />
          <div className="grid grid-cols-[6fr_2fr_1fr] font-medium bg-secondary p-2 rounded-xl">
            <h5 className="text-left">Menu</h5>
            <h5 className="text-center">Subtotal</h5>
            <h5 className="text-center">Aksi</h5>
          </div>
          {cartData.map((item, i) => {
            const product = products.find(
              (product) => product._id === item._id
            );
            const quantity = cartItems[item._id][item.size];
            return (
              <div
                key={i}
                className="grid grid-cols-[6fr_2fr_1fr] font-medium bg-secondary p-2 rounded-xl"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="flex">
                    <img src={product.images[0]} alt="" className="w-20" />
                  </div>
                  <div>
                    <h5 className="hidden sm:block line-clamp-1">
                      {product.title}
                    </h5>
                    <div className="bold-14 flexStart gap-2 mb-1">
                      Size: <p>{item.size}</p>
                    </div>
                    <div className="flexBetween">
                      <div className="flex items-center ring-2 ring-primary rounded-full shadow-md my-2 cursor-pointer gap-2">
                        <button
                          onClick={() => decrement(item._id, item.size)}
                          className="p-1.5 bg-primary m-0.5 text-white rounded-full shadow-md cursor-pointer"
                        >
                          <img
                            src={assets.minus}
                            alt=""
                            width={11}
                            className="invert"
                          />
                        </button>
                        <p className="">{quantity}</p>
                        <button
                          onClick={() => increment(item._id, item.size)}
                          className="p-1.5 bg-primary m-0.5 text-white hover:text-solidThree rounded-full shadow-md cursor-pointer"
                        >
                          <img
                            src={assets.plus}
                            alt=""
                            width={11}
                            className="invert"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center text-center text-[17px] font-semibold">
                  {currency} {product.price[item.size] * quantity}k
                </div>
                <button
                  onClick={() => ubahKuantitas(item._id, item.size, 0)}
                  className="cursor-pointer mx-auto"
                >
                  <img
                    src={assets.trash}
                    alt=""
                    width={22}
                    className="icon-filter-yellow"
                  />
                </button>
              </div>
            );
          })}
        </div>
        {/* Bagian Kanan - Checkout */}
        <div className="flex flex-1 flex-col">
          <div className="max-w-[379px] w-full bg-secondary px-5 py-10 max-md:mt-16 rounded-xl">
            <KeranjangBelanjaTotal />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Keranjang;
