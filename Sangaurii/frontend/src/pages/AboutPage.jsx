import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, HeartHandshake, Car, Clock, ChevronDown, Award, Users, DollarSign, MapPin, Plane, Building2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import TrustStrip from "../components/TrustStrip";
import { openEnquiryModal } from "../utils/enquiry";

const milestones = [
  {
    icon: Award,
    title: "10+ Years of Excellence",
    description: "Uncompromised service quality, safety standards, and deep travel expertise built over a decade.",
  },
  {
    icon: Users,
    title: "Thousands of Happy Travelers",
    description: "Trusted by thousands for their daily commutes, local sightseeing, outstation trips, and sacred pilgrimages.",
  },
  {
    icon: Car,
    title: "A Diverse Fleet",
    description: "Built over the years to adapt to changing travel demands—from sleek sedans and spacious SUVs to luxury coaches.",
  },
  {
    icon: HeartHandshake,
    title: "A Strong Reputation",
    description: "Built on word-of-mouth recommendations, absolute punctuality, and fair, transparent pricing.",
  },
];

const whyTravelWithUs = [
  {
    icon: ShieldCheck,
    title: "Experienced & Professional Drivers",
    description: "Our chauffeurs are background-verified, highly experienced, polite, and well-versed with local and outstation routes to ensure your complete safety.",
  },
  {
    icon: Car,
    title: "Well-Maintained Fleet",
    description: "Safety is our top priority. Every vehicle in our fleet undergoes regular maintenance, rigorous cleaning, and safety checks before every trip.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Travel plans can change at any moment. Our customer support and booking services are active around the clock to assist you whenever you need us.",
  },
  {
    icon: DollarSign,
    title: "Transparent & Competitive Pricing",
    description: "No hidden charges, no last-minute surprises. We offer honest, value-for-money rates for all local, outstation, and rental packages.",
  },
];

const coreServices = [
  {
    icon: MapPin,
    title: "Local & City Travel",
    description: "Comfortable city rides for business meetings, shopping, or sightseeing across the region.",
    badge: "City Rides",
  },
  {
    icon: Car,
    title: "Outstation Trips",
    description: "Safe and relaxing round-trip or one-way cab services to your favorite weekend getaways and holiday destinations.",
    badge: "Holidays & Getaways",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Punctual pickup and drop services so you never miss a flight or wait after landing.",
    badge: "24/7 Punctual",
  },
  {
    icon: Building2,
    title: "Corporate & Event Rentals",
    description: "Tailored transportation solutions for business events, conferences, and employee commutes.",
    badge: "Corporate Fleet",
  },
  {
    icon: Users,
    title: "Family & Group Tours",
    description: "Spacious vehicles equipped to keep large groups comfortable on long spiritual and vacation journeys.",
    badge: "Spiritual & Group",
  },
];

const faqs = [
  {
    q: "How does customized tour planning work with Sangaurii?",
    a: "You simply tell us your preferred travel dates, destination, and family group size. Our coordinators (Gauri Pathak & Sangeeta Kode) design a personalized itinerary including handpicked hotel stays, private AC vehicles, and guided temple or sightseeing schedules tailored to your comfort and budget.",
  },
  {
    q: "What types of vehicles are provided for private & pilgrimage tours?",
    a: "We operate a well-maintained private fleet ranging from 4-seater sedans (Dzire / Etios) and 6–7 seater luxury SUVs (Innova Crysta / Ertiga) to 12–17 seater Tempo Travellers and 32–45 seater luxury AC coaches. Every vehicle is thoroughly sanitized and inspected before departure.",
  },
  {
    q: "Do you provide special assistance for senior citizens on pilgrimage tours?",
    a: "Yes, absolutely. Senior citizen comfort is our utmost priority. Our chauffeurs assist with temple VIP darshan coordination, doorstep luggage handling, comfortable pacing with timely tea/meal breaks, and ground-floor hotel room allocations wherever available.",
  },
  {
    q: "What is your booking confirmation and payment procedure?",
    a: "Booking is hassle-free. You can confirm your package with a nominal advance token via UPI, bank transfer, or at our Pune office. The remaining balance is payable on arrival or in easy milestone installments with transparent GST receipts.",
  },
];

