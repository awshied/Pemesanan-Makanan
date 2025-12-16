import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/data";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = () => {
  const { navigate, isAdmin } = useAppContext();
  const { authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [submenuAnimClass, setSubmenuAnimClass] = useState("");

  const [mobileSubmenu, setMobileSubmenu] = useState(false);
  const [mobileSubmenuAnim, setMobileSubmenuAnim] = useState("");

  const location = useLocation();
  const kelolaActive = location.pathname.startsWith("/admin/kelola");

  const isProfileActive = location.pathname.includes("/profile");

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: assets.dashboard,
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
      path: "/admin/blog",
      label: "Blog",
      icon: assets.blog,
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

  // HANDLE MOBILE SUBMENU POPUP
  const openMobileSubmenu = () => {
    setMobileSubmenu(true);

    setTimeout(() => {
      setMobileSubmenuAnim("translate-y-0 opacity-100");
    }, 20);
  };

  const closeMobileSubmenu = () => {
    setMobileSubmenuAnim("translate-y-full opacity-0");

    setTimeout(() => {
      setMobileSubmenu(false);
    }, 250);
  };

  return (
    <div>
      <div className="mx-auto max-w-[1440px] bg-primary min-h-screen md:h-screen flex flex-col md:flex-row">
        {/* SideBar */}
        <div className="hidden max-md:flexCenter md:flex flex-col justify-between overflow-y-auto max-h-screen bg-secondary w-full md:w-[250px] sm:m-3 md:h-[calc(100vh-24px)] md:sticky md:top-0 rounded-xl shadow">
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
            {authUser ? (
              <div className="flex items-center gap-3">
                <img
                  src={authUser.profilePic}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-0.5">
                  <div className="text-sm font-bold text-solidThree capitalize">
                    {authUser.fullName}
                  </div>
                  <small className="text-xs font-medium text-textColor">
                    {authUser.email}
                  </small>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mr-3 pb-20 md:pb-0">
          <Outlet />
        </div>
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-secondary border-t border-[#49535d] overflow-visible flex justify-around py-4 z-50">
          {navItems.map((item) =>
            item.hasChildren ? (
              // Untuk item dengan submenu — tetap pakai button untuk membuka popup
              <button
                onClick={openMobileSubmenu}
                className={`flex flex-col items-center px-3 py-2 ${
                  kelolaActive
                    ? "border-t-2 border-solidThree text-solidThree"
                    : "text-textColor"
                }`}
              >
                <img src={assets.management} width={22} />
              </button>
            ) : (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex flex-col items-center px-3 py-2 ${
                    isActive
                      ? "border-t-2 border-solidThree text-solidThree"
                      : "text-textColor"
                  }`
                }
              >
                <img src={item.icon} width={22} alt={item.label} />
              </NavLink>
            )
          )}
          <div
            className={`flex flex-col items-center px-3 py-2 ${
              isProfileActive ? "border-t-2 border-solidThree" : ""
            }`}
          >
            {authUser ? (
              <div className="flex items-center gap-3">
                <img
                  src={authUser.profilePic}
                  className="w-9 h-9 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-solidThree capitalize">
                    {authUser.fullName}
                  </div>
                  <small className="text-xs font-medium text-textColor">
                    {authUser.email}
                  </small>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </div>
        </div>

        {mobileSubmenu && (
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeMobileSubmenu}
          >
            <div
              className={`fixed bottom-0 left-0 w-full bg-secondary p-5 rounded-t-xl shadow-xl transform transition-all duration-300 ${mobileSubmenuAnim}`}
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-bold text-lg mb-3 text-white">Kelola</h4>

              <div className="flex flex-col gap-3">
                {navItems[1].children.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => {
                      navigate(sub.path);
                      closeMobileSubmenu();
                    }}
                    className="flex gap-3 items-center p-3 bg-[#262b32] rounded-lg text-white hover:bg-[#30363f]"
                  >
                    <img src={sub.icon} width={20} />
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
