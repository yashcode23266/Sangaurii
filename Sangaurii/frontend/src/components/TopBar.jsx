import React from "react";
import { Mail, Phone, Clock, Instagram, Facebook, Youtube } from "lucide-react";

function TopBar() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "+91 88200 00000";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "info@sangauriitours.com";

  return (
    <div className="bg-[#1C4E8A] text-white/90 text-xs border-b border-white/10">
      <div className="site-container flex items-center justify-between py-2 gap-4">
        {/* Phone & Email */}
        <div className="flex items-center gap-5">
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium"
          >
            <Phone size={13} className="text-[#EAB308]" />
            <span>{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail size={13} className="text-[#EAB308]" />
            <span>{email}</span>
          </a>
        </div>

        {/* Operating Hours / Tagline */}
        <div className="hidden lg:flex items-center gap-2 text-white/75 text-[0.75rem]">
          <Clock size={13} className="text-[#EAB308]" />
          <span>Mon–Sat: 9:30 AM – 7:30 PM</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#EAB308] transition">
            <Instagram size={13} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#EAB308] transition">
            <Facebook size={13} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#EAB308] transition">
            <Youtube size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