function AboutPage() {
  const [openFaq, setOpenFaq] = useState(0);

  // Smooth scroll to hash anchor if present in URL
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  const handleEnquire = () => {
    openEnquiryModal("About Us Page Story");
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. WELCOME & STORY HERO SECTION */}
      <section id="our-story" className="pt-20 pb-16 sm:pt-28 sm:pb-20 bg-white border-b border-slate-100">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <span className="text-xs font-bold text-[#184829] uppercase tracking-[0.25em] block">
                WELCOME TO SANGAURII TOURS &amp; TRAVELS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight leading-tight">
                Your Trusted Travel Partner for Over a Decade
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                For the past 10 years, <strong>Sangaurii Tours and Travels</strong> has been redefining the way people travel. Established with a vision to make journeys safe, comfortable, and memorable, we have grown from a passionate local transport provider into one of the most reliable and trusted travel and car rental partners in the region.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Whether it is a family vacation, a corporate business trip, an outstation getaway, or an urgent airport transfer, we take pride in delivering seamless travel solutions tailored to every unique need.
              </p>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <span>Book Your Journey</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>

            {/* Feature Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=85"
                  alt="Sangaurii Travel Experience"
                  className="w-full h-80 sm:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[0.68rem] font-bold text-[#F4A228] uppercase tracking-widest block">
                    10-YEAR MILESTONE
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-bold mt-1 leading-snug">
                    &ldquo;A decade of driving memories forward.&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. REUSED STATS STRIP */}
      <TrustStrip />

      {/* 3. OUR JOURNEY: A DECADE OF EXCELLENCE */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="site-container">
          <SectionHeading
            eyebrow="OUR JOURNEY"
            title="A Decade of Excellence"
            description="When we started 10 years ago, our goal was simple: to put the customer first and ensure every ride is safe and comfortable. Over the past decade, we have achieved remarkable milestones:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-12">
            {milestones.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between shine-overlay"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#1C4E8A]/10 text-[#1C4E8A] flex items-center justify-center mb-5">
                      <IconComp size={24} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#111827] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY TRAVEL WITH US? */}
      <section id="why-us" className="py-20 sm:py-28 bg-white border-y border-slate-100">
        <div className="site-container">
          <SectionHeading
            eyebrow="THE SANGAURII DIFFERENCE"
            title="Why Travel With Us?"
            description="At Sangaurii Tours and Travels, we believe that a journey is just as important as the destination. Here is what sets us apart:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {whyTravelWithUs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="flex gap-5 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#184829]/10 text-[#184829] flex items-center justify-center shrink-0">
                    <IconComp size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#111827] mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR CORE SERVICES */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="site-container">
          <SectionHeading
            eyebrow="WHAT WE OFFER"
            title="Our Core Services"
            description="We offer a comprehensive suite of travel and transportation solutions designed for individuals, families, and corporate clients:"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            {coreServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group shine-overlay"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1C4E8A]/10 text-[#1C4E8A] group-hover:bg-[#F4A228] group-hover:text-[#111827] flex items-center justify-center transition-colors">
                        <IconComp size={22} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[0.68rem] font-extrabold uppercase bg-slate-100 text-slate-600">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#111827] mb-2 group-hover:text-[#1C4E8A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openEnquiryModal(service.title)}
                    className="text-xs font-bold text-[#1C4E8A] hover:text-[#184829] flex items-center gap-1.5 pt-4 border-t border-slate-100 transition-colors mt-6 cursor-pointer"
                  >
                    <span>Enquire For This Service</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. OUR VISION FOR THE FUTURE & CLOSING COMMITMENT */}
      <section className="py-20 sm:py-28 bg-[#184829] text-white relative overflow-hidden">
        <div className="site-container max-w-4xl text-center mx-auto space-y-6 relative z-10 px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#F4A228] border border-white/20 text-xs font-bold uppercase tracking-[0.2em]">
            LOOKING FORWARD
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
            Our Vision for the Future
          </h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            As we look beyond our successful 10-year milestone, our commitment remains unchanged. We aim to continuously innovate our services, integrate hassle-free digital booking experiences, and expand our reach—all while keeping customer comfort and safety at the absolute center of everything we do.
          </p>

          <blockquote className="my-8 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 font-serif italic text-base sm:text-xl text-[#F4A228] leading-relaxed">
            &ldquo;Your journey, our commitment. Thank you for trusting Sangaurii Tours and Travels to be a part of your life&apos;s journey for the past 10 years. We look forward to driving you forward!&rdquo;
          </blockquote>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleEnquire}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              <span>Plan Your Journey With Us</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE FAQ ACCORDION */}
      <section id="faq" className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="site-container max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Everything You Need to Know"
            description="Clear answers about vehicle bookings, customized itineraries, and pilgrimage support."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#111827] hover:text-[#1C4E8A] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#1C4E8A] text-white" : "text-slate-500"}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
