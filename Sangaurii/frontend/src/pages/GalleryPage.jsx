import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, X, Maximize2, Sparkles } from "lucide-react";
import { openEnquiryModal } from "../utils/enquiry";

const galleryData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85",
    caption: "Ashtavinayak Sacred Darshan Group",
    location: "Morgaon & Pali, Maharashtra",
    category: "Pilgrimages",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85",
    caption: "Jyotirlinga Darshan Yatra Pilgrims",
    location: "Trimbakeshwar & Somnath",
    category: "Pilgrimages",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=85",
    caption: "Somnath Temple Oceanfront Evening Aarti",
    location: "Somnath, Gujarat",
    category: "Pilgrimages",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    caption: "Malvan Coastal & Sindhudurg Fort Tour",
    location: "Malvan, Maharashtra",
    category: "Coastal & Beaches",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
    caption: "Kolam Beach & Water Sports Family Day",
    location: "Tarkarli Coast",
    category: "Coastal & Beaches",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=85",
    caption: "Kashmir Snow Paradise Family Tour",
    location: "Gulmarg & Pahalgam",
    category: "Hills & Mountains",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85",
    caption: "Kerala Backwaters Houseboat Cruise",
    location: "Alleppey & Munnar",
    category: "Hills & Mountains",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    caption: "Dubai Skyline & Desert Safari Group",
    location: "Dubai, UAE",
    category: "International",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    caption: "Bali Island Culture & Temple Tour",
    location: "Bali, Indonesia",
    category: "International",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85",
    caption: "Royal Forts & Palaces Heritage Circuit",
    location: "Jaipur & Udaipur, Rajasthan",
    category: "Family & Heritage",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85",
    caption: "Tempo Traveller Private Group Roadtrip",
    location: "Western Ghats, Maharashtra",
    category: "Family & Heritage",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1539635273304-0e56845d4257?auto=format&fit=crop&w=1200&q=85",
    caption: "Himachal Scenic Valley Sightseeing",
    location: "Manali & Shimla",
    category: "Hills & Mountains",
  },
];

const filterCategories = [
  "All Memories",
  "Pilgrimages",
  "Coastal & Beaches",
  "Hills & Mountains",
  "International",
  "Family & Heritage",
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Memories");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredPhotos = galleryData.filter((item) => {
    if (activeCategory === "All Memories") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. PAGE HERO */}
      <section className="relative min-h-[340px] sm:min-h-[380px] text-white flex items-center justify-center bg-[#111827] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=85"
            alt="Sangaurii Traveler Memories"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-black/70" />
        </div>

        <div className="site-container relative z-10 text-center py-16 px-4 max-w-3xl mx-auto">
          <span className="text-[#F4A228] text-xs font-bold uppercase tracking-[0.25em] mb-2.5 block">
            GUEST MEMORIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
            Memories Shared by Our Travelers
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto leading-relaxed">
            Real moments, sacred temple darshans, and joyful family holidays captured across over a decade of journeys with Sangaurii Tours &amp; Travels.
          </p>
        </div>
      </section>

      {/* 2. STICKY FILTER PILLS BAR */}
      <div className="sticky top-[5.25rem] sm:top-[5.75rem] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-3.5">
        <div className="site-container flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
              Category:
            </span>
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#1C4E8A] text-white shadow-sm font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden md:inline">
            <strong className="text-[#111827]">{filteredPhotos.length}</strong> Moments
          </span>
        </div>
      </div>

      {/* 3. RESPONSIVE PHOTO GALLERY GRID */}
      <section className="py-16 sm:py-24">
        <div className="site-container">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPhotos.map((photo, idx) => (
                <motion.div
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative h-72 sm:h-80 overflow-hidden rounded-3xl bg-slate-900 shadow-sm cursor-pointer border border-slate-200/80 hover:border-slate-300 transition-all hover:shadow-lg"
                >
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[0.65rem] font-extrabold uppercase tracking-widest bg-black/40 backdrop-blur-md text-[#F4A228] border border-white/10">
                      {photo.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={13} />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-base font-bold leading-snug drop-shadow-sm">
                      {photo.caption}
                    </h3>
                    <p className="text-[0.72rem] text-slate-300 font-medium mt-1">
                      📍 {photo.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. SHARE YOUR MEMORIES WITH US */}
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="site-container max-w-4xl mx-auto">
          <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184829] uppercase tracking-widest">
                <Sparkles size={14} className="text-[#F4A228]" />
                HAVE TRAVELLED WITH SANGAURII?
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111827]">
                Share Your Journey Photos With Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg">
                Send your favorite pilgrimage or vacation pictures on WhatsApp. We would love to feature you in our guest gallery!
              </p>
            </div>

            <a
              href="https://wa.me/917498045445?text=Hello%20Sangaurii%20Tours,%20I%20want%20to%20share%20our%20trip%20photos%20for%20the%20guest%20gallery!"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all shrink-0"
            >
              <MessageSquare size={16} />
              <span>Send Photos on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. FLOATING CTA BANNER CARD (REUSED COMPONENT) */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="site-container">
          <div className="bg-[#1C4E8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <span className="text-[#F4A228] text-xs font-extrabold uppercase tracking-[0.2em] mb-2 block">
                CREATE LIFELONG MEMORIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Ready to create your own travel memories?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
                Book spiritual yatras, domestic escapes, or private rental vehicles with complete comfort and trust.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => openEnquiryModal("Guest Photos Page")}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all shrink-0 inline-flex items-center gap-2 shadow-lg relative z-10"
            >
              <span>Plan Your Next Journey</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#111827] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-colors shadow-md"
                aria-label="Close photo preview"
              >
                <X size={18} />
              </button>

              <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>

              <div className="p-6 bg-[#111827] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-[#F4A228] uppercase tracking-widest block mb-1">
                    {selectedPhoto.category}
                  </span>
                  <h4 className="font-serif text-xl font-bold">
                    {selectedPhoto.caption}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    📍 {selectedPhoto.location}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const caption = selectedPhoto.caption;
                    setSelectedPhoto(null);
                    openEnquiryModal(`Enquiry from Guest Photos: ${caption}`);
                  }}
                  className="bg-[#1C4E8A] hover:bg-[#153a67] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors shrink-0 inline-flex items-center gap-1.5"
                >
                  <span>Plan Similar Trip</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GalleryPage;
