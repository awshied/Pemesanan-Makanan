import React, { useState } from "react";
import { assets } from "../assets/data";
import FloatingInput from "./floatingInput";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";

const SignupModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(formData);

    if (success) {
      onClose();
    }
  };
  return (
    <div className="w-full flex justify-center py-20 px-4 animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-8 w-full max-w-xl items-center text-sm bg-primary shadow-md rounded-xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        >
          <img src={assets.cancel} width={20} className="icon-filter-yellow" />
        </button>
        <h1 className="text-4xl font-bold py-4 text-center text-textColor">
          Signup
        </h1>

        <p className="text-xs md:text-sm text-textColor mt-2 pb-10 text-center px-4 leading-relaxed">
          Selamat datang di{" "}
          <span className="text-solidThree font-semibold">Mang TekTek</span>,
          silahkan signup untuk segera login.
        </p>

        <div className="flex flex-col gap-6 w-full px-12">
          <FloatingInput
            label="Nama"
            name="fullName"
            icon={assets.user}
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
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
            className="active:scale-95 transition bg-secondary border border-gray-500/20 text-textColor hover:bg-[#262b32] rounded-md cursor-pointer flexCenter w-full mt-4 py-4 gap-2"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <span className="text-textColor font-medium text-sm">
                Tunggu...
              </span>
            ) : (
              <div className="flexCenter gap-2">
                <img src={assets.signup} width={18} />
                <span className="text-sm font-medium">Regisrasi</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupModal;
