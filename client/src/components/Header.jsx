import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";
import KontakKami from "./KontakKami";
import { useAppContext } from "../context/AppContext";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { navigate, hitunganKeranjang } = useAppContext();
  const [contactOpened, setContactOpened] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const { authUser, logout } = useAuthStore();

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pt-3 pb-1"
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
              {authUser ? (
                <div className="flex flex-col relative">
                  <button
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                    }}
                    className="flexCenter gap-1 cursor-pointer focus:outline-none"
                  >
                    <div className="flex flex-col items-end justify-center gap-0.5 pr-2 py-2">
                      <small
                        className="text-textColor text-xs font-medium"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        Selamat Datang,
                      </small>
                      <span
                        className="text-solidThree text-sm font-bold"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        {authUser.fullName}
                      </span>
                    </div>
                    <img
                      src={assets.defaultAvatar}
                      alt="profile-picture"
                      className="w-11 h-11 rounded-full cursor-pointer"
                    />
                    <img
                      src={assets.down}
                      className={`ml-1 transition-transform duration-300 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                      width={16}
                    />
                  </button>
                  {profileOpen && (
                    <div className="w-56 bg-secondary rounded-xl absolute -right-2 top-12 shadow-xl mt-1 py-2">
                      <button
                        className="flex w-full gap-3 px-3 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img
                          src={assets.profileEdit}
                          alt="profile"
                          width={16}
                        />
                        <span className="text-sm font-semibold">
                          Foto Profil
                        </span>
                      </button>
                      <button
                        onClick={() => navigate("/alamat")}
                        className="flex w-full gap-3 px-3 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img src={assets.user} alt="profile" width={16} />
                        <span className="text-sm font-semibold">
                          Identitas dan Alamat
                        </span>
                      </button>
                      <button
                        onClick={logout}
                        className="flex w-full gap-3 px-3 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img src={assets.logout} alt="logout" width={16} />
                        <span className="text-sm font-semibold">Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col relative">
                  <button
                    onClick={() => {
                      setSigninOpen(!signinOpen);
                    }}
                    className=" cursor-pointer flexCenter"
                  >
                    <img
                      src={assets.login}
                      alt=""
                      className="w-6 icon-filter-yellow"
                    />
                    <img
                      src={assets.down}
                      className={`ml-2 transition-transform duration-300 ${
                        signinOpen ? "rotate-180" : ""
                      }`}
                      width={16}
                    />
                  </button>
                  {signinOpen && (
                    <div className="w-40 bg-secondary rounded-xl absolute -right-10 top-12 shadow-xl mt-1 py-2">
                      <button
                        onClick={() => setLoginModalOpen(true)}
                        className="flex w-full gap-3 px-3 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img src={assets.login} alt="profile" width={16} />
                        <span className="text-sm font-semibold">Login</span>
                      </button>
                      <button
                        onClick={() => setSignupModalOpen(true)}
                        className="flex w-full gap-3 px-3 py-2 hover:bg-[#262b32] text-textColor font-medium cursor-pointer"
                        style={{
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        <img src={assets.signup} alt="signup" width={16} />
                        <span className="text-sm font-semibold">Signup</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* MODAL KONTAK */}
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

      {/* MODAL LOGIN */}
      {loginModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLoginModalOpen(false)}
        >
          <div
            className="bg-transparent p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Konten Modal */}
            <LoginModal onClose={() => setLoginModalOpen(false)} />
          </div>
        </div>
      )}

      {/* MODAL SIGNUP */}
      {signupModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSignupModalOpen(false)}
        >
          <div
            className="bg-transparent p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Konten Modal */}
            <SignupModal onClose={() => setSignupModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
