import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/data";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Sidebar = () => {
  const { navigate, isAdmin, user } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [submenuAnimClass, setSubmenuAnimClass] = useState("");

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: assets.dashboard,
    },
    {
      path: "/admin/analitik",
      label: "Analitik",
      icon: assets.analytic,
    },
    {
      label: "Kelola",
      icon: assets.management,
      hasChildren: true,
      children: [
        {
          path: "/admin/kelola-menu",
          label: "Kelola Menu",
          icon: assets.menuManagement,
        },
        {
          path: "/admin/kelola-pengguna",
          label: "Kelola Pengguna",
          icon: assets.customerManagement,
        },
        {
          path: "/admin/kelola-pesanan",
          label: "Kelola Pesanan",
          icon: assets.orderManagement,
        },
      ],
    },
    {
      path: "/admin/laporan",
      label: "Laporan",
      icon: assets.report,
    },
  ];

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  useEffect(() => {
    if (menuOpen) {
      // Tahap 1: pasang state awal
      setSubmenuAnimClass("submenu-enter");

      // Tahap 2 (frame berikutnya): jalankan animasi
      requestAnimationFrame(() => {
        setSubmenuAnimClass("submenu-enter-active");
      });
    } else {
      setSubmenuAnimClass("submenu-exit");
      requestAnimationFrame(() => {
        setSubmenuAnimClass("submenu-exit-active");
      });
    }
  }, [menuOpen]);

  const toggleSubMenu = () => {
    if (!menuOpen) {
      setAnimate(true);
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
      setTimeout(() => setAnimate(false), 300);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-[1440px] bg-primary h-screen flex">
        {/* SideBar */}
        <div className="max-md:flexCenter flex flex-col justify-between bg-secondary sm:m-3 h-auto min-h-[calc(100vh-24px)] sticky top-0 rounded-xl  shadow">
          <div className="flex flex-col gap-y-6 md:flex-col md:pt-2 ">
            <div className="w-full flex justify-between md:flex-col">
              {/* Logo */}
              <div className="flex flex-1 p-2 border-b border-[#49535d]">
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
            </div>
            <div className="flex md:flex-col md:gap-x-5 gap-y-2 md:mt-2">
              {navItems.map((link) => (
                <div key={link.label} className="w-full">
                  {/* Jika punya submenu */}
                  {link.hasChildren ? (
                    <>
                      <button
                        onClick={toggleSubMenu}
                        className="flex justify-between items-center w-full gap-x-2 p-5 pl-7 cursor-pointer text-sm font-bold hover:text-white"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={link.icon}
                            width={18}
                            className="hidden md:block"
                          />
                          <span>{link.label}</span>
                        </div>

                        {/* Icon Chevron */}
                        <img
                          src={assets.down}
                          className={`transition-transform duration-300 ${
                            menuOpen ? "rotate-180" : ""
                          }`}
                          width={16}
                        />
                      </button>

                      {/* Submenu */}
                      {(menuOpen || animate) && (
                        <div className="relative ml-8">
                          {/* Garis vertikal */}
                          <div className="absolute left-0 top-0 h-full w-px bg-[#49535d]" />

                          {/* Wrapper animasi */}
                          <div
                            className={`overflow-hidden ml-4 mt-1 ${submenuAnimClass}`}
                          >
                            <div className="flex flex-col gap-1 py-1">
                              {link.children.map((sub) => (
                                <NavLink
                                  key={sub.label}
                                  to={sub.path}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "flexStart gap-x-2 p-2 text-sm font-semibold bg-[#262b32] border-r-2 border-solidThree"
                                      : "flexStart gap-x-2 p-2 text-sm font-semibold hover:text-white"
                                  }
                                >
                                  <img
                                    src={sub.icon}
                                    width={18}
                                    className="hidden md:block"
                                  />
                                  <span>{sub.label}</span>
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Jika bukan submenu, NavLink normal */
                    <NavLink
                      to={link.path}
                      end={link.path === "/admin"}
                      className={({ isActive }) =>
                        isActive
                          ? "flexStart gap-x-2 p-5 pl-7 text-sm font-bold h-10 bg-[#262b32] border-l-3 border-solidThree"
                          : "flexStart gap-x-2 p-5 pl-7 text-sm font-bold h-10 hover:text-white"
                      }
                    >
                      <img
                        src={link.icon}
                        width={18}
                        className="hidden md:block"
                      />
                      <span>{link.label}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User */}
          <div className="hidden md:flex items-center gap-3 md:bg-secondary rounded-b-xl p-3 pl-4 md:mt-10 border-t border-[#49535d]">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "36px",
                    height: "36px",
                  },
                },
              }}
            />
            <div className="flex flex-col gap-2">
              <div className="text-sm font-bold text-solidThree capitalize">
                {user?.firstName} {user?.lastName}
              </div>
              <small className="text-xs font-medium text-textColor">
                {user?.primaryEmailAddress?.emailAddress}
              </small>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mr-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
