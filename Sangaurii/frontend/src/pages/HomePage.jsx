import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Search,
  Sparkles,
  ShieldCheck,
  Star,
  Compass,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
  Car,
  CheckCircle2,
  X,
  Maximize2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TourCard from "../components/TourCard";
import SectionHeading from "../components/SectionHeading";
import TrustStrip from "../components/TrustStrip";
import { featuredTours as fallbackFeaturedTours } from "../data/homeData";
import { getFeaturedTours } from "../services/tourService";
import { getPublicContent } from "../services/contentService";
import { openEnquiryModal } from "../utils/enquiry";
import Marquee from "@/components/ui/marquee";
import TestimonialMarquee from "@/components/ui/marquee-card";

// 3 Minimal Category Cards
const categoryTiles = [
  {
    title: "India Getaways",
    subtitle: "Explore Kashmir, Kerala, Rajasthan & More",
    path: "/tours?mode=domestic",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=85",
    tag: "Most Popular",
  },
  {
    title: "International Escapes",
    subtitle: "Discover Dubai, Bali, Thailand & Europe",
    path: "/tours?mode=international",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85",
    tag: "Trending",
  },
  {
    title: "Vehicle Rental",
    subtitle: "Luxury Cars, SUVs & Tempo Travellers",
    path: "/vehicle-rental",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=85",
    tag: "24/7 Available",
  },
];

// Guest Gallery Photos with interactive details
const guestPhotos = [
  {
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85",
    caption: "Family Tour in Kashmir",
    location: "Pahalgam Valley, Kashmir",
    tag: "Kashmir",
    tourQuery: "Kashmir",
    story: "Witnessed breathtaking snow-capped valleys, stayed in serene Dal Lake houseboats, and enjoyed pony rides through the Pine forest of Betaab Valley.",
  },
  {
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
    caption: "Honeymoon in Maldives",
    location: "South Ari Atoll, Maldives",
    tag: "Maldives",
    tourQuery: "Maldives",
    story: "Crystal clear turquoise lagoons, private overwater villa sunset dinners, and unmatched hospitality arranged with complete care by Sangaurii.",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    caption: "Backwaters Cruise in Kerala",
    location: "Alleppey, Kerala",
    tag: "Kerala",
    tourQuery: "Kerala",
    story: "Floating through lush green coconut groves and peaceful canals aboard a private luxury houseboat with authentic local dining.",
  },
  {
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    caption: "Monsoon Trip to Goa",
    location: "South Goa Beaches & Forts",
    tag: "Goa",
    tourQuery: "Goa",
    story: "Golden sandy shores, serene coastal drives, heritage Portuguese architecture, and refreshing ocean breeze across pristine private beaches.",
  },
  {
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
    caption: "Heritage Journey in Rajasthan",
    location: "Udaipur & Jaipur, Rajasthan",
    tag: "Rajasthan",
    tourQuery: "Rajasthan",
    story: "Magnificent palaces, royal lake boat rides at Lake Pichola, and grand forts steeped in legendary history with chauffeur-driven comfort.",
  },
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    caption: "Desert Safari & Skyline",
    location: "Dubai Marina & Red Dunes",
    tag: "Dubai",
    tourQuery: "Dubai",
    story: "Thrilling dune bashing, luxury dinner cruise along Dubai Marina, and iconic skyline views of Burj Khalifa and futuristic marvels.",
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    caption: "Island Culture & Villas",
    location: "Ubud & Seminyak, Bali",
    tag: "Bali",
    tourQuery: "Bali",
    story: "Private pool villas, cascading jungle rice terraces, mystical water temples, and memorable sunset cliff views at Uluwatu.",
  },
  {
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    caption: "Sacred Ashtavinayak Yatra",
    location: "Maharashtra Pilgrimage",
    tag: "Spiritual",
    tourQuery: "Ashtavinayak",
    story: "A blissful and deeply spiritual 8-Ganpati darshan journey arranged with utmost comfort for families and senior citizen pilgrims.",
  },
];

