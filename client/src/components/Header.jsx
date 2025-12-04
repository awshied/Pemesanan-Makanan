import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";
import KontakKami from "./KontakKami";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { openSignIn } = useClerk();
  const { navigate, isSignedIn, hitunganKeranjang } = useAppContext();
  const [contactOpened, setContactOpened] = useState(false);

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  const OrdersIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M15 12h-5m5-4h-5m9 9V5a2 2 0 0 0-2-2H4" />
        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
      </g>
    </svg>
  );

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pt-3 pb-1 "
        style={{
          backgroundColor: "rgba(47, 54, 61, 0.8)",
        }}
      >
        <div className="max-padd-container flexBetween">
          {/* Logo */}
          <div className="flex flex-1">
            <Link
              to={"/"}
              className="flex items-center hover:opacity-80 transition"
            >
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
                  ? "flex items-start flex-col gap-y-2 fixed bg-secondary top-16 right-6 p-4 rounded-xl w-52 ring-1 ring-slate-900/5 z-50"
                  : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
              }`}
            />
          </div>

          {/* Profil & Tombol */}
          <div className="flex flex-1 items-center sm:justify-end gap-x-8">
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
                width={29}
                className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${
                  menuOpened ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
            {/* Kontak */}
            <div
              onClick={() => setContactOpened(true)}
              className="relative cursor-pointer flex justify-center"
            >
              <img
                src={assets.contact}
                alt=""
                className="w-8 icon-filter-yellow"
              />
            </div>
            {/* Keranjang */}
            <div
              onClick={() => navigate("/keranjang")}
              className="relative cursor-pointer flex justify-center"
            >
              <img
                src={assets.cartAdded}
                alt=""
                className="w-6 icon-filter-yellow"
              />
              <label className="absolute bottom-3 left-3 text-[10px] font-bold bg-solidTwo text-white flexCenter rounded-full px-1.5 py-0.5">
                {hitunganKeranjang()}
              </label>
            </div>
            {/* Profil Pengguna */}
            <div>
              {isSignedIn ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "36px",
                        height: "36px",
                      },
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="Pesanan Gue"
                      labelIcon={<OrdersIcon />}
                      onClick={() => navigate("/pesanan")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button
                  onClick={openSignIn}
                  className=" cursor-pointer flexCenter"
                >
                  <img
                    src={assets.login}
                    alt=""
                    className="w-6 icon-filter-yellow"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* 🔥 MODAL KONTAK */}
      {contactOpened && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setContactOpened(false)}
        >
          <div
            className="bg-transparent p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Konten Modal */}
            <KontakKami onClose={() => setContactOpened(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
