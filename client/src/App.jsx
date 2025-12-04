import React from "react";
import { Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda";
import Menu from "./pages/Menu";
import Blog from "./pages/Blog";
import Keranjang from "./pages/Keranjang";
import Alamat from "./pages/Alamat";
import Pesanan from "./pages/Pesanan";
import KebijakanPrivasi from "./pages/KebijakanPrivasi";
import SyaratLayanan from "./pages/SyaratLayanan";
import TentangKami from "./pages/TentangKami";
import PusatBantuan from "./pages/PusatBantuan";
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/alamat" element={<Alamat />} />
        <Route path="/pesanan" element={<Pesanan />} />
        <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
        <Route path="/syarat-layanan" element={<SyaratLayanan />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/pusat-bantuan" element={<PusatBantuan />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
