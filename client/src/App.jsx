import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import Dashboard from "./pages/admin/Dashboard";
import KelolaMenu from "./pages/admin/KelolaMenu";
import KelolaPengguna from "./pages/admin/KelolaPengguna";
import KelolaPesanan from "./pages/admin/KelolaPesanan";
import Laporan from "./pages/admin/Laporan";
import BlogAdmin from "./pages/admin/BlogAdmin";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import AdminLayout from "./layout/AdminLayout";
import Login from "./pages/admin/Login";
import AdminRoute from "./components/admin/AdminRoute";

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const isAdminPath = useLocation().pathname.includes("admin");
  const location = useLocation();

  useEffect(() => {
    const skipAuthCheckPaths = ["/admin/login"];

    if (!skipAuthCheckPaths.includes(location.pathname)) {
      checkAuth();
    } else {
      // penting: hentikan loader
      useAuthStore.setState({ isCheckingAuth: false });
    }
  }, [location.pathname, checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <main className="overflow-x-hidden text-textColor">
      {!isAdminPath && <Header />}
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
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<BlogAdmin />} />
          <Route path="kelola-menu" element={<KelolaMenu />} />
          <Route path="kelola-pengguna" element={<KelolaPengguna />} />
          <Route path="kelola-pesanan" element={<KelolaPesanan />} />
          <Route path="laporan" element={<Laporan />} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </main>
  );
};

export default App;
