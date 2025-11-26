import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3">
      <div className="max-padd-container flexBetween">
        {/* Logo */}
        <div className="flex flex-1">
          <Link to={"/"} className="flex items-center">
            <img src={assets.logoImg} alt="logoImg" className="h-16" />
            <div
              className="flex flex-col justify-center gap-2"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              <span className="hidden sm:block font-extrabold text-md relative">
                Mang TekTek
              </span>
              <span className="hidden sm:block font-extrabold text-xs relative lowercase tracking-[2.2px] text-solidThree ">
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
                ? "flex items-start flex-col gap-y-2 fixed bg-primary top-16 right-6 p-4 rounded-xl shadow-xl w-52 ring-1 ring-slate-900/5 z-50"
                : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
            }`}
          />
        </div>

        {/* Profil & Tombol */}
        <div className="flex flex-1 items-center sm:justify-end gap-x-6">
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
          <div className="relative cursor-pointer flex justify-center">
            <img src={assets.cartAdded} alt="" className="w-6" />
            <label className="absolute bottom-8 text-xs font-bold bg-solidTwo text-white flexCenter rounded-full w-9">
              0
            </label>
          </div>
          {/* Profil Pengguna */}
          <div>
            <button className=" cursor-pointer flexCenter">
              <img src={assets.login} alt="" className="w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
