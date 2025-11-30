import React from "react";
import SosialMedia from "./SosialMedia";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/data";

const Footer = () => {
  const footerLinks = [
    { path: "/kebijakan-privasi", title: "Kebijakan Privasi" },
    { path: "/syarat-layanan", title: "Syarat Layanan" },
    { path: "/tentang-kami", title: "Tentang Kami" },
    { path: "/pusat-bantuan", title: "Pusat Bantuan" },
  ];
  return (
    <footer className="w-full bg-secondary">
      <SosialMedia />
      <div className="max-padd-container flexCenter flex-col">
        <div className="flexCenter px-5 gap-3 mt-5">
          {footerLinks.map((footerLink) => (
            <NavLink
              key={footerLink.title}
              to={footerLink.path}
              className="lg:px-3 px-1 py-2 lg:text-xs text-[8px] font-medium hover:underline"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              {footerLink.title}
            </NavLink>
          ))}
        </div>
        <div className="flexCenter px-3 lg:px-5 gap-3 lg:gap-5 my-2 lg:my-3">
          <div className="flexCenter">
            <img src={assets.logoImg} alt="logoImg" className="lg:h-16 h-10" />
            <div
              className="flex flex-col justify-center lg:gap-2 gap-1"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              <span className="block font-extrabold text-xs lg:text-base relative">
                Mang TekTek
              </span>
              <span className="block font-extrabold text-[10px] lg:text-xs relative lowercase tracking-[1.2px] lg:tracking-[2.2px] text-solidThree ">
                Sedap Malam
              </span>
            </div>
          </div>
          <hr className="w-px bg-textColor h-[42px]" />
          <div className="flexCenter gap-1 lg:gap-2">
            <img src={assets.awlogo} alt="awlogo" className="lg:h-16 h-10" />
            <div
              className="flex flex-col justify-center lg:gap-1 gap-0.5"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              <span className="block font-medium text-[8px] lg:text-xs relative">
                Diproduksi oleh:
              </span>
              <span className="block font-semibold text-xs lg:text-base relative text-solidThree ">
                Aryo Wibisono
              </span>
            </div>
          </div>
        </div>
        <small className="lg:text-xs text-center text-[7px] font-semibold">
          "Jadilah pelanggan setia Mang TekTek dan gabung ke dalam komunitas
          kami yang profesional."
        </small>
        <span className="lg:text-xs text-center text-[8px] font-medium my-3">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="text-solidThree"> Mang TekTek</span> • All Rights
          Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
