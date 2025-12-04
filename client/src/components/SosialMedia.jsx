import React, { useState } from "react";
import { assets, socialMedia } from "../assets/data";
import { NavLink } from "react-router-dom";
import KontakKami from "./KontakKami";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SosialMedia = () => {
  const [contactOpened, setContactOpened] = useState(false);

  const navLinks = [
    { path: "/", title: "Beranda", icon: assets.beranda },
    { path: "/menu", title: "Menu", icon: assets.aneka },
    { path: null, title: "Kontak", icon: assets.contact },
    { path: "/pesanan", title: "Pesanan", icon: assets.myOrder },
  ];

  return (
    <>
      <div className="flex justify-between flex-col lg:flex-row bg-secondary px-4 lg:px-40 lg:py-4 py-2 shadow-xl gap-4">
        {/* Bagian Halaman */}
        <div className="border-3 border-primary hidden lg:flex justify-center items-center rounded-lg">
          <div className="bg-primary">
            <img src={assets.app} className="p-2 size-11" />
          </div>
          <div className="flexCenter flex-1">
            <nav className="flexCenter px-5 gap-3">
              {navLinks.map((pageLink) => (
                <Tooltip key={pageLink.title}>
                  <TooltipTrigger asChild>
                    {pageLink.title === "Kontak" ? (
                      <button
                        onClick={() => setContactOpened(true)}
                        className="p-2 cursor-pointer"
                      >
                        <img
                          src={pageLink.icon}
                          alt={pageLink.title}
                          className="w-7 icon-filter-yellow"
                        />
                      </button>
                    ) : (
                      // Default NavLink
                      <NavLink
                        to={pageLink.path}
                        className={({ isActive }) =>
                          `${isActive ? "active-page" : ""} p-2 `
                        }
                      >
                        <img
                          src={pageLink.icon}
                          alt={pageLink.title}
                          className="w-7 icon-filter-yellow"
                        />
                      </NavLink>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>{pageLink.title}</TooltipContent>
                </Tooltip>
              ))}
            </nav>
          </div>
        </div>
        {/* Bagian Sosmed */}
        <div className="flexCenter px-3 lg:px-5 gap-3">
          {socialMedia.map(({ _id, imgIcon, name }) => (
            <Tooltip key={_id}>
              <TooltipTrigger asChild>
                <button className="border lg:border-2 border-textColor rounded-full p-1 lg:p-2 cursor-pointer icon-filter-yellow">
                  <img
                    src={imgIcon}
                    alt={_id}
                    className="w-7 icon-filter-yellow"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>{name}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
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

export default SosialMedia;
