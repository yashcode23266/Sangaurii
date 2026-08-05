import { Clock3, Mail, Phone } from "lucide-react";

function TopBar() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "+91 74980 45445";
  const secondaryPhone = import.meta.env.VITE_CONTACT_PHONE_ALT || "+91 96379 17265";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "hello@sangauriitours.com";

  return (
    <div className="bg-slate-900 text-slate-300">
      <div className="site-container flex min-h-9 items-center justify-between gap-4 py-2 text-[11px] sm:text-xs">
        <div className="flex items-center gap-4 sm:gap-6">
          <a href={`tel:${phone}`} className="inline-flex items-center gap-2 transition hover:text-golden-orange"><Phone size={14} /> <span>{phone}</span></a>
          <a href={`tel:${secondaryPhone}`} className="hidden items-center gap-2 transition hover:text-golden-orange md:inline-flex"><Phone size={14} /> <span>{secondaryPhone}</span></a>
          <a href={`mailto:${email}`} className="hidden items-center gap-2 transition hover:text-golden-orange sm:inline-flex"><Mail size={14} /> {email}</a>
        </div>
        <span className="hidden items-center gap-2 md:inline-flex"><Clock3 size={14} /> Mon–Sat, 9:30 AM–7:00 PM</span>
        <span className="sm:hidden">We’re happy to help</span>
      </div>
    </div>
  );
}

export default TopBar;
