import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex items-center justify-between text-base py-4 mb-5 bg-white sticky top-0 z-50 shadow-sm ${scrolled ? 'bg-opacity-80 backdrop-blur-lg' : ''}`}>
      <h1 onClick={() => navigate("/")} className="cursor-pointer text-primary text-3xl font-bold">
        BestBid
      </h1>
      <ul className="hidden md:flex gap-5 items-center font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "relative text-primary font-semibold group"
              : "relative text-gray-600 group"
          }
        >
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink
          to="/auctions"
          className={({ isActive }) =>
            isActive
              ? "relative text-primary font-semibold group"
              : "relative text-gray-600 group"
          }
        >
          <li className="py-1">Auctions</li>
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive
              ? "relative text-primary font-semibold group"
              : "relative text-gray-600 group"
          }
        >
          <li className="py-1">About</li>
        </NavLink>
        <NavLink to="/login">
          <li className="bg-primary text-white px-7 py-2 rounded-lg font-semibold hidden md:block">
            Login
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
