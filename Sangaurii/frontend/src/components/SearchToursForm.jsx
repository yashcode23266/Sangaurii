import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchToursForm({ className = "" }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const submit = (event) => {
    event.preventDefault();
    navigate(destination ? `/tours?destination=${encodeURIComponent(destination)}` : "/tours");
  };

  return (
    <form onSubmit={submit} className={`grid gap-3 rounded-[1.35rem] bg-white/80 p-4 shadow-2xl shadow-deep-navy/15 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_auto] lg:items-end lg:p-5 ${className}`}>
      <label className="form-field">
        <span><MapPin size={15} /> Destination</span>
        <select value={destination} onChange={(event) => setDestination(event.target.value)}>
          <option value="">Where would you like to go?</option>
          <option>Kashmir</option><option>Rajasthan</option><option>Kerala</option><option>Maharashtra</option><option>Himachal</option>
        </select>
      </label>
      <label className="form-field">
        <span><CalendarDays size={15} /> Travel month</span>
        <input type="month" aria-label="Travel month" />
      </label>
      <label className="form-field">
        <span><Users size={15} /> Travellers</span>
        <select defaultValue="2"><option value="1">1 Traveller</option><option value="2">2 Travellers</option><option value="4">3–4 Travellers</option><option value="5">5+ Travellers</option></select>
      </label>
      <button className="button-accent h-12 justify-center sm:col-span-2 lg:col-span-1"><Search size={18} /> Search Tours</button>
    </form>
  );
}

export default SearchToursForm;
