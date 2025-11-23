import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened((prev) => !prev);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-3">
      <div className="max-padd-container flexBetween">
        {/* Logo */}
        <div className="flex flex-1">
          <Link to={"/"} className="flex items-center">
            <img src={assets.logoImg} alt="logoImg" className="h-18" />
            <div className="flex flex-col justify-center gap-2">
              <span className="hidden sm:block font-extrabold text-xl relative">
                Mang TekTek
              </span>
              <span className="hidden sm:block font-extrabold text-xs relative uppercase tracking-[4.7px] text-solidThree ">
                Sedap Malam
              </span>
            </div>
          </Link>
        </div>

        {/* Navbar */}
        <div className="flexCenter flex-1">
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles={`${
              menuOpened
                ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 z-50"
                : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
            }`}
          />
        </div>

        {/* Profil & Tombol */}
        <div className="flex flex-1 items-center sm:justify-end gap-x-4">
          {/* Toggle Menu */}
          <div className="relative lg:hidden w-7 h-6">
            <img
              src={assets.menu}
              onClick={toggleMenu}
              alt=""
              className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${
                menuOpened ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src={assets.menuClose}
              onClick={toggleMenu}
              alt=""
              className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${
                menuOpened ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          {/* Keranjang */}
          <div className="relative cursor-pointer">
            <img
              src={assets.cartAdded}
              alt=""
              className="min-w-11 bg-white rounded-full p-2"
            />
            <label className="absolute bottom-10 right-1 text-xs font-bold bg-solidThree text-white flexCenter rounded-full w-9">
              0
            </label>
          </div>
          {/* Profil Pengguna */}
          <div>
            <button className="btn-solid flexCenter gap-2">
              Login
              <img src={assets.user} alt="" className="invert w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
