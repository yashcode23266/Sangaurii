import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ChevronDown, Compass } from "lucide-react";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import { openEnquiryModal } from "../utils/enquiry";

const indiaDestinations = [
  {
    region: "North India",
    items: [
      { name: "Kashmir Paradise", path: "/tours?region=kashmir" },
      { name: "Himachal Magic", path: "/tours?region=himachal" },
      { name: "Uttarakhand Hills", path: "/tours?region=uttarakhand" },
      { name: "Royal Rajasthan", path: "/tours?region=rajasthan" },
      { name: "Leh Ladakh", path: "/tours?region=ladakh" },
    ],
  },
  {
    region: "South India",
    items: [
      { name: "Kerala Backwaters", path: "/tours?region=kerala" },
      { name: "Andaman Islands", path: "/tours?region=andaman" },
      { name: "Coorg & Karnataka", path: "/tours?region=karnataka" },
      { name: "Tamil Nadu Temples", path: "/tours?region=tamilnadu" },
    ],
  },
  {
    region: "East & West",
    items: [
      { name: "Meghalaya & Sikkim", path: "/tours?region=meghalaya" },
      { name: "Assam & Northeast", path: "/tours?region=assam" },
      { name: "Goa & Konkan", path: "/tours?region=goa" },
      { name: "Gujarat Rann Utsav", path: "/tours?region=gujarat" },
    ],
  },
];

const worldDestinations = [
  { name: "Dubai & Abu Dhabi", path: "/tours?world=dubai" },
  { name: "Bali & Indonesia", path: "/tours?world=bali" },
  { name: "Thailand & Islands", path: "/tours?world=thailand" },
  { name: "Singapore & Malaysia", path: "/tours?world=singapore" },
  { name: "Switzerland & Europe", path: "/tours?world=switzerland" },
  { name: "Bhutan Kingdom", path: "/tours?world=bhutan" },
];

function Navbar({ onOpenEnquiry }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e) => {
      if (!e.target.closest("header")) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEnquiry = (type = "Plan Your Trip") => {
    if (onOpenEnquiry) {
      onOpenEnquiry(type);
    } else {
      openEnquiryModal(type);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm text-[#111827]"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100 text-[#111827]"
        }`}
      >
        <div className="site-container flex min-h-[5.25rem] sm:min-h-[5.75rem] items-center justify-between gap-4 py-2.5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Sangaurii Tours and Travels">
            <BrandLogo className="h-14 sm:h-16 lg:h-20" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-semibold transition-colors rounded-full ${
                  isActive ? "text-[#1C4E8A] bg-[#1C4E8A]/5 font-bold" : "text-[#111827] hover:text-[#1C4E8A]"
                }`
              }
            >
              Home
            </NavLink>

            {/* India NavLink & Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("india")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center rounded-full transition-colors hover:bg-slate-100/80">
                <NavLink
                  to="/tours/domestic"
                  className={({ isActive }) =>
                    `pl-3.5 pr-1 py-2 text-sm font-semibold transition-colors rounded-l-full ${
                      isActive ? "text-[#1C4E8A] font-bold" : "text-[#111827] hover:text-[#1C4E8A]"
                    }`
                  }
                >
                  India
                </NavLink>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "india" ? null : "india");
                  }}
                  aria-label="Toggle India destinations menu"
                  className="p-1.5 pr-2.5 rounded-r-full text-slate-500 hover:text-[#1C4E8A] transition-colors cursor-pointer"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === "india" ? "rotate-180 text-[#1C4E8A]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {activeDropdown === "india" && (
                <div className="absolute top-full left-0 w-[540px] bg-white rounded-2xl shadow-xl border border-slate-100 p-5 grid grid-cols-3 gap-5 animate-in fade-in duration-150 z-50 mt-1">
                  {indiaDestinations.map((col) => (
                    <div key={col.region} className="space-y-2">
                      <h4 className="font-serif font-bold text-xs text-[#1C4E8A] uppercase tracking-wider pb-1 border-b border-slate-100">
                        {col.region}
                      </h4>
                      <ul className="space-y-1.5">
                        {col.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-medium text-slate-600 hover:text-[#184829] transition-colors block py-0.5 hover:translate-x-0.5 transform duration-150"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* International NavLink & Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("world")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center rounded-full transition-colors hover:bg-slate-100/80">
                <NavLink
                  to="/tours/international"
                  className={({ isActive }) =>
                    `pl-3.5 pr-1 py-2 text-sm font-semibold transition-colors rounded-l-full ${
                      isActive ? "text-[#1C4E8A] font-bold" : "text-[#111827] hover:text-[#1C4E8A]"
                    }`
                  }
                >
                  International
                </NavLink>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "world" ? null : "world");
                  }}
                  aria-label="Toggle International destinations menu"
                  className="p-1.5 pr-2.5 rounded-r-full text-slate-500 hover:text-[#1C4E8A] transition-colors cursor-pointer"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === "world" ? "rotate-180 text-[#1C4E8A]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {activeDropdown === "world" && (
                <div className="absolute top-full left-0 w-[240px] bg-white rounded-2xl shadow-xl border border-slate-100 p-3 space-y-1 animate-in fade-in duration-150 z-50 mt-1">
                  {worldDestinations.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#F8FAFC] hover:text-[#184829] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/vehicle-rental"
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-semibold transition-colors rounded-full ${
                  isActive ? "text-[#1C4E8A] bg-[#1C4E8A]/5 font-bold" : "text-[#111827] hover:text-[#1C4E8A]"
                }`
              }
            >
              Vehicle Rental
            </NavLink>

            {/* About NavLink & Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="flex items-center rounded-full transition-colors hover:bg-slate-100/80">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `pl-3.5 pr-1 py-2 text-sm font-semibold transition-colors rounded-l-full ${
                      isActive ? "text-[#1C4E8A] font-bold" : "text-[#111827] hover:text-[#1C4E8A]"
                    }`
                  }
                >
                  About
                </NavLink>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "about" ? null : "about");
                  }}
                  aria-label="Toggle About menu"
                  className="p-1.5 pr-2.5 rounded-r-full text-slate-500 hover:text-[#1C4E8A] transition-colors cursor-pointer"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      activeDropdown === "about" ? "rotate-180 text-[#1C4E8A]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {activeDropdown === "about" && (
                <div className="absolute top-full left-0 w-[220px] bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 animate-in fade-in duration-150 z-50 mt-1">
                  <Link
                    to="/about"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#F8FAFC] hover:text-[#184829] transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/gallery"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#F8FAFC] hover:text-[#1C4E8A] transition-colors"
                  >
                    Guest Photos &amp; Memories
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-semibold transition-colors rounded-full ${
                  isActive ? "text-[#1C4E8A] bg-[#1C4E8A]/5 font-bold" : "text-[#111827] hover:text-[#1C4E8A]"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Enquire Now CTA Button in Sunburst Orange */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleEnquiry("Plan Your Trip")}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hidden sm:inline-flex items-center gap-1.5"
            >
              <Compass size={15} />
              <span>Enquire Now</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-xl text-[#111827] lg:hidden hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
