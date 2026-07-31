import { ArrowRight, Clock3, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { openEnquiryModal } from "../utils/enquiry";

function TourCard({ tour }) {
  const price = typeof tour.price === "number" ? `₹${tour.price.toLocaleString("en-IN")}` : tour.price;

  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img src={tour.image} alt={tour.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {(tour.featured || tour.tag) && <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-forest-green shadow"><Sparkles size={12} />{tour.tag || "Featured"}</span>}
        {tour.category && <span className="absolute bottom-4 right-4 rounded-full bg-deep-navy/90 px-3 py-1.5 text-xs font-semibold text-white">{tour.category}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-dark-text/55"><MapPin size={15} className="text-golden-orange" /> {tour.location}</div>
        <h3 className="font-display text-xl font-bold text-deep-navy">{tour.title}</h3>
        <div className="mt-auto flex items-center justify-between border-b border-t border-black/5 py-4">
          <span className="inline-flex items-center gap-2 text-sm text-dark-text/60"><Clock3 size={15} /> {tour.duration}</span>
          <div className="text-right"><span className="block text-xs text-dark-text/45">Starting from</span><strong className="text-lg text-forest-green">{price}</strong></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link to={`/tours/${tour.slug}`} className="button-secondary min-h-11 px-3">View Details <ArrowRight size={15} /></Link>
          <button type="button" onClick={openEnquiryModal} className="button-primary min-h-11 px-3">Enquire Now</button>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
