import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/data";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 10;
  const navigate = useNavigate();

  const { isSignedIn } = useUser();

  const fetchProducts = () => {
    setProducts(dummyProducts);
  };

  const tambahKeranjang = (itemId, size) => {
    if (!size) return toast.error("Tentuin dulu dong ukurannya.");
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
  };

  const hitunganKeranjang = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  const ubahKuantitas = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    isSignedIn,
    products,
    searchQuery,
    setSearchQuery,
    fetchProducts,
    currency,
    navigate,
    delivery_charges,
    cartItems,
    setCartItems,
    tambahKeranjang,
    hitunganKeranjang,
    ubahKuantitas,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
