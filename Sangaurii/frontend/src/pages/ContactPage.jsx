import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Instagram, Facebook, Youtube } from "lucide-react";
import { contactDetails } from "../data/homeData";
import { submitGeneralEnquiry } from "../services/tourService";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destinationInterest: "Jyotirlinga Darshan Yatra",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitGeneralEnquiry(formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. QUIET TEXT INTRO (NO HERO IMAGE NEEDED) */}
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16 bg-[#F8FAFC]">
        <div className="site-container max-w-3xl text-center mx-auto px-4">
          <span className="text-[#184829] text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111827] tracking-tight leading-tight">
            Contact Sangaurii Tours &amp; Travels
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            Speak directly with our tour coordinators for personalized holiday packages, spiritual yatras, and private vehicle rentals.
          </p>
        </div>
      </section>

      {/* 2. TWO-COLUMN LAYOUT: FORM ON LEFT, DETAILS & MAP ON RIGHT */}
      <section className="pb-24 sm:pb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column — Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
                <span className="text-[#1C4E8A] text-xs font-bold uppercase tracking-[0.2em] block mb-2">
                  DIRECT INQUIRY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] mb-2">
                  Send Us Your Requirements
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8 leading-relaxed">
                  Fill in your travel dates and group size. We&apos;ll prepare a customized itinerary with transparent pricing.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#111827]">
                      Thank You! Message Received
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Our tour coordinators Gauri Pathak and Sangeeta Kode will call or WhatsApp you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          destinationInterest: "Jyotirlinga Darshan Yatra",
                          message: "",
                        });
                      }}
                      className="mt-4 bg-[#1C4E8A] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#153a67] transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rahul@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                          Destination Interest *
                        </label>
                        <select
                          value={formData.destinationInterest}
                          onChange={(e) => setFormData({ ...formData, destinationInterest: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC]"
                        >
                          <option>Jyotirlinga Darshan Yatra (₹5,999)</option>
                          <option>Malvan • Tarkarli • Kolam Beach (₹4,999)</option>
                          <option>Girnar Parikrama &amp; Somnath (₹11,999)</option>
                          <option>Kashmir Paradise Trail</option>
                          <option>Kerala Backwaters &amp; Hills</option>
                          <option>Royal Rajasthan Tour</option>
                          <option>International Holiday Package</option>
                          <option>Private Vehicle Rental</option>
                          <option>Custom Group Itinerary</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                        Message / Travel Details
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about expected dates, number of passenger seats needed, or any special requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1C4E8A] focus:outline-none bg-[#F8FAFC] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#F4A228] hover:bg-[#E5931C] text-[#111827] font-extrabold text-sm py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send size={16} />
                      <span>{submitting ? "Submitting Inquiry..." : "Submit Travel Inquiry"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column — Contact Details & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
                <span className="text-[#184829] text-xs font-bold uppercase tracking-[0.2em] block">
                  CONTACT DETAILS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#111827]">
                  Speak Directly With Us
                </h3>

                {/* Contacts List */}
                <div className="space-y-3">
                  {contactDetails.contacts.map((c) => (
                    <div
                      key={c.name}
                      className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-between gap-3"
                    >
                      <div>
                        <strong className="block text-sm font-bold text-[#111827]">
                          {c.name}
                        </strong>
                        <span className="text-xs text-slate-500 font-medium">
                          Tour Coordinator
                        </span>
                      </div>
                      <a
                        href={`tel:${c.fullPhone.replace(/\s+/g, "")}`}
                        className="bg-[#1C4E8A] hover:bg-[#153a67] text-white text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                      >
                        <Phone size={12} />
                        <span>{c.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>

                {/* Address, Email & Hours */}
                <div className="pt-3 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
                  <div className="flex items-start gap-3">
                    <MapPin size={17} className="text-[#184829] shrink-0 mt-0.5" />
                    <span>{contactDetails.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={17} className="text-[#1C4E8A] shrink-0" />
                    <a href={`mailto:${contactDetails.email}`} className="text-[#1C4E8A] font-semibold hover:underline">
                      {contactDetails.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={17} className="text-[#F4A228] shrink-0" />
                    <span>Mon – Sun: 8:00 AM – 9:00 PM (24/7 Phone Support)</span>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/917498045445?text=Hello%20Sangaurii%20Tours,%20I%20would%20like%20to%20enquire%20about%20a%20tour%20package."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare size={17} />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Embedded Google Map */}
                <div className="pt-3 overflow-hidden rounded-2xl border border-slate-200 h-44">
                  <iframe
                    title="Sangaurii Tours Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60527.28318218671!2d73.80582523293883!3d18.473550882194165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295989dc3399b%3A0x6b631d8e137b12d5!2sSinhgad%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Social Links */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Follow Our Journeys:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-all"
                    >
                      <Instagram size={14} />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-all"
                    >
                      <Facebook size={14} />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#F4A228] hover:text-[#111827] flex items-center justify-center transition-all"
                    >
                      <Youtube size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
