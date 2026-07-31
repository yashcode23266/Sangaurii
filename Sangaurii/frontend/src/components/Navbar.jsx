import { Menu, PhoneCall } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import NavigationDropdown from "./NavigationDropdown";
import { openEnquiryModal } from "../utils/enquiry";

const tourItems = [
  { label: "All Tours", path: "/tours" },
  { label: "Domestic Tours", path: "/tours/domestic" },
  { label: "International Tours", path: "/tours/international" },
  { label: "Special Tours", path: "/tours/special" },
  { label: "Customized Tours", path: "/tours/customized" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navClass = ({ isActive }) => `nav-link ${isActive ? "text-forest-green" : ""}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="site-container flex h-[76px] items-center justify-between gap-5 lg:h-[84px]">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Sangaurii Tours and Travels home">
            <BrandLogo className="h-14 w-14 lg:h-16 lg:w-16" />
            <span className="hidden max-w-[190px] font-display text-base font-bold leading-tight text-forest-green sm:block lg:text-lg">Sangaurii Tours and Travels</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            <NavLink to="/" className={navClass}>Home</NavLink>
            <NavigationDropdown label="Tours" items={tourItems} />
            <NavLink to="/vehicle-rental" className={navClass}>Vehicle Rental</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/gallery" className={navClass}>Gallery</NavLink>
            <NavLink to="/blogs" className={navClass}>Blogs</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={openEnquiryModal} className="button-primary hidden xl:inline-flex"><PhoneCall size={17} /> Plan My Trip</button>
            <button type="button" onClick={() => setMenuOpen(true)} className="rounded-xl border border-forest-green/15 p-2.5 text-forest-green lg:hidden" aria-label="Open menu"><Menu /></button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
