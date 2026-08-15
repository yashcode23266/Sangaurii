import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
import { openEnquiryModal } from "../utils/enquiry";

function FeaturedSpotlight() {
  const highlights = [
    "Private luxury Shikara ride on Dal Lake at sunset",
    "Handpicked 5-star heritage houseboats & mountain resorts",
    "Chauffeur-driven private luxury SUV for all sightseeing",
    "Personalized itinerary with 24/7 dedicated trip manager",
  ];

  const handleEnquiry = () => {
    openEnquiryModal("Royal Kashmir Luxury Circuit");
  };

  return (
    <section className="section-pad bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C4E8A]/10 text-[#1C4E8A] text-xs font-extrabold uppercase tracking-[0.2em] mb-3">
            <Sparkles size={13} className="text-[#F4A228]" />
            EDITORIAL SPOTLIGHT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight">
            The Royal Kashmir Experience
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base font-normal">
            A curated luxury journey designed for travelers who seek authentic serenity, breathtaking valley views, and world-class Indian hospitality.
          </p>
        </div>

        {/* Magazine Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          {/* Left: Cinematic Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative h-[360px] sm:h-[460px] rounded-2xl overflow-hidden shadow-lg group"
          >
            <img
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85"
              alt="Royal Kashmir Paradise"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />

            {/* Rating & Badge Overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#1C4E8A] shadow-md flex items-center gap-1.5">
              <Star size={14} className="fill-[#F4A228] text-[#F4A228]" />
              <span>5.0 / 5.0 Exceptional Rating</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[0.68rem] font-bold uppercase tracking-widest text-[#F4A228] block">
                FLAGSHIP DESTINATION
              </span>
              <h3 className="font-serif text-2xl font-bold mt-0.5">
                Srinagar • Gulmarg • Pahalgam
              </h3>
            </div>
          </motion.div>

          {/* Right: Editorial Copy & Offer Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="text-xs font-extrabold text-[#184829] uppercase tracking-widest block mb-1">
                6 DAYS / 5 NIGHTS LUXURY ITINERARY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] leading-snug">
                Where Snow-Capped Peaks Meet Timeless Elegance
              </h3>
              <p className="mt-3 text-slate-600 text-sm leading-relaxed font-normal">
                Wake up to the soft mist over Dal Lake, sip traditional Kashmiri Kahwa in private pine-wood chalets, and ride the Gulmarg Gondola over pristine white slopes.
              </p>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-[#184829] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Pricing & CTA */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
              <div>
                <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                  All-Inclusive Package From
                </span>
                <div className="flex items-baseline gap-2">
                  <strong className="text-2xl font-black text-[#184829]">
                    ₹38,500
                  </strong>
                  <span className="text-xs text-slate-400 font-normal">/ person</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEnquiry}
                className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
              >
                <span>Reserve Custom Tour</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSpotlight;
