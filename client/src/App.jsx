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
import Sidebar from "./components/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import KelolaMenu from "./pages/admin/KelolaMenu";
import DaftarMenu from "./pages/admin/DaftarMenu";
import { useAppContext } from "./context/AppContext";
import Laporan from "./pages/admin/Laporan";
import Analitik from "./pages/admin/Analitik";

const App = () => {
  const { isAdmin } = useAppContext();

  return (
    <main className="overflow-x-hidden text-textColor">
      {!isAdmin && <Header />}
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
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/analitik" element={<Analitik />} />
          <Route path="/admin/kelola-menu" element={<KelolaMenu />} />
          <Route path="/admin/daftar-menu" element={<DaftarMenu />} />
          <Route path="/admin/laporan" element={<Laporan />} />
        </Route>
      </Routes>
      {!isAdmin && <Footer />}
    </main>
  );
};

export default App;
