import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { contactDetails } from "../data/homeData";

const quickLinks = [
  ["Home", "/"],
  ["All Tour Packages", "/tours"],
  ["Vehicle Rental", "/vehicle-rental"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
];

const popularDestinations = [
  ["Jyotirlinga Yatra", "/tours?search=Jyotirlinga"],
  ["Malvan & Tarkarli", "/tours?search=Malvan"],
  ["Girnar & Somnath", "/tours?search=Somnath"],
  ["Kashmir Paradise", "/tours?search=Kashmir"],
  ["Kerala Backwaters", "/tours?search=Kerala"],
  ["Royal Rajasthan", "/tours?search=Rajasthan"],
];

function Footer() {
  return (
    <footer className="bg-[#111827] text-white border-t border-slate-800 relative overflow-hidden">
      <div className="site-container relative z-10 grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="inline-block bg-white p-3 sm:p-3.5 rounded-2xl shadow-md border border-slate-200">
            <BrandLogo className="h-12 sm:h-14" />
          </Link>
          <p className="text-xs leading-relaxed text-slate-300 max-w-sm font-medium">
            Travel with Trust. Travel with Joy. Customized domestic &amp; international tours, spiritual pilgrimage yatras, hotel bookings, vehicle rentals, and visa assistance.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-all"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-all"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-all"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-[#F4A228] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {quickLinks.map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="hover:text-[#F4A228] hover:translate-x-1 transition-all block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Destinations */}
        <div>
          <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-[#F4A228] mb-4">
            Destinations &amp; Yatras
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {popularDestinations.map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-[#F4A228] hover:translate-x-1 transition-all block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-serif font-bold text-xs uppercase tracking-widest text-[#F4A228] mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex gap-2.5">
              <MapPin size={15} className="shrink-0 text-[#F4A228]" />
              <span>{contactDetails.address}</span>
            </li>
            
            <li className="space-y-1.5 pt-1">
              {contactDetails.contacts.map((c) => (
                <a
                  key={c.name}
                  href={`tel:${c.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 hover:text-[#F4A228] transition-colors"
                >
                  <Phone size={14} className="shrink-0 text-[#F4A228]" />
                  <span className="font-semibold text-white">{c.name}:</span>
                  <span className="font-bold text-[#F4A228]">{c.phone}</span>
                </a>
              ))}
            </li>

            <li className="pt-1">
              <a href={`mailto:${contactDetails.email}`} className="flex gap-2.5 hover:text-[#F4A228] transition-colors">
                <Mail size={15} className="shrink-0 text-[#F4A228]" />
                <span>{contactDetails.email}</span>
              </a>
            </li>

            <li className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[0.68rem] text-slate-300 font-semibold">
                <ShieldCheck size={14} className="text-[#184829]" />
                <span>{contactDetails.guarantee}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="site-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.75rem] text-slate-400">
          <p>© {new Date().getFullYear()} SANGAURII TOURS &amp; TRAVELS. All rights reserved.</p>
          <div className="flex gap-5 text-slate-400 font-medium">
            <Link to="/privacy" className="hover:text-[#F4A228] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#F4A228] transition">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
