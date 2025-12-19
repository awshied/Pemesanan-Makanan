import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/data";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [method, setMethod] = useState("COD");
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 5;

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

  const hitunganJumlah = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price[size] * cartItems[itemId][size];
      }
    }
    return total;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    searchQuery,
    setSearchQuery,
    fetchProducts,
    currency,
    navigate,
    method,
    setMethod,
    delivery_charges,
    cartItems,
    setCartItems,
    tambahKeranjang,
    hitunganKeranjang,
    ubahKuantitas,
    hitunganJumlah,
    isAdmin,
    setIsAdmin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
