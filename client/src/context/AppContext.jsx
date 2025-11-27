import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/data";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 10;
  const navigate = useNavigate();

  const fetchProducts = () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const value = {
    products,
    fetchProducts,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
