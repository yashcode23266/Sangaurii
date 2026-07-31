import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const quickLinks = [["About Us", "/about"], ["Gallery", "/gallery"], ["Travel Blogs", "/blogs"], ["Contact Us", "/contact"]];
const tourLinks = [["Domestic Tours", "/tours/domestic"], ["International Tours", "/tours/international"], ["Special Tours", "/tours/special"], ["Customized Tours", "/tours/customized"]];

function Footer() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "hello@sangauriitours.com";
  const socialLinks = [
    ["Instagram", Instagram, import.meta.env.VITE_INSTAGRAM_URL],
    ["Facebook", Facebook, import.meta.env.VITE_FACEBOOK_URL],
    ["YouTube", Youtube, import.meta.env.VITE_YOUTUBE_URL],
  ].filter(([, , url]) => url);

  return (
    <footer className="bg-[#103520] text-white">
      <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.8fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo className="h-16 w-16" markClassName="bg-white text-forest-green" />
            <span className="max-w-[190px] font-display text-lg font-bold leading-tight">Sangaurii Tours and Travels</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">Thoughtfully planned holidays, warm personal service and memorable travel experiences for families, couples and groups.</p>
          {socialLinks.length > 0 && <div className="mt-6 flex gap-3">{socialLinks.map(([label, Icon, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={`${label} profile`} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-golden-orange"><Icon size={17} /></a>)}</div>}
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
          <ul className="space-y-4 text-sm leading-6 text-white/70">
            <li className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-warm-yellow" /> Maharashtra, India</li>
            <li><a href={`tel:${phone}`} className="flex gap-3 hover:text-white"><Phone size={18} className="shrink-0 text-warm-yellow" /> {phone}</a></li>
            <li><a href={`mailto:${email}`} className="flex gap-3 hover:text-white"><Mail size={18} className="shrink-0 text-warm-yellow" /> {email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Sangaurii Tours and Travels. All rights reserved.</p>
          <div className="flex gap-5"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms & Conditions</Link></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
