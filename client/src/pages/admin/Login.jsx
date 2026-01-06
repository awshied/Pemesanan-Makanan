import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/data";
import { useAuthStore } from "../../store/useAuthStore";
import FloatingInput from "../../components/floatingInput";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginAdmin, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginAdmin(formData);

    if (success) {
      navigate("/admin");
    }

    console.log("loginAdmin:", loginAdmin);
  };

  console.log("isLoggingIn:", isLoggingIn);

  return (
    <div className="max-padd-container py-12 bg-primary">
      <div className="relative w-full bg-secondary rounded-xl">
        <div className="flexCenter">
          {/* Bagian Kiri - Form Login */}
          <form
            onSubmit={handleSubmit}
            className="md:w-1/2 flexCenter flex-col py-8 px-16 md:border-r-2 border-primary"
          >
            <h1 className="text-4xl font-bold py-4 text-center text-textColor">
              Administrator
            </h1>

            <p className="lg:text-xs text-[10px] text-textColor mt-2 pb-10 text-center px-4 leading-relaxed">
              Selamat datang kembali{" "}
              <span className="text-solidThree font-semibold">Admin </span>
              di{" "}
              <span className="text-solidThree font-semibold">Mang TekTek</span>
              . Silakan kelola menu, pesanan, dan laporan penjualan dengan mudah
              melalui panel ini.
            </p>

            <div className="flex flex-col mt-2 gap-6 w-full">
              <FloatingInput
                label="Email"
                name="email"
                type="email"
                icon={assets.email}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <FloatingInput
                label="Password"
                name="password"
                type="password"
                icon={assets.password}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {/* Submit */}
              <button
                type="submit"
                className="active:scale-95 transition bg-primary border border-gray-500/20 text-textColor hover:opacity-80 text-sm font-medium rounded-md cursor-pointer flexCenter w-full mt-4 py-4 gap-2"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="text-textColor font-medium text-sm">
                    Tunggu...
                  </span>
                ) : (
                  <div className="flexCenter gap-2">
                    <img src={assets.login} width={18} />
                    <span className="text-sm font-medium">Masuk</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Bagian Kanan - Gambar */}
          <div className="p-20 hidden md:w-1/2 md:flex flex-col items-center justify-center">
            <img
              src={assets.administrator}
              alt="administrator"
              className="w-65 h-auto object-contain"
            />
            <div className="mt-6 flexCenter">
              <big className="text-lg md:text-xl font-semibold text-textColor text-center">
                Pusat Kendali Untuk Mengelola Sistem
              </big>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <span className="auth-badge">Kontrol</span>
              <span className="auth-badge">Mang TekTek</span>
              <span className="auth-badge">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
