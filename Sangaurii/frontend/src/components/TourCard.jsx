import { ArrowRight, Clock3, MapPin, Sparkles, Star } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { openEnquiryModal } from "../utils/enquiry";
import { gsap, motionSafe } from "../utils/gsapUtils";
import Button from "./UI/Button";
import Card from "./UI/Card";

function TourCard({ tour }) {
  const cardRef = useRef();
  const price = typeof tour.price === "number" ? `₹${tour.price.toLocaleString("en-IN")}` : tour.price;

  useGSAP(() => {
    if (!motionSafe()) return;
    const card = cardRef.current;
    const onMove = (event) => { const r = card.getBoundingClientRect(); gsap.to(card, { rotateY: ((event.clientX - r.left) / r.width - .5) * 4, rotateX: -((event.clientY - r.top) / r.height - .5) * 4, transformPerspective: 900, duration: .35, ease: "power2.out" }); };
    const reset = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .5, ease: "power3.out" });
    card.addEventListener("pointermove", onMove); card.addEventListener("pointerleave", reset); return () => { card.removeEventListener("pointermove", onMove); card.removeEventListener("pointerleave", reset); };
  }, { scope: cardRef });
  return (
    <Card ref={cardRef} data-reveal-item className="group flex h-full flex-col overflow-hidden will-change-transform">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={tour.image} alt={tour.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        {(tour.featured || tour.tag) && <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-forest-green shadow"><Sparkles size={12} />{tour.tag || "Featured"}</span>}
        {tour.category && <span className="absolute bottom-4 right-4 rounded-full bg-slate-900/90 px-3 py-1.5 text-xs font-semibold text-white">{tour.category}</span>}
        {tour.duration && <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700 shadow"><Clock3 size={12} /> {tour.duration}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-dark-text/55"><MapPin size={15} className="text-golden-orange" /> {tour.location}</div>
        <h3 className="line-clamp-2 font-display text-xl font-bold text-slate-900">{tour.title}</h3>
        <div className="mt-3 flex items-center gap-1 text-golden-orange"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><span className="ml-1 text-xs font-semibold text-dark-text/50">Guest favourite</span></div>
        <div className="mt-auto flex items-center justify-between border-b border-t border-black/5 py-4">
          <span className="inline-flex items-center gap-2 text-sm text-dark-text/60"><Clock3 size={15} /> {tour.duration}</span>
          <div className="text-right"><span className="block text-xs text-dark-text/45">Starting from</span><strong className="text-lg text-forest-green">{price}</strong></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button to={`/tours/${tour.slug}`} variant="secondary" className="min-h-11 px-3">View Details <ArrowRight size={15} /></Button>
          <Button type="button" onClick={openEnquiryModal} className="min-h-11 px-3">Enquire Now</Button>
        </div>
      </div>
    </Card>
  );
}

export default TourCard;
