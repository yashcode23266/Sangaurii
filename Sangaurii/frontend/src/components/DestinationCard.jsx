import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function DestinationCard({ destination, large = false }) {
  return (
    <Link
      to={`/tours?destination=${encodeURIComponent(destination.name)}`}
      className={`card-luxury group relative overflow-hidden rounded-2xl block border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 ${
        large ? "min-h-[380px]" : "min-h-[280px]"
      }`}
    >
      {/* High-res Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/10" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white z-10">
        <div>
          <span className="inline-flex items-center gap-1 text-[0.65rem] font-extrabold uppercase tracking-widest text-[#F59E0B] block mb-1">
            <MapPin size={11} className="text-[#F59E0B]" />
            <span>DESTINATION</span>
          </span>
          <h3 className="font-serif text-2xl font-bold text-white drop-shadow">
            {destination.name}
          </h3>
          {destination.count && (
            <p className="mt-1 text-xs text-slate-200 font-medium">
              {destination.count}
            </p>
          )}
        </div>

        <span className="w-10 h-10 rounded-full bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all group-hover:bg-[#F59E0B] group-hover:text-slate-950 group-hover:border-[#F59E0B] group-hover:scale-110 shadow-lg">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}

export default DestinationCard;
