import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { openEnquiryModal } from "../utils/enquiry";

function TourCard({ tour, onEnquire }) {
  const priceDisplay =
    typeof tour.price === "number"
      ? `₹${tour.price.toLocaleString("en-IN")}`
      : tour.price;

  const handleEnquiry = (e) => {
    e.preventDefault();
    if (onEnquire) {
      onEnquire(tour.title);
    } else {
      openEnquiryModal(tour.title);
    }
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 transition-all duration-300 shine-overlay"
    >
      {/* Image Header with smooth zoom */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Subtle pill tag if present */}
        {tour.tag && (
          <div className="absolute top-3 left-3 bg-[#1C4E8A]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[0.68rem] font-bold shadow-xs flex items-center gap-1">
            <Sparkles size={11} className="text-[#F4A228]" />
            <span>{tour.tag}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 bg-white justify-between space-y-4">
        <div>
          {/* Location & Duration */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span className="flex items-center gap-1 text-slate-600 font-semibold group-hover:text-[#1C4E8A] transition-colors">
              <MapPin size={13} className="text-[#1C4E8A]" />
              {tour.location}
            </span>
            {tour.duration && (
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[0.7rem] font-medium">
                {tour.duration}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#111827] leading-snug group-hover:text-[#1C4E8A] transition-colors">
            <Link to={`/tours/${tour.slug || tour.id}`}>
              {tour.title}
            </Link>
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-slate-400">
              Starting From
            </span>
            <strong className="text-base font-extrabold text-[#111827]">
              {priceDisplay}
            </strong>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={handleEnquiry}
            className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs px-4 py-2 rounded-full transition-all duration-200 shadow-sm shrink-0 flex items-center gap-1 group/btn"
          >
            <span>Enquire</span>
            <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default TourCard;

