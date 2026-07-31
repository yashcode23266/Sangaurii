import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function NavigationDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
      if (event.type === "mousedown" && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("mousedown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div ref={rootRef} className="group relative">
      <button type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)} className="nav-link inline-flex items-center gap-1">
        {label}<ChevronDown size={15} className="transition group-hover:rotate-180" />
      </button>
      <div role="menu" className={`${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"} absolute left-0 top-full z-50 w-56 rounded-2xl border border-black/5 bg-white p-2 shadow-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}>
        {items.map((item) => (
          <Link role="menuitem" key={item.path} to={item.path} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-dark-text hover:bg-off-white hover:text-forest-green">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavigationDropdown;
