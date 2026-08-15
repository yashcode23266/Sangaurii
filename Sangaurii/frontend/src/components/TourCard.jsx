import React from "react";
import { MapPin } from "lucide-react";
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/90 transition-all duration-300 hover:border-slate-300">
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5 bg-white justify-between space-y-4">
        <div>
          {/* Location & Duration */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <MapPin size={13} className="text-[#1C4E8A]" />
              {tour.location}
            </span>
            {tour.duration && (
              <span className="text-slate-400 text-[0.725rem]">
                {tour.duration}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#111827] leading-snug">
            <Link to={`/tours/${tour.slug || tour.id}`} className="hover:text-[#1C4E8A] transition-colors">
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

          <button
            type="button"
            onClick={handleEnquiry}
            className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs px-4 py-2 rounded-full transition-all duration-200 shadow-sm shrink-0"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
