import { useState } from "react";
import FormSuccess from "./FormSuccess";
import { submitTourEnquiry } from "../services/tourService";
import { isIndianPhone } from "../utils/validation";

const initial = { name: "", phone: "", email: "", departureDate: "", travellers: "2", message: "" };

function TourEnquiryForm({ tourTitle, packageId, destination }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    if (!isIndianPhone(form.phone)) next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitTourEnquiry({ ...form, tourTitle, packageId, destination });
      setSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return <FormSuccess title="Your tour enquiry is on its way" />;

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field label="Full name" name="name" value={form.name} onChange={change} error={errors.name} required />
      <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={change} error={errors.phone} required />
      <Field label="Email address" name="email" type="email" value={form.email} onChange={change} error={errors.email} required />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Departure date" name="departureDate" type="date" value={form.departureDate} onChange={change} />
        <label className="input-label">Travellers<select name="travellers" value={form.travellers} onChange={change}><option>1</option><option>2</option><option>3</option><option>4</option><option value="5+">5+</option></select></label>
      </div>
      <label className="input-label">Message<textarea name="message" value={form.message} onChange={change} rows="3" placeholder="Any preferences or questions?" /></label>
      {submitError && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">{submitError}</p>}
      <button disabled={submitting} className="button-accent w-full">{submitting ? "Sending enquiry…" : "Enquire About This Tour"}</button>
    </form>
  );
}

function Field({ label, error, required, ...props }) {
  const id = `tour-enquiry-${props.name}`;
  return <label className="input-label" htmlFor={id}>{label}{required && <span className="sr-only"> required</span>}<input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />{error && <span id={`${id}-error`} className="text-xs text-red-600">{error}</span>}</label>;
}

export default TourEnquiryForm;
