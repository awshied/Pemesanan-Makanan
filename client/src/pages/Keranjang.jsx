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
            tempData.rush({
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
  return <div>Keranjang</div>;
};

export default Keranjang;
