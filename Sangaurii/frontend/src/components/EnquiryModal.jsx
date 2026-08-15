import React, { useEffect, useState } from "react";
import { CheckCircle2, X, Send, Sparkles } from "lucide-react";
import { submitGeneralEnquiry } from "../services/tourService";

function EnquiryModal({ initialTitle = "Plan Your Dream Trip" }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [customSubject, setCustomSubject] = useState(initialTitle);

  useEffect(() => {
    const show = (e) => {
      setSent(false);
      setError("");
      if (e?.detail?.title) {
        setCustomSubject(e.detail.title);
      } else if (typeof e?.detail === "string") {
        setCustomSubject(e.detail);
      } else {
        setCustomSubject(initialTitle);
      }
      setOpen(true);
    };

    window.addEventListener("open-enquiry", show);
    return () => window.removeEventListener("open-enquiry", show);
  }, [initialTitle]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const submit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.subject = customSubject;
    setSubmitting(true);
    setError("");
    try {
      await submitGeneralEnquiry(data);
      setSent(true);
    } catch (submitError) {
      setError(submitError.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-slate-950/75 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close enquiry"
        onClick={() => setOpen(false)}
      />

      <div className="relative my-6 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8 border border-slate-100">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-[#F59E0B] hover:text-slate-950 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="py-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#184829]/10 text-[#184829] flex items-center justify-center mb-4">
              <CheckCircle2 size={44} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1C4E8A]">
              Enquiry Received!
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
              Thank you for choosing <strong>Sangaurii Tours and Travels</strong>. Our luxury travel advisor will contact you within 15 minutes with tailor-made options.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="button-gold mt-6 font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#F59E0B]" size={18} />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#184829]">
                SANGAURII LUXURY ASSIST
              </span>
            </div>

            <h2
              id="enquiry-title"
              className="mt-1 font-serif text-2xl sm:text-3xl font-extrabold text-[#0F172A]"
            >
              {customSubject}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
              Fill out your details below or call our tour advisors directly for instant booking.
            </p>

            <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#1C4E8A]">Or Call Directly:</span>
              <div className="flex items-center gap-3">
                <a href="tel:7498045445" className="font-bold text-[#184829] hover:text-[#F4A228] transition-colors flex items-center gap-1">
                  <span>Gauri: <strong>74980 45445</strong></span>
                </a>
                <a href="tel:9637917265" className="font-bold text-[#184829] hover:text-[#F4A228] transition-colors flex items-center gap-1">
                  <span>Sangeeta: <strong>96379 17265</strong></span>
                </a>
              </div>
            </div>

            <form onSubmit={submit} className="mt-6 grid gap-3.5 sm:grid-cols-2">
              <label className="input-label">
                Full Name *
                <input required name="name" placeholder="Enter your full name" />
              </label>

              <label className="input-label">
                Mobile Number *
                <input required name="phone" type="tel" placeholder="+91 98765 43210" />
              </label>

              <label className="input-label">
                Email Address
                <input name="email" type="email" placeholder="you@example.com" />
              </label>

              <label className="input-label">
                Destination
                <input
                  name="destination"
                  placeholder="Where do you want to go?"
                  defaultValue={customSubject !== "Plan Your Dream Trip" ? customSubject : ""}
                />
              </label>

              <label className="input-label">
                Tentative Travel Date
                <input name="departureDate" type="date" />
              </label>

              <label className="input-label">
                Number of Travelers
                <select name="travellers" defaultValue="2">
                  <option value="1">1 Person (Solo)</option>
                  <option value="2">2 People (Couple)</option>
                  <option value="4">3–5 People (Family)</option>
                  <option value="10">6+ People (Group Trip)</option>
                </select>
              </label>

              <label className="input-label sm:col-span-2">
                Special Preferences / Budget
                <textarea
                  name="message"
                  rows="2"
                  placeholder="e.g. 5-Star Resort, Vehicle Rental, Monsoon Special..."
                />
              </label>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-xs text-red-700 sm:col-span-2 font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="button-gold justify-center sm:col-span-2 font-bold text-sm shadow-lg !py-3"
              >
                <Send size={16} />
                <span>{submitting ? "Submitting Request..." : "Request Free Custom Plan"}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EnquiryModal;
