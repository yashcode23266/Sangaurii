import React from "react";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function PageHero({ eyebrow, title, description, bgImage }) {
  return (
    <section className="relative bg-[#0F172A] text-white py-16 sm:py-20 overflow-hidden">
      {/* Background Overlay */}
      {bgImage ? (
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#1C4E8A]/90 to-[#184829]/90 z-0 opacity-90" />
      )}

      {/* Content */}
      <div className="site-container relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Link to="/" aria-label="Home" className="hover:text-[#F59E0B] transition-colors flex items-center gap-1">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#F59E0B]">{title}</span>
        </div>

        {/* Eyebrow Pill */}
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-extrabold uppercase tracking-widest bg-white/10 text-[#F59E0B] border border-white/15 mb-3.5 shadow-sm">
            <Sparkles size={12} className="text-[#F59E0B]" />
            <span>{eyebrow}</span>
          </span>
        )}

        {/* Title & Description */}
        <h1 className="max-w-3xl font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200 font-normal">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHero;