const popularSearches = ["Kashmir", "Kerala", "Rajasthan", "Dubai", "Bali", "Innova Rental"];

const filterTabs = [
  { id: "all", label: "All Packages" },
  { id: "domestic", label: "India Getaways" },
  { id: "international", label: "International Escapes" },
];

function HomePage() {
  const navigate = useNavigate();
  const [featuredTours, setFeaturedTours] = useState(fallbackFeaturedTours);
  const [searchDestination, setSearchDestination] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMemory, setSelectedMemory] = useState(null);

  // Quick Trip Estimator state
  const [plannerDestination, setPlannerDestination] = useState("Kashmir");
  const [plannerDuration, setPlannerDuration] = useState("5-7 Days");
  const [plannerTravelers, setPlannerTravelers] = useState("Family (3-5)");

  // HERO PARALLAX SETUP
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yHeroBg = useTransform(heroScroll, [0, 1], ["0%", "35%"]);
  const opacityHero = useTransform(heroScroll, [0, 0.8], [1, 0.25]);

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

  // Keyboard navigation for Memory modal
  useEffect(() => {
    if (!selectedMemory) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedMemory(null);
      if (e.key === "ArrowRight") {
        const idx = guestPhotos.findIndex((p) => p.caption === selectedMemory.caption);
        if (idx !== -1) setSelectedMemory(guestPhotos[(idx + 1) % guestPhotos.length]);
      }
      if (e.key === "ArrowLeft") {
        const idx = guestPhotos.findIndex((p) => p.caption === selectedMemory.caption);
        if (idx !== -1) setSelectedMemory(guestPhotos[(idx - 1 + guestPhotos.length) % guestPhotos.length]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMemory]);

  const handleEnquireNow = (destinationName = "Plan Your Dream Trip") => {
    openEnquiryModal(destinationName);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchDestination.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchDestination.trim())}`);
    }
  };

  const handlePlannerSubmit = (e) => {
    e.preventDefault();
    openEnquiryModal(`${plannerDestination} (${plannerDuration}, ${plannerTravelers})`);
  };

  const filteredTours = featuredTours.filter((tour) => {
    if (activeTab === "all") return true;
    if (activeTab === "domestic") {
      return tour.category?.toLowerCase() === "domestic" || !tour.category || tour.category === "India";
    }
    if (activeTab === "international") {
      return tour.category?.toLowerCase() === "international" || tour.isInternational;
    }
    return true;
  });

  return (
    <div className="relative overflow-hidden bg-transparent">
      {/* Ambient background soft gradient orbs */}
      <div className="pointer-events-none absolute top-[8%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-br from-[#F4A228]/25 via-[#F4A228]/10 to-transparent rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute top-[35%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#1C4E8A]/20 via-[#4A90E2]/15 to-transparent rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute top-[62%] right-[-8%] w-[650px] h-[650px] bg-gradient-to-bl from-[#F4A228]/20 via-[#1C4E8A]/15 to-transparent rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute bottom-[2%] left-[-8%] w-[550px] h-[550px] bg-gradient-to-r from-[#184829]/20 via-[#F4A228]/15 to-transparent rounded-full blur-3xl z-0" />

      {/* 1. HERO SECTION WITH SMOOTH PARALLAX BACKGROUND */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[520px] sm:min-h-[600px] lg:min-h-[82vh] text-white flex flex-col justify-between bg-[#111827]"
      >
        {/* Parallax Background Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            style={{ y: yHeroBg }}
            className="absolute inset-0 -top-[12%] -bottom-[12%] w-full h-[125%]"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=88"
              className="w-full h-full object-cover object-center opacity-80"
            >
              <source src="/assets/hero-video.mp4" type="video/mp4" />
              <source src="https://res.cloudinary.com/demo/video/upload/q_auto,w_1920/elephants.mp4" type="video/mp4" />
              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=88"
                alt="Sangaurii Travel Banner"
                className="w-full h-full object-cover object-center"
              />
            </video>
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
              className="bg-[#F4A228] text-[#111827] px-5 py-3 rounded-full shrink-0 flex items-center justify-center font-extrabold text-xs shadow-sm hover:bg-[#E5931C] transition-all gap-1.5 cursor-pointer"
              aria-label="Search"
            >
              <Search size={14} />
              <span>Search</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <TrustStrip />

      {/* 3. CATEGORIES SHOWCASE WITH INTERACTIVE HOVER MOTION */}
      <section className="relative z-10 py-12 sm:py-16 bg-transparent">
        <div className="site-container">
          <SectionHeading
            eyebrow="DESTINATION CATEGORIES"
            title="Find Your Ideal Journey"
            description="Whether you crave mountain valleys, tropical beaches, or private luxury road transport."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 sm:mt-8">
            {categoryTiles.map((tile, idx) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <Link
                  to={tile.path}
                  className="group block bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 hover:-translate-y-2 shine-overlay"
                >
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                    <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-sm text-[#1C4E8A] text-[0.68rem] font-extrabold px-3 py-1 rounded-full shadow-xs">
                      {tile.tag}
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#111827] group-hover:text-[#1C4E8A] transition-colors">
                        {tile.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium">
                        {tile.subtitle}
                      </p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-slate-50 group-hover:bg-[#F4A228] group-hover:text-[#111827] text-slate-400 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE 1-CLICK TRIP ESTIMATOR BOX (SATISFACTION MULTIPLIER) */}
      <section className="relative z-10 py-10 sm:py-12 bg-transparent">
        <div className="site-container">
          <div className="bg-[#184829] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#F4A228]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-extrabold uppercase tracking-widest bg-white/10 text-[#F4A228] border border-white/15 mb-3">
                  <Sparkles size={12} />
                  <span>Interactive Trip Planner</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  Design Your Dream Vacation in Seconds
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm mt-2 leading-relaxed">
                  Tell us your preferred destination and group type. Our senior travel specialists will prepare a tailored itinerary within hours.
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#F4A228]" /> 100% Free Consultation</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-[#F4A228]" /> Customized Quotation</span>
                </div>
              </div>

              {/* Interactive quick selections form */}
              <form onSubmit={handlePlannerSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[0.68rem] font-bold uppercase tracking-wider text-[#F4A228] flex items-center gap-1">
                    <MapPin size={12} /> Destination
                  </label>
                  <select
                    value={plannerDestination}
                    onChange={(e) => setPlannerDestination(e.target.value)}
                    className="w-full bg-white text-[#111827] text-xs font-semibold rounded-xl p-2.5 outline-none border border-slate-200 cursor-pointer"
                  >
                    <option value="Kashmir Valley">Kashmir Valley</option>
                    <option value="Kerala Backwaters">Kerala Backwaters</option>
                    <option value="Royal Rajasthan">Royal Rajasthan</option>
                    <option value="Dubai & Abu Dhabi">Dubai &amp; Abu Dhabi</option>
                    <option value="Bali & Indonesia">Bali &amp; Indonesia</option>
                    <option value="Ashtavinayak Yatra">Ashtavinayak Yatra</option>
                    <option value="Vehicle Outstation Rental">Vehicle Outstation Rental</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.68rem] font-bold uppercase tracking-wider text-[#F4A228] flex items-center gap-1">
                    <Calendar size={12} /> Duration
                  </label>
                  <select
                    value={plannerDuration}
                    onChange={(e) => setPlannerDuration(e.target.value)}
                    className="w-full bg-white text-[#111827] text-xs font-semibold rounded-xl p-2.5 outline-none border border-slate-200 cursor-pointer"
                  >
                    <option value="3-4 Days (Short Break)">3–4 Days (Short Break)</option>
                    <option value="5-7 Days (Standard)">5–7 Days (Standard)</option>
                    <option value="8-12 Days (Grand Tour)">8–12 Days (Grand Tour)</option>
                    <option value="12+ Days (Extended)">12+ Days (Extended)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.68rem] font-bold uppercase tracking-wider text-[#F4A228] flex items-center gap-1">
                    <Users size={12} /> Travel Group
                  </label>
                  <select
                    value={plannerTravelers}
                    onChange={(e) => setPlannerTravelers(e.target.value)}
                    className="w-full bg-white text-[#111827] text-xs font-semibold rounded-xl p-2.5 outline-none border border-slate-200 cursor-pointer"
                  >
                    <option value="Couple / Honeymoon (2 Pax)">Couple / Honeymoon (2)</option>
                    <option value="Family with Kids (3-5 Pax)">Family with Kids (3–5)</option>
                    <option value="Senior Citizens Group">Senior Citizens Group</option>
                    <option value="Large Group / Corporate (6+ Pax)">Large Group (6+ Pax)</option>
                  </select>
                </div>

                <div className="sm:col-span-3 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    className="w-full bg-[#F4A228] hover:bg-[#E5931C] text-[#111827] font-extrabold text-xs sm:text-sm py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Instant Custom Itinerary</span>
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRENDING PACKAGES WITH INTERACTIVE CATEGORY TABS */}
      <section className="relative z-10 py-12 sm:py-16 bg-transparent">
        <div className="site-container">
          <SectionHeading
            eyebrow="FEATURED PACKAGES"
            title="Trending Tour Destinations"
            description="Thoughtfully planned itineraries with guaranteed comfortable travel and transparent pricing."
          />

          {/* Interactive animated filter tabs */}
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 flex-wrap">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    isActive ? "text-[#111827]" : "text-slate-600 hover:text-slate-900 bg-white/60 backdrop-blur-xs border border-slate-200/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTourTab"
                      className="absolute inset-0 bg-[#F4A228] border border-[#F4A228] rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-[#111827]" : ""}`}>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {filteredTours.map((tour, idx) => (
                <motion.div
                  key={tour.slug || tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <TourCard
                    tour={tour}
                    onEnquire={(title) => handleEnquireNow(title)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-8 sm:mt-10">
            <Link
              to="/tours"
              className="button-secondary inline-flex items-center gap-2 font-bold text-xs"
            >
              <span>Explore All Tour Packages</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GUEST PHOTO GALLERY & MARQUEE TESTIMONIALS */}
      <section className="relative z-10 py-10 sm:py-14 bg-transparent overflow-hidden">
        <div className="site-container">
          <SectionHeading
            eyebrow="HAPPY TRAVELERS"
            title="Real Memories Shared By Our Guests"
            description="Moments captured on tour across India and international destinations. Click any photo to explore details."
          />
        </div>

        {/* Real Memories Continuous Moving Marquee */}
        <div className="relative w-full overflow-hidden mt-4 mb-4 sm:mb-6 py-1">
          {/* Subtle gradient edges for luxury smooth fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-[#DCE8F6]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-[#DCE8F6]/80 to-transparent z-10" />

          <Marquee pauseOnHover className="[--duration:36s] [--gap:1.15rem]">
            {guestPhotos.map((photo, idx) => (
              <div
                key={photo.caption + idx}
                onClick={() => setSelectedMemory(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMemory(photo);
                  }
                }}
                className="group relative w-56 sm:w-64 md:w-70 h-72 sm:h-80 shrink-0 overflow-hidden rounded-2xl bg-slate-900 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer shine-overlay border border-slate-200/60 select-none"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
                
                {/* Click to View badge on hover */}
                <div className="absolute top-3.5 left-3.5 bg-black/55 backdrop-blur-md text-white text-[0.68rem] font-semibold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 border border-white/20">
                  <Maximize2 size={11} className="text-[#F4A228]" />
                  <span>Click to view</span>
                </div>

                {photo.tag && (
                  <div className="absolute top-3.5 right-3.5 bg-black/40 backdrop-blur-md text-white border border-white/20 text-[0.65rem] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {photo.tag}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-[#F4A228] block mb-1 drop-shadow-sm flex items-center gap-1">
                    <MapPin size={11} />
                    <span>{photo.location}</span>
                  </span>
                  <p className="text-sm font-bold leading-tight drop-shadow-md">{photo.caption}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="site-container">
          {/* Liquid Glass Marquee Testimonial Cards */}
          <div className="mt-2 mb-2 sm:mt-4 sm:mb-4">
            <TestimonialMarquee />
          </div>
        </div>
      </section>

      {/* 7. FLOATING CTA BANNER CARD */}
      <section className="relative z-10 py-8 sm:py-12 bg-transparent">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1C4E8A] rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
          >
            {/* Soft Ambient Glow Overlay */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <span className="text-[#F4A228] text-xs font-extrabold uppercase tracking-[0.2em] mb-2 block">
                SANGAURII CONCIERGE CARE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Ready to Plan Your Next Journey?
              </h2>
              <p className="text-slate-200 text-sm mt-2 font-medium">
                Contact our travel experts for customized holiday itineraries, spiritual yatras, and private luxury vehicle rentals.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => handleEnquireNow("Custom Holiday Plan")}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full transition-all shrink-0 inline-flex items-center gap-2 shadow-lg relative z-10 cursor-pointer"
            >
              <span>Plan Your Trip Now</span>
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 8. INTERACTIVE GUEST MEMORY LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                aria-label="Close Preview"
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
              >
                <X size={18} />
              </button>

              {/* Prev / Next Navigation Floating Buttons */}
              <button
                type="button"
                aria-label="Previous Memory"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = guestPhotos.findIndex((p) => p.caption === selectedMemory.caption);
                  if (idx !== -1) {
                    setSelectedMemory(guestPhotos[(idx - 1 + guestPhotos.length) % guestPhotos.length]);
                  }
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                aria-label="Next Memory"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = guestPhotos.findIndex((p) => p.caption === selectedMemory.caption);
                  if (idx !== -1) {
                    setSelectedMemory(guestPhotos[(idx + 1) % guestPhotos.length]);
                  }
                }}
                className="absolute right-3 md:right-[410px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>

              {/* Memory High-Res Photo Container */}
              <div className="relative md:w-7/12 min-h-[260px] sm:min-h-[340px] md:min-h-[480px] bg-slate-900 overflow-hidden">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                <div className="absolute bottom-3 left-4 md:hidden text-white">
                  <span className="text-[0.7rem] font-bold text-[#F4A228] uppercase tracking-wider">{selectedMemory.location}</span>
                  <h4 className="font-serif text-lg font-bold">{selectedMemory.caption}</h4>
                </div>
              </div>

              {/* Memory Details & Action Panel */}
              <div className="p-6 sm:p-8 md:w-5/12 flex flex-col justify-between bg-white overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#1C4E8A]/10 text-[#1C4E8A] text-[0.7rem] font-bold uppercase tracking-wider rounded-full">
                      {selectedMemory.tag} Memory
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Sparkles size={13} className="text-[#F4A228]" /> Verified Guest
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] leading-tight">
                    {selectedMemory.caption}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#1C4E8A] flex items-center gap-1 mt-1.5 mb-4">
                    <MapPin size={14} className="text-[#F4A228]" /> {selectedMemory.location}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                      &ldquo;{selectedMemory.story}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMemory(null);
                      handleEnquireNow(`${selectedMemory.caption} (${selectedMemory.location})`);
                    }}
                    className="w-full bg-[#F4A228] hover:bg-[#E5931C] text-[#111827] font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Plan This Trip With Us</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMemory(null);
                      navigate(`/tours?search=${encodeURIComponent(selectedMemory.tourQuery)}`);
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-[#1C4E8A] font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Search size={13} />
                    <span>View {selectedMemory.tag} Packages</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;

