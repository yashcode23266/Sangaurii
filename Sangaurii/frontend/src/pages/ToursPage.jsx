import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Search } from "lucide-react";
import TourCard from "../components/TourCard";
import { getTours } from "../services/tourService";
import { openEnquiryModal } from "../utils/enquiry";

const pageConfigs = {
  domestic: {
    eyebrow: "EXPLORE INDIA",
    title: "Sacred Yatras & Scenic Holidays",
    description: "Handpicked domestic holiday packages, spiritual Jyotirlinga yatras, and serene coastal getaways across incredible India.",
    heroBg: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85",
    filterPills: ["All", "Spiritual", "Weekend", "Family", "Heritage", "Honeymoon"],
    storyTitle: "Why Travel India With Sangaurii?",
    storySubtitle: "Every pilgrimage and vacation is planned with personalized care, verified accommodations, and polite experienced chauffeurs who know every route.",
    ctaHeadline: "Planning a trip within India?",
    ctaButton: "Plan Your India Trip",
  },
  international: {
    eyebrow: "DISCOVER THE WORLD",
    title: "Curated International Holidays",
    description: "Experience unforgettable destinations beyond borders with comprehensive planning, comfortable stays, and complete travel support.",
    heroBg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85",
    filterPills: ["All", "Dubai", "Bali", "Singapore", "Europe"],
    trustNote: "Visa assistance & documentation guidance available on select international holiday destinations.",
    storyTitle: "Hassle-Free Global Travel Assistance",
    storySubtitle: "From hotel bookings to local sightseeing transfers and visa paperwork guidance, our team ensures your international holiday is smooth and stress-free.",
    ctaHeadline: "Ready to explore international horizons?",
    ctaButton: "Enquire For International Tours",
  },
  all: {
    eyebrow: "ALL PACKAGES",
    title: "Browse All Tour Destinations",
    description: "Explore our complete collection of spiritual yatras, domestic escapes, and international holiday packages.",
    heroBg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85",
    filterPills: ["All", "Domestic", "International", "Spiritual"],
    storyTitle: "Crafted With 10+ Years of Travel Excellence",
    storySubtitle: "Whether you seek divine temple darshans or relaxing family vacations, Sangaurii delivers safe and memorable journeys every time.",
    ctaHeadline: "Ready to plan your dream vacation?",
    ctaButton: "Plan Your Custom Journey",
  },
};

function ToursPage({ mode = "all" }) {
  const [searchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState("popularity");

  const activeMode = searchParams.get("mode") || mode || "all";
  const config = pageConfigs[activeMode] || pageConfigs.all;

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTours().then((data) => {
      if (active) {
        setTours(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Filter and sort items
  const filteredTours = useMemo(() => {
    return tours.filter((item) => {
      // Mode filter
      if (activeMode === "domestic" && item.type !== "Domestic" && item.type !== "Special") return false;
      if (activeMode === "international" && item.type !== "International") return false;

      // Category / Pill filter
      if (activeCategory !== "All") {
        if (activeMode === "international") {
          const match = (item.destination || "").toLowerCase().includes(activeCategory.toLowerCase());
          if (!match) return false;
        } else {
          if (item.category !== activeCategory && item.type !== activeCategory) return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = (item.title || "").toLowerCase().includes(query);
        const locMatch = (item.location || "").toLowerCase().includes(query);
        const destMatch = (item.destination || "").toLowerCase().includes(query);
        if (!titleMatch && !locMatch && !destMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.popularity - a.popularity;
    });
  }, [tours, activeMode, activeCategory, searchQuery, sortBy]);

  const handleEnquire = (title) => {
    openEnquiryModal(title || config.title);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. COMPACT PAGE HERO (~40vh) */}
      <section className="relative min-h-[340px] sm:min-h-[380px] text-white flex items-center justify-center bg-[#111827] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={config.heroBg}
            alt={config.title}
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-black/70" />
        </div>

        <div className="site-container relative z-10 text-center py-16 px-4 max-w-3xl mx-auto">
          <span className="text-[#F4A228] text-xs font-bold uppercase tracking-[0.2em] mb-2.5 block">
            {config.eyebrow}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
            {config.title}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto leading-relaxed">
            {config.description}
          </p>

          {/* Optional quiet trust note for International mode */}
          {config.trustNote && (
            <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[0.75rem] font-medium text-slate-200">
              ✈️ {config.trustNote}
            </div>
          )}
        </div>
      </section>

      {/* 2. STICKY HORIZONTAL FILTER BAR */}
      <div className="sticky top-[5.25rem] sm:top-[5.75rem] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3.5">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
              Filter:
            </span>
            {config.filterPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setActiveCategory(pill)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === pill
                    ? "bg-[#1C4E8A] text-white shadow-sm font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                placeholder="Search destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-[#111827] placeholder:text-slate-400 focus:outline-none focus:border-[#1C4E8A]"
              />
              <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. PACKAGE GRID (3 COLUMNS DESKTOP, 1 COLUMN MOBILE) */}
      <section className="py-16 sm:py-24">
        <div className="site-container">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Showing <strong className="text-[#111827]">{filteredTours.length}</strong> Curated Packages
            </span>

            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="text-xs font-bold text-[#1C4E8A] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 text-sm">
              Loading available tour packages...
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
              <Compass size={36} className="text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#111827]">No packages match your search</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Try selecting a different filter or contact our team for a personalized itinerary.
              </p>
              <button
                type="button"
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="bg-[#1C4E8A] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-sm"
              >
                View All Tours
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredTours.map((item, idx) => (
                <motion.div
                  key={item.slug || item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                >
                  <TourCard tour={item} onEnquire={(title) => handleEnquire(title)} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. EDITORIAL STORYTELLING STRIP (SINGLE CLEAN SPOTLIGHT) */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-md border border-slate-200">
              <img
                src={activeMode === "international" 
                  ? "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85"
                  : "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85"
                }
                alt="Storytelling spotlight"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#184829] uppercase tracking-[0.2em] block">
                THE SANGAURII PROMISE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] leading-tight">
                {config.storyTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {config.storySubtitle}
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => handleEnquire("Custom Tailored Package")}
                  className="bg-[#1C4E8A] hover:bg-[#153a67] text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-full transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Request Custom Itinerary</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FLOATING CTA BANNER CARD (REUSED COMPONENT MATCHING HOMEPAGE) */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="site-container">
          <div className="bg-[#1C4E8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <span className="text-[#F4A228] text-xs font-extrabold uppercase tracking-[0.2em] mb-2 block">
                PERSONALIZED ITINERARY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                {config.ctaHeadline}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
                Connect with Gauri Pathak and Sangeeta Kode for custom dates, private family vehicles, and tailored budgets.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => handleEnquire(config.ctaHeadline)}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all shrink-0 inline-flex items-center gap-2 shadow-lg relative z-10"
            >
              <span>{config.ctaButton}</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ToursPage;
