import { Menu, PhoneCall } from "lucide-react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import NavigationDropdown from "./NavigationDropdown";
import { openEnquiryModal } from "../utils/enquiry";
import { gsap, motionSafe } from "../utils/gsapUtils";

const tourItems = [
  { label: "All Tours", path: "/tours" },
  { label: "Domestic Tours", path: "/tours/domestic" },
  { label: "International Tours", path: "/tours/international" },
  { label: "Special Tours", path: "/tours/special" },
  { label: "Customized Tours", path: "/tours/customized" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef();
  const navClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  useGSAP(() => {
    if (!motionSafe()) return;
    gsap.to(headerRef.current, { height: 68, boxShadow: "0 12px 30px rgba(14, 50, 31, .12)", backgroundColor: "rgba(255,255,255,.92)", ease: "power2.out", scrollTrigger: { start: "top -70", end: "max", toggleActions: "play none none reverse" } });
  }, { scope: headerRef });

  return (
    <>
      <header ref={headerRef} className="glass-nav sticky top-0 z-50">
        <div className="site-container flex h-[76px] items-center justify-between gap-5 lg:h-[84px]">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Sangaurii Tours and Travels home">
            <BrandLogo className="h-14 w-14 lg:h-16 lg:w-16" />
            <span className="hidden max-w-[210px] font-display text-base font-extrabold uppercase leading-tight tracking-[.08em] text-slate-900 sm:block lg:text-lg">Sangaurii <small className="mt-0.5 block font-sans text-[.58em] font-extrabold tracking-[.2em] text-golden-orange">Tours and Travels</small></span>
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
            <button type="button" onClick={openEnquiryModal} className="hidden rounded-full bg-forest-green px-5 py-3 text-sm font-bold text-white shadow-lg shadow-forest-green/20 transition hover:-translate-y-0.5 hover:bg-[#0a3d33] xl:inline-flex"><PhoneCall size={17} /> Inquire Now</button>
            <button type="button" onClick={() => setMenuOpen(true)} className="rounded-xl border border-slate-200 p-2.5 text-slate-900 lg:hidden" aria-label="Open menu"><Menu /></button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
