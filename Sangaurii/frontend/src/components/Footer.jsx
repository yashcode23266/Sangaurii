import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [["About Us", "/about"], ["Gallery", "/gallery"], ["Travel Blogs", "/blogs"], ["Contact Us", "/contact"]];
const tourLinks = [["Domestic Tours", "/tours/domestic"], ["International Tours", "/tours/international"], ["Special Tours", "/tours/special"], ["Customized Tours", "/tours/customized"]];

function Footer() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "+91 74980 45445";
  const secondaryPhone = import.meta.env.VITE_CONTACT_PHONE_ALT || "+91 96379 17265";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "hello@sangauriitours.com";
  const socialLinks = [
    ["Instagram", Instagram, import.meta.env.VITE_INSTAGRAM_URL],
    ["Facebook", Facebook, import.meta.env.VITE_FACEBOOK_URL],
    ["YouTube", Youtube, import.meta.env.VITE_YOUTUBE_URL],
  ].filter(([, , url]) => url);

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-slate-400">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-golden-orange to-transparent" />
      <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.8fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-16 w-16" markClassName="bg-white text-slate-900" />
            <span className="max-w-[210px] font-display text-lg font-bold uppercase leading-tight tracking-[.08em] text-white">Sangaurii <small className="mt-1 block font-sans text-[.58em] font-extrabold tracking-[.2em] text-golden-orange">Tours and Travels</small></span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">Thoughtfully planned holidays, warm personal service and memorable travel experiences for families, couples and groups.</p>
          {socialLinks.length > 0 && <div className="mt-6 flex gap-3">{socialLinks.map(([label, Icon, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`${label} profile`} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-forest-green"><Icon size={17} /></a>)}</div>}
        </div>
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">{quickLinks.map(([label, path]) => <li key={path}><Link to={path}><ArrowRight size={13} />{label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="footer-title">Explore Tours</h3>
          <ul className="footer-links">{tourLinks.map(([label, path]) => <li key={path}><Link to={path}><ArrowRight size={13} />{label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="footer-title">Reach Us</h3>
          <ul className="space-y-4 text-sm leading-6 text-slate-400">
            <li className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-golden-orange" /> Maharashtra, India</li>
            <li><a href={`tel:${phone}`} className="flex gap-3 hover:text-white"><Phone size={18} className="shrink-0 text-golden-orange" /> {phone}</a></li>
            <li><a href={`tel:${secondaryPhone}`} className="flex gap-3 hover:text-white"><Phone size={18} className="shrink-0 text-golden-orange" /> {secondaryPhone}</a></li>
            <li><a href={`mailto:${email}`} className="flex gap-3 hover:text-white"><Mail size={18} className="shrink-0 text-golden-orange" /> {email}</a></li>
          </ul>
          <div className="mt-7"><p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-golden-orange">Travel notes in your inbox</p><NewsletterForm compact /></div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Sangaurii Tours and Travels. All rights reserved.</p>
          <div className="flex gap-5"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms & Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
