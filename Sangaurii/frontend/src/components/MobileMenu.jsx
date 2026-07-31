import { ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { openEnquiryModal } from "../utils/enquiry";

const links = [
  ["Home", "/"], ["All Tours", "/tours"], ["Domestic Tours", "/tours/domestic"],
  ["International Tours", "/tours/international"], ["Special Tours", "/tours/special"],
  ["Customized Tours", "/tours/customized"], ["Vehicle Rental", "/vehicle-rental"],
  ["About Us", "/about"], ["Gallery", "/gallery"], ["Blogs", "/blogs"], ["Contact", "/contact"],
];

function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <button type="button" aria-label="Close mobile menu" onClick={onClose} className={`fixed inset-0 z-50 bg-deep-navy/50 backdrop-blur-sm transition lg:hidden ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden={!isOpen} className={`fixed right-0 top-0 z-50 flex h-full w-[min(88%,360px)] flex-col bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="mb-7 flex items-center justify-between">
          <span className="font-display font-bold text-forest-green">Explore</span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-full bg-off-white p-2"><X size={20} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {links.map(([label, path]) => (
            <Link key={path} to={path} onClick={onClose} className="flex items-center justify-between border-b border-black/5 py-3.5 font-medium text-dark-text">
              {label}<ChevronRight size={16} className="text-medium-blue" />
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => { onClose(); openEnquiryModal(); }} className="button-primary mt-6 w-full">Plan My Trip</button>
      </aside>
    </>
  );
}

export default MobileMenu;
