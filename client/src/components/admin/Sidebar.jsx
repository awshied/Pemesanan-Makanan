import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/data";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Sidebar = () => {
  const { navigate, isAdmin, user } = useAppContext();

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: assets.dashboard,
    },
    {
      path: "/admin/kelola-menu",
      label: "Kelola Menu",
      icon: assets.menuManagement,
    },
    {
      path: "/admin/daftar-menu",
      label: "Daftar Menu",
      icon: assets.menuList,
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

  return (
    <div>
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row bg-primary">
        {/* SideBar */}
        <div className="max-md:flexCenter flex flex-col justify-between bg-secondary sm:m-3 md:min-w-60 md:min-h-[96vh] rounded-xl shadow">
          <div className="flex flex-col gap-y-6 md:flex-col md:pt-2 ">
            <div className="w-full flex justify-between md:flex-col">
              {/* Logo */}
              <div className="flex flex-1 p-2 border-b border-primary">
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
                <NavLink
                  key={link.label}
                  to={link.path}
                  end={link.path === "/admin"}
                  className={({ isActive }) =>
                    isActive
                      ? "flexStart gap-x-2 p-5 pl-7 text-sm font-bold h-10 border-l-3 bg-[#262b32] border-solidThree"
                      : "flexStart gap-x-2 p-5 pl-7 text-sm font-bold h-10 hover:text-white rounded-xl"
                  }
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="hidden md:block"
                    width={18}
                  />
                  <div>{link.label}</div>
                </NavLink>
              ))}
            </div>
          </div>

          {/* User */}
          <div className="hidden md:flex items-center gap-3 md:bg-secondary rounded-b-xl p-3 pl-4 md:mt-10 border-t border-primary">
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
      </div>
    </div>
  );
};

export default Sidebar;
