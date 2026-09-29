import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Users, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { getVehicles, submitRentalEnquiry } from "../services/tourService";
import { openEnquiryModal } from "../utils/enquiry";

function VehicleRentalPage() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "SUV / MUV (6–7 Seater)",
    pickupCity: "Pune",
    destination: "",
    travelDate: "",
    tripType: "Outstation Trip",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  const handleSelectVehicle = (vehicleName) => {
    setFormData((prev) => ({ ...prev, vehicle: vehicleName }));
    const el = document.getElementById("quote-form-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitRentalEnquiry(formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. HERO SECTION (~35vh) */}
      <section className="relative min-h-[320px] sm:min-h-[360px] text-white flex items-center justify-center bg-[#111827] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=85"
            alt="Sangaurii Vehicle Fleet"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/60 to-black/70" />
        </div>

        <div className="site-container relative z-10 text-center py-14 px-4 max-w-3xl mx-auto">
          <span className="text-[#F4A228] text-xs font-bold uppercase tracking-[0.2em] mb-2.5 block">
            PRIVATE FLEET &amp; TRANSIT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-sm">
            Travel Your Way
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto leading-relaxed">
            Reliable sedans, luxury SUVs, tempo travellers, and buses for local city travel, airport transfers, family tours, and outstation trips.
          </p>
        </div>
      </section>

      {/* 2. VEHICLE TYPE GRID (4 CLEAN CARDS) */}
      <section className="py-20 sm:py-28">
        <div className="site-container">
          <SectionHeading
            eyebrow="SELECT YOUR VEHICLE"
            title="The Right Vehicle for Every Road"
            description="Clean, comfortable, and well-maintained vehicles driven by experienced, polite chauffeurs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-12">
            {vehicles.map((v, idx) => (
              <motion.article
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300 transition-all duration-300 shine-overlay"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[0.68rem] font-bold text-[#184829] shadow-xs">
                    {v.ac}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#111827] group-hover:text-[#1C4E8A] transition-colors">
                      {v.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                      <Users size={13} className="text-[#1C4E8A]" />
                      <span>{v.capacity}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {v.usage.map((u) => (
                        <span key={u} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[0.68rem] font-semibold text-slate-600">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={() => handleSelectVehicle(v.name)}
                    className="w-full bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs py-2.5 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    Get Quote
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RENTAL OPTIONS SECTION: TWO-COLUMN COMPARISON BLOCK */}
      <section className="py-20 sm:py-24 bg-white border-y border-slate-100">
        <div className="site-container">
          <SectionHeading
            eyebrow="RENTAL CHOICES"
            title="Flexible Rental Packages"
            description="Choose between our popular chauffeured service or customized self-drive options for your convenience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 max-w-4xl mx-auto">
            {/* With Driver Column */}
            <div className="space-y-4 pt-6 md:pt-0 md:pr-8">
              <span className="text-xs font-bold text-[#184829] uppercase tracking-widest block">
                MOST POPULAR OPTION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111827]">
                With Dedicated Driver
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Sit back and enjoy the scenery while our background-verified, route-expert driver navigates highways, temple ghats, and city traffic.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#184829] shrink-0" />
                  <span>Experienced, polite, and verified chauffeurs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#184829] shrink-0" />
                  <span>Fuel, state permits &amp; highway tolls coordinated</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#184829] shrink-0" />
                  <span>Zero driving fatigue for family &amp; elder travelers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#184829] shrink-0" />
                  <span>Doorstep pickup and scheduled return drops</span>
                </li>
              </ul>
            </div>

            {/* Self Drive Column */}
            <div className="space-y-4 pt-6 md:pt-0 md:pl-8">
              <span className="text-xs font-bold text-[#1C4E8A] uppercase tracking-widest block">
                INDEPENDENT EXPLORATION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#111827]">
                Self Drive Rental
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Take the wheel for private weekend road trips and scenic coast drives with our maintained self-drive cars and SUVs.
              </p>
              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#1C4E8A] shrink-0" />
                  <span>Complete privacy for you and your family</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#1C4E8A] shrink-0" />
                  <span>Thoroughly sanitized and mechanically inspected cars</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#1C4E8A] shrink-0" />
                  <span>Flexible daily, weekly, or weekend rental rates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#1C4E8A] shrink-0" />
                  <span>Simple document verification and transparent deposit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RATE / QUOTE ENQUIRY FORM (CENTERED CARD, MAX-W 600px) */}
      <section id="quote-form-section" className="py-20 sm:py-28 bg-[#F8FAFC]">
        <div className="site-container">
          <div className="max-w-[620px] mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#184829] uppercase tracking-[0.2em] block mb-1.5">
                INSTANT ESTIMATE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827]">
                Get a Fast Rental Quote
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Tell us your route and group size. We’ll confirm vehicle availability and best rates.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#111827]">
                  Quote Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Our coordinators Gauri &amp; Sangeeta will connect with you via call/WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#1C4E8A] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#153a67]"
                >
                  Request Another Quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                    Select Vehicle Type *
                  </label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                  >
                    <option>Premium Sedan (4 Seater)</option>
                    <option>SUV / MUV (6–7 Seater)</option>
                    <option>Tempo Traveller (12–17 Seater)</option>
                    <option>Luxury Coach (32–45 Seater)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pickupCity}
                      onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                      placeholder="e.g. Pune / Mumbai"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      Drop / Destination *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Mahabaleshwar / Goa"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      Travel Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      Trip Type
                    </label>
                    <select
                      value={formData.tripType}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                    >
                      <option>Outstation Trip</option>
                      <option>Local City Travel</option>
                      <option>Airport Transfer</option>
                      <option>Family / Event Rental</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#F4A228] hover:bg-[#E5931C] text-[#111827] font-extrabold text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={15} />
                  <span>{submitting ? "Calculating Quote..." : "Submit for Rental Quote"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 5. FLOATING CTA BANNER CARD (REUSED FROM HOMEPAGE) */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="site-container">
          <div className="bg-[#1C4E8A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <span className="text-[#F4A228] text-xs font-extrabold uppercase tracking-[0.2em] mb-2 block">
                DOORSTEP PICKUP &amp; TRANSFERS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Need a ride for your next trip?
              </h2>
              <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
                Call Gauri Pathak (74980 45445) or Sangeeta Kode (96379 17265) for instant vehicle confirmation.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => openEnquiryModal("Vehicle Rental Booking")}
              className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all shrink-0 inline-flex items-center gap-2 shadow-lg relative z-10"
            >
              <span>Book A Vehicle Now</span>
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VehicleRentalPage;
