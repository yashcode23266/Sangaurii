import { useEffect, useState } from "react";
import { Check, MessageCircle, Phone, UsersRound } from "lucide-react";
import ErrorMessage from "../components/ErrorMessage";
import FormSuccess from "../components/FormSuccess";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHero from "../components/PageHero";
import { getVehicles, submitRentalEnquiry } from "../services/tourService";
import { isIndianPhone } from "../utils/validation";

const initial = { name: "", phone: "", email: "", vehicle: "", tripType: "Outstation", pickupCity: "", destination: "", travelDate: "", returnDate: "", passengers: "", requirements: "" };

function VehicleRentalPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  useEffect(() => {
    getVehicles().then(setVehicles).catch(() => setLoadError("Vehicles could not be loaded.")).finally(() => setLoading(false));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!isIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.vehicle) next.vehicle = "Please select a vehicle.";
    if (!form.pickupCity.trim()) next.pickupCity = "Please enter the pickup city.";
    if (!form.travelDate) next.travelDate = "Please select a travel date.";
    if (!form.passengers) next.passengers = "Please enter passenger count.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitRentalEnquiry(form);
      setSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const phone = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "");

  return (
    <>
      <PageHero eyebrow="Comfortable travel for every group" title="Bus & Car Rental" description="Reliable vehicles for local journeys, airport transfers, family tours, events and outstation travel." />
      <section className="section-pad">
        <div className="site-container">
          <div className="mx-auto mb-12 max-w-3xl text-center"><h2 className="font-display text-3xl font-bold text-deep-navy">The right vehicle for every road</h2><p className="mt-4 leading-7 text-dark-text/65">Choose clean, comfortable cars, tempo travellers and coaches with experienced drivers. Tell us your route and group size, and we’ll recommend the most suitable option.</p></div>
          {loading ? <LoadingSpinner label="Loading available vehicles…" /> : loadError ? <ErrorMessage message={loadError} /> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{vehicles.map((vehicle) => <article key={vehicle.id} className="card overflow-hidden"><img src={vehicle.image} alt={vehicle.name} className="h-48 w-full object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl font-bold text-deep-navy">{vehicle.name}</h3><span className="rounded-full bg-[#edf4ef] px-2.5 py-1 text-xs font-bold text-forest-green">{vehicle.ac}</span></div><p className="mt-3 inline-flex items-center gap-2 text-sm text-dark-text/60"><UsersRound size={16} className="text-golden-orange" />{vehicle.capacity}</p><ul className="mt-4 flex flex-wrap gap-2">{vehicle.usage.map((item) => <li key={item} className="rounded-lg bg-off-white px-2.5 py-1 text-xs text-dark-text/65">{item}</li>)}</ul><button type="button" onClick={() => { setForm((current) => ({ ...current, vehicle: vehicle.name })); document.getElementById("rental-enquiry")?.scrollIntoView({ behavior: "smooth" }); }} className="button-secondary mt-5 w-full">Request Quote</button></div></article>)}</div>}
        </div>
      </section>

      <section id="rental-enquiry" className="section-pad bg-white">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-golden-orange">Quick rental enquiry</span><h2 className="mt-3 font-display text-3xl font-bold text-deep-navy">Tell us where you’re going</h2><p className="mt-4 leading-7 text-dark-text/65">Share your route, dates and group size. We’ll help you choose a comfortable vehicle and provide a clear quote.</p><ul className="mt-7 space-y-3 text-sm text-dark-text/70">{["Local and outstation travel", "Airport and railway transfers", "Family groups, events and corporate trips", "AC and non-AC options"].map((item) => <li key={item} className="flex gap-3"><Check className="text-forest-green" size={18} />{item}</li>)}</ul><div className="mt-8 flex flex-wrap gap-3"><a href={`tel:${phone}`} className="button-primary"><Phone size={17} /> Call {phone}</a><a href={whatsapp ? `https://wa.me/${whatsapp}` : "/contact"} target={whatsapp ? "_blank" : undefined} rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25D366] px-5 font-bold text-white"><MessageCircle size={18} /> WhatsApp</a></div></div>
          <div className="rounded-3xl bg-off-white p-5 sm:p-8">
            {success ? <><FormSuccess title="Your rental request is received" message="We’ll check availability and contact you with a suitable vehicle and quote." /><button type="button" className="button-secondary mt-5" onClick={() => { setSuccess(false); setForm(initial); }}>Make another enquiry</button></> : <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <RentalField label="Full name *" name="name" value={form.name} onChange={change} error={errors.name} />
              <RentalField label="Phone *" name="phone" type="tel" value={form.phone} onChange={change} error={errors.phone} />
              <RentalField label="Email" name="email" type="email" value={form.email} onChange={change} error={errors.email} />
              <label className="input-label">Vehicle *<select name="vehicle" value={form.vehicle} onChange={change} aria-invalid={Boolean(errors.vehicle)}><option value="">Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle.id}>{vehicle.name}</option>)}</select>{errors.vehicle && <span className="text-xs text-red-600">{errors.vehicle}</span>}</label>
              <label className="input-label">Trip type<select name="tripType" value={form.tripType} onChange={change}><option>Local</option><option>Outstation</option><option>Airport Transfer</option><option>Event</option></select></label>
              <RentalField label="Pickup city *" name="pickupCity" value={form.pickupCity} onChange={change} error={errors.pickupCity} />
              <RentalField label="Destination" name="destination" value={form.destination} onChange={change} />
              <RentalField label="Travel date *" name="travelDate" type="date" value={form.travelDate} onChange={change} error={errors.travelDate} />
              <RentalField label="Return date" name="returnDate" type="date" value={form.returnDate} onChange={change} />
              <RentalField label="Passengers *" name="passengers" type="number" min="1" value={form.passengers} onChange={change} error={errors.passengers} />
              <label className="input-label sm:col-span-2">Additional requirements<textarea name="requirements" value={form.requirements} onChange={change} rows="3" placeholder="Luggage, pickup time or route details" /></label>
              {submitError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2" role="alert">{submitError}</p>}
              <button disabled={submitting} className="button-accent sm:col-span-2">{submitting ? "Requesting quote…" : "Request Rental Quote"}</button>
            </form>}
          </div>
        </div>
      </section>
    </>
  );
}

function RentalField({ label, error, ...props }) {
  const id = `rental-${props.name}`;
  return <label className="input-label" htmlFor={id}>{label}<input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{error && <span id={`${id}-error`} className="text-xs text-red-600">{error}</span>}</label>;
}

export default VehicleRentalPage;
