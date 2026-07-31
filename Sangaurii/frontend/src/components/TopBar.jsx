import { Clock3, Mail, Phone } from "lucide-react";

function TopBar() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
  const email = import.meta.env.VITE_CONTACT_EMAIL || "hello@sangauriitours.com";

  return (
    <div className="bg-deep-navy text-white">
      <div className="site-container flex min-h-10 items-center justify-between gap-4 py-2 text-xs sm:text-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <a href={`tel:${phone}`} className="inline-flex items-center gap-2 transition hover:text-warm-yellow"><Phone size={14} /> <span>{phone}</span></a>
          <a href={`mailto:${email}`} className="hidden items-center gap-2 transition hover:text-warm-yellow sm:inline-flex"><Mail size={14} /> {email}</a>
        </div>
        <span className="hidden items-center gap-2 md:inline-flex"><Clock3 size={14} /> Mon–Sat, 9:30 AM–7:00 PM</span>
        <span className="sm:hidden">We’re happy to help</span>
      </div>
    </div>
  );
}

export default TopBar;
