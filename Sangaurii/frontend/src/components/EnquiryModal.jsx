import { CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { submitGeneralEnquiry } from "../services/tourService";

function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const show = () => { setSent(false); setError(""); setOpen(true); };
    window.addEventListener("open-enquiry", show);
    return () => window.removeEventListener("open-enquiry", show);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const handleKeyDown = (event) => { if (event.key === "Escape") setOpen(false); };
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
    setSubmitting(true);
    setError("");
    try {
      await submitGeneralEnquiry(data);
      setSent(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-deep-navy/65 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close enquiry" onClick={() => setOpen(false)} />
      <div className="relative my-6 w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full bg-off-white p-2 text-dark-text" aria-label="Close"><X size={19} /></button>
        {sent ? (
          <div className="py-12 text-center"><CheckCircle2 className="mx-auto text-forest-green" size={54} /><h2 className="mt-5 font-display text-2xl font-bold text-deep-navy">Thank you for your enquiry</h2><p className="mt-3 text-dark-text/65">Our travel team will connect with you shortly.</p><button type="button" onClick={() => setOpen(false)} className="button-primary mt-6">Close</button></div>
        ) : (
          <>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-golden-orange">Let’s plan together</span>
            <h2 id="enquiry-title" className="mt-2 font-display text-3xl font-bold text-deep-navy">Plan your dream trip</h2>
            <p className="mt-2 text-sm text-dark-text/60">Tell us a little about your journey and we’ll call you back.</p>
            <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="input-label">Full name<input required name="name" placeholder="Your name" /></label>
              <label className="input-label">Phone number<input required name="phone" type="tel" placeholder="+91 98765 43210" /></label>
              <label className="input-label">Email address<input required name="email" type="email" placeholder="you@example.com" /></label>
              <label className="input-label">Destination<input required name="destination" placeholder="Where do you want to go?" /></label>
              <label className="input-label">Travel date<input name="departureDate" type="date" /></label>
              <label className="input-label">Travellers<select name="travellers" defaultValue="2"><option value="1">1</option><option value="2">2</option><option value="4">3–4</option><option value="5">5+</option></select></label>
              <label className="input-label sm:col-span-2">Anything else?<textarea name="message" rows="3" placeholder="Share your preferences" /></label>
              {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2" role="alert">{error}</p>}
              <button disabled={submitting} className="button-accent justify-center sm:col-span-2">{submitting ? "Sending enquiry…" : "Send Enquiry"}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EnquiryModal;
