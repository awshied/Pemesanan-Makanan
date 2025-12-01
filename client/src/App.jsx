import React from "react";
import { Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda";
import Menu from "./pages/Menu";
import Kontak from "./pages/Kontak";
import Keranjang from "./pages/Keranjang";
import Alamat from "./pages/Alamat";
import Pesanan from "./pages/Pesanan";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className="overflow-x-hidden text-textColor">
      <Header />
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/alamat" element={<Alamat />} />
        <Route path="/pesanan" element={<Pesanan />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
