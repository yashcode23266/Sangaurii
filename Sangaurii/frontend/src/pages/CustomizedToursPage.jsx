import { useState } from "react";
import { CalendarCheck, Map, Sparkles } from "lucide-react";
import FormSuccess from "../components/FormSuccess";
import PageHero from "../components/PageHero";
import { submitCustomTour } from "../services/tourService";
import { isIndianPhone } from "../utils/validation";

const initial = {
  fullName: "", phone: "", email: "", destination: "", departureCity: "", departureDate: "",
  flexibleDates: false, adults: "2", children: "0", duration: "", budget: "", tourType: "",
  hotelPreference: "", transportPreference: "", specialRequirements: "",
};

function CustomizedToursPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const change = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!isIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.destination.trim()) next.destination = "Please tell us your preferred destination.";
    if (!form.departureCity.trim()) next.departureCity = "Please enter your departure city.";
    if (!form.duration) next.duration = "Please select a trip duration.";
    if (!form.budget) next.budget = "Please select a budget range.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitCustomTour(form);
      setSuccess(true);
      window.scrollTo({ top: 350, behavior: "smooth" });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero eyebrow="Designed around you" title="Customized Tours" description="Tell us how you like to travel and we’ll bring the destinations, stays and experiences together into one personal itinerary." />
      <section className="section-pad">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-golden-orange">Your holiday, your way</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-deep-navy">Start with a wish. We’ll take care of the planning.</h2>
            <p className="mt-5 leading-7 text-dark-text/65">Whether it is a family celebration, a quiet honeymoon or a group adventure, your trip should fit the people taking it.</p>
            <div className="mt-8 space-y-5">
              {[[Map, "Share your ideas", "Tell us the destination, dates and experiences you have in mind."], [Sparkles, "Receive a tailored plan", "We shape a balanced itinerary around your pace and budget."], [CalendarCheck, "Refine and confirm", "Review the plan with our team and adjust it until it feels right."]].map(([Icon, title, text]) => <div key={title} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-green text-white"><Icon size={20} /></span><div><h3 className="font-bold text-deep-navy">{title}</h3><p className="mt-1 text-sm leading-6 text-dark-text/60">{text}</p></div></div>)}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-xl shadow-deep-navy/8 sm:p-8">
            {success ? <><FormSuccess title="Your custom trip request is received" message="Our travel planner will review your preferences and connect with you shortly." /><button type="button" onClick={() => { setSuccess(false); setForm(initial); }} className="button-secondary mt-5">Plan another trip</button></> : <>
              <h2 className="font-display text-2xl font-bold text-deep-navy">Tell us about your trip</h2>
              <p className="mt-2 text-sm text-dark-text/55">Fields marked with * are required.</p>
              <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name *" name="fullName" value={form.fullName} onChange={change} error={errors.fullName} />
                <Field label="Phone *" name="phone" type="tel" value={form.phone} onChange={change} error={errors.phone} />
                <Field label="Email *" name="email" type="email" value={form.email} onChange={change} error={errors.email} />
                <Field label="Destination *" name="destination" value={form.destination} onChange={change} error={errors.destination} placeholder="Where would you like to go?" />
                <Field label="Departure city *" name="departureCity" value={form.departureCity} onChange={change} error={errors.departureCity} />
                <Field label="Departure date" name="departureDate" type="date" value={form.departureDate} onChange={change} />
                <label className="flex items-center gap-3 rounded-xl bg-off-white p-4 text-sm font-semibold text-deep-navy sm:col-span-2"><input type="checkbox" name="flexibleDates" checked={form.flexibleDates} onChange={change} className="h-4 w-4 accent-forest-green" /> My travel dates are flexible</label>
                <Select label="Adults" name="adults" value={form.adults} onChange={change} options={["1", "2", "3", "4", "5", "6+"]} />
                <Select label="Children" name="children" value={form.children} onChange={change} options={["0", "1", "2", "3", "4+"]} />
                <Select label="Duration *" name="duration" value={form.duration} onChange={change} error={errors.duration} options={["3–5 days", "6–8 days", "9–12 days", "13+ days"]} placeholder="Select duration" />
                <Select label="Budget per person *" name="budget" value={form.budget} onChange={change} error={errors.budget} options={["Under ₹25,000", "₹25,000–₹50,000", "₹50,000–₹1,00,000", "Above ₹1,00,000"]} placeholder="Select budget" />
                <Select label="Tour type" name="tourType" value={form.tourType} onChange={change} options={["Family", "Honeymoon", "Friends", "Senior Citizens", "Spiritual", "Adventure"]} placeholder="Select tour type" />
                <Select label="Hotel preference" name="hotelPreference" value={form.hotelPreference} onChange={change} options={["Comfort", "Premium", "Luxury", "A mix of categories"]} placeholder="Select hotel preference" />
                <Select label="Transport preference" name="transportPreference" value={form.transportPreference} onChange={change} options={["Private car", "Tempo Traveller", "Coach", "Flights + private transfers", "Need advice"]} placeholder="Select transport" />
                <label className="input-label sm:col-span-2">Special requirements<textarea name="specialRequirements" value={form.specialRequirements} onChange={change} rows="4" placeholder="Meals, accessibility, celebrations or anything else we should know" /></label>
                {submitError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 sm:col-span-2" role="alert">{submitError}</p>}
                <button disabled={submitting} className="button-accent sm:col-span-2">{submitting ? "Sending your request…" : "Request My Custom Itinerary"}</button>
              </form>
            </>}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, ...props }) {
  const id = `custom-${props.name}`;
  return <label htmlFor={id} className="input-label">{label}<input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{error && <span id={`${id}-error`} className="text-xs text-red-600">{error}</span>}</label>;
}

function Select({ label, options, placeholder, error, ...props }) {
  const id = `custom-${props.name}`;
  return <label htmlFor={id} className="input-label">{label}<select id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props}>{placeholder && <option value="">{placeholder}</option>}{options.map((item) => <option key={item}>{item}</option>)}</select>{error && <span id={`${id}-error`} className="text-xs text-red-600">{error}</span>}</label>;
}

export default CustomizedToursPage;
