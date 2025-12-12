import React from "react";
import { assets } from "../assets/data";
import FloatingInput from "./floatingInput";

const LoginModal = ({ onClose }) => {
  return (
    <div className="w-full flex justify-center py-20 px-4 animate-fadeIn">
      <form className="flex flex-col py-8 w-full max-w-xl items-center text-sm bg-primary shadow-md rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer"
        >
          <img src={assets.cancel} width={20} className="icon-filter-yellow" />
        </button>
        <h1 className="text-4xl font-bold py-4 text-center text-textColor">
          Login
        </h1>

        <p className="text-xs md:text-sm text-textColor mt-2 pb-10 text-center px-4 leading-relaxed">
          Selamat datang di{" "}
          <span className="text-solidThree font-semibold">Mang TekTek</span>,
          silahkan login untuk segera memesan.
        </p>

        <div className="flex flex-col gap-6 w-full px-12">
          <FloatingInput
            label="Email"
            name="email"
            type="email"
            icon={assets.email}
          />
          <FloatingInput
            label="Password"
            name="password"
            type="password"
            icon={assets.password}
          />
          {/* Submit */}
          <button
            type="submit"
            className="active:scale-95 transition bg-secondary border border-gray-500/20 text-textColor hover:bg-[#262b32] text-sm font-medium rounded-md cursor-pointer flexCenter w-full mt-4 py-4 gap-2"
          >
            <img src={assets.login} width={18} />
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginModal;
