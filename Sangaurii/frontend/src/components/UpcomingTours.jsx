import { CalendarDays, Clock3, MapPinned, Phone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { openEnquiryModal } from "../utils/enquiry";
import { upcomingTours } from "../data/upcomingTours";
import Button from "./UI/Button";
import Card from "./UI/Card";

function UpcomingTours() {
  const phone = import.meta.env.VITE_CONTACT_PHONE || "7498045445";
  return <AnimatedSection className="section-pad bg-[#102d24] text-white" stagger>
    <div className="site-container">
      <div className="mb-10 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-golden-orange">Departing soon</p><h2 className="section-heading-accent mt-3 font-display text-4xl font-bold sm:text-5xl">Upcoming tours worth packing for</h2><p className="mt-6 leading-7 text-white/72">Small groups, smooth planning, and a few remaining seats on our most-loved departures.</p></div>
      <div className="grid gap-5 overflow-x-auto pb-2 sm:grid-cols-2 xl:grid-cols-4">{upcomingTours.map((tour) => <Card key={tour.title} data-reveal-item className="min-w-[255px] overflow-hidden bg-white text-dark-text">
        <div className="relative aspect-[4/3]"><img src={tour.image} alt={tour.title} loading="lazy" className="h-full w-full object-cover" /><span className="absolute left-3 top-3 rounded-full bg-golden-orange px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-deep-navy">{tour.badge}</span></div>
        <div className="p-5"><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-forest-green"><MapPinned size={14} /> Guided departure</p><h3 className="mt-2 font-display text-2xl font-bold text-deep-navy">{tour.title}</h3><div className="mt-4 space-y-2 border-y border-forest-green/10 py-4 text-sm text-dark-text/70"><span className="flex items-center gap-2"><CalendarDays size={15} className="text-golden-orange" /> {tour.departure}</span><span className="flex items-center gap-2"><Clock3 size={15} className="text-golden-orange" /> {tour.duration}</span></div><div className="mt-4 flex items-center justify-between"><span><small className="block text-xs text-dark-text/55">Starting from</small><strong className="text-xl text-forest-green">{tour.price}</strong></span><Button type="button" onClick={openEnquiryModal} variant="accent" className="min-h-10 px-4">Book Now</Button></div><a href={`tel:${phone}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-green"><Phone size={15} /> Call 74980 45445</a></div>
      </Card>)}</div>
    </div>
  </AnimatedSection>;
}

export default UpcomingTours;
