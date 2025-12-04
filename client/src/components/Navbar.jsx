import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles, setMenuOpened }) => {
  const navLinks = [
    { path: "/", title: "Beranda" },
    { path: "/menu", title: "Menu" },
    { path: "/blog", title: "Blog" },
  ];
  return (
    <nav className={containerStyles}>
      {navLinks.map((link) => (
        <NavLink
          onClick={() => setMenuOpened(false)}
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            `${
              isActive ? "active-link" : ""
            } px-3 py-2 rounded-full text-sm font-bold hover:text-solidThree`
          }
          style={{
            fontFamily: "var(--font-sans)",
          }}
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
