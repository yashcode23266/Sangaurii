import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import TourCard from "../components/TourCard";
import SectionHeading from "../components/SectionHeading";
import TrustStrip from "../components/TrustStrip";
import {
  featuredTours as fallbackFeaturedTours,
} from "../data/homeData";
import { getFeaturedTours } from "../services/tourService";
import { getPublicContent } from "../services/contentService";
import { openEnquiryModal } from "../utils/enquiry";
import TestimonialMarquee from "@/components/ui/marquee-card";

// 3 Minimal Category Cards
const categoryTiles = [
  {
    title: "India Getaways",
    subtitle: "Explore Kashmir, Kerala, Rajasthan & More",
    path: "/tours?mode=domestic",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "International Escapes",
    subtitle: "Discover Dubai, Bali, Thailand & Europe",
    path: "/tours?mode=international",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Vehicle Rental",
    subtitle: "Luxury Cars, SUVs & Tempo Travellers",
    path: "/vehicle-rental",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=85",
  },
];

// Guest Gallery Photos
const guestPhotos = [
  {
    image: "https://images.unsplash.com/photo-1539635273304-0e56845d4257?auto=format&fit=crop&w=800&q=80",
    caption: "Family Tour in Kashmir",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    caption: "Honeymoon in Maldives",
  },
  {
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80",
    caption: "Backwaters Cruise in Kerala",
  },
  {
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    caption: "Monsoon Trip to Goa",
  },
];

function HomePage() {
  const [featuredTours, setFeaturedTours] = useState(fallbackFeaturedTours);
  const [searchDestination, setSearchDestination] = useState("");

  // HERO PARALLAX SETUP (Background moves 35% slower on scroll)
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHeroBg = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const opacityHero = useTransform(heroScroll, [0, 0.75], [1, 0.3]);

  useEffect(() => {
    let active = true;
    Promise.all([getFeaturedTours(), getPublicContent()]).then(([tourItems]) => {
      if (!active) return;
      if (tourItems?.length) setFeaturedTours(tourItems);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleEnquireNow = (destinationName = "Plan Your Dream Trip") => {
    openEnquiryModal(destinationName);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. HERO SECTION WITH SMOOTH PARALLAX BACKGROUND */}
      <section
        ref={heroRef}
        className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[82vh] text-white flex flex-col justify-between bg-[#111827]"
      >
        {/* Parallax Background Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{ y: yHeroBg }}
            className="absolute inset-0 -top-[12%] -bottom-[12%] w-full h-[125%]"
          >
            <img
              src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=88"
              alt="Sangaurii Travel Banner"
              className="w-full h-full object-cover object-center opacity-80"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#111827]/40 to-[#111827]" />
          </motion.div>
        </div>

        {/* Hero Content with Scroll Fade & Entrance Motion */}
        <div className="site-container relative z-10 pt-20 sm:pt-32 pb-16 flex-1 flex items-center justify-center">
          <motion.div
            style={{ opacity: opacityHero }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl text-center mx-auto px-4"
          >
            <span className="text-[#F4A228] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              SANGAURII TOURS &amp; TRAVELS
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-md">
              Explore India, <span className="italic font-normal text-[#F4A228]">&amp; Beyond</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 font-sans max-w-lg mx-auto leading-relaxed">
              Handpicked tours, trusted vehicles, and journeys you’ll never forget.
            </p>
          </motion.div>
        </div>

        {/* Minimal Search Capsule Bar */}
        <div className="site-container relative z-20 max-w-[680px] -mb-6 px-4">
          <div className="bg-white rounded-full p-2 shadow-xl border border-slate-200/90 flex items-center gap-2">
            <div className="pl-3.5 text-[#1C4E8A]">
              <MapPin size={18} />
            </div>
            <input
              type="text"
              placeholder="Where do you want to travel?"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              className="w-full text-xs sm:text-sm font-semibold text-[#111827] outline-none bg-transparent placeholder:text-slate-400 placeholder:font-normal py-2"
            />
            <Link
              to={`/tours?search=${encodeURIComponent(searchDestination)}`}
              className="bg-[#F4A228] text-[#111827] px-5 py-3 rounded-full shrink-0 flex items-center justify-center font-extrabold text-xs shadow-sm hover:bg-[#E5931C] transition-all gap-1.5"
              aria-label="Search"
            >
              <Search size={14} />
              <span>Search</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP (CLEAN TYPOGRAPHY, NO ICONS, NO BACKGROUND FILL) */}
      <TrustStrip />

      {/* 3. CATEGORIES SHOWCASE (3 CLEAN IMAGE CARDS, HARELINE BORDER, TEXT BELOW) */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="site-container">
          <SectionHeading
            eyebrow="DESTINATION CATEGORIES"
            title="Find Your Ideal Journey"
            description="Whether you crave mountain valleys, tropical beaches, or private road transport."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-14">
            {categoryTiles.map((tile, idx) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={tile.path}
                  className="group block bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm transition-all duration-300 hover:border-slate-300 hover:-translate-y-1"
                >
                  <div className="h-56 overflow-hidden bg-slate-100">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-[#111827] group-hover:text-[#1C4E8A] transition-colors inline-block">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {tile.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRENDING PACKAGES (MINIMAL CLEAN GRID WITH SCROLL FADE) */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100">
        <div className="site-container">
          <SectionHeading
            eyebrow="FEATURED PACKAGES"
            title="Trending Tour Destinations"
            description="Thoughtfully planned itineraries with guaranteed comfortable travel and transparent pricing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mt-14">
            {featuredTours.map((tour, idx) => (
              <motion.div
                key={tour.slug || tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <TourCard
                  tour={tour}
                  onEnquire={(title) => handleEnquireNow(title)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GUEST PHOTO GALLERY & MARQUEE TESTIMONIALS */}
      <section className="pt-16 sm:pt-28 pb-3 sm:pb-6 bg-[#F8FAFC]">
        <div className="site-container">
          <SectionHeading
            eyebrow="HAPPY TRAVELERS"
            title="Real Memories Shared By Our Guests"
            description="Moments captured on tour across India and international destinations."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 mb-8 sm:mb-10">
            {guestPhotos.map((photo, idx) => (
              <motion.div
                key={photo.caption}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative h-60 overflow-hidden rounded-2xl bg-slate-900 shadow-sm"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-bold">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Liquid Glass Marquee Testimonial Cards - Perfectly 50/50 Centered */}
          <div className="mt-6 mb-4 sm:mt-10 sm:mb-8">
            <TestimonialMarquee />
          </div>
        </div>
      </section>

      {/* 6. FLOATING CTA BANNER CARD (BALANCED SPACING BEFORE FOOTER) */}
      <section className="pt-4 sm:pt-8 pb-16 sm:pb-24 bg-[#F8FAFC]">
        <div className="site-container">
          <div className="bg-[#1C4E8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            {/* Soft Ambient Glow Overlay */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <span className="text-[#F4A228] text-xs font-extrabold uppercase tracking-[0.2em] mb-2 block">
                SANGAURII CONCIERGE CARE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Ready to Plan Your Next Journey?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
                Contact our travel experts for customized holiday itineraries, spiritual yatras, and private luxury vehicle rentals.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => handleEnquireNow("Custom Holiday Plan")}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all shrink-0 inline-flex items-center gap-2 shadow-lg relative z-10"
            >
              <span>Plan Your Trip Now</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
