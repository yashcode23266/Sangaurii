import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

function TourFilters({ filters, setFilters, destinations, categories, clearFilters }) {
  const [open, setOpen] = useState(false);
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const controls = (
    <>
      <div className="flex items-center justify-between lg:hidden"><strong className="text-deep-navy">Filter tours</strong><button type="button" onClick={() => setOpen(false)} aria-label="Close filters"><X /></button></div>
      <label className="filter-label">Destination<select value={filters.destination} onChange={(event) => update("destination", event.target.value)}><option value="">All destinations</option>{destinations.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="filter-label">Tour category<select value={filters.category} onChange={(event) => update("category", event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="filter-label">Tour region<select value={filters.type} onChange={(event) => update("type", event.target.value)}><option value="">Domestic & international</option><option>Domestic</option><option>International</option><option>Special</option></select></label>
      <label className="filter-label">Maximum price <span className="float-right font-normal text-dark-text/50">₹{Number(filters.price).toLocaleString("en-IN")}</span><input type="range" min="15000" max="200000" step="5000" value={filters.price} onChange={(event) => update("price", event.target.value)} /></label>
      <label className="filter-label">Maximum duration<select value={filters.duration} onChange={(event) => update("duration", event.target.value)}><option value="">Any duration</option><option value="4">Up to 4 days</option><option value="7">Up to 7 days</option><option value="10">Up to 10 days</option><option value="15">Up to 15 days</option></select></label>
      <button type="button" onClick={clearFilters} className="button-secondary w-full"><RotateCcw size={16} /> Clear Filters</button>
    </>
  );

  return (
    <>
      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="relative"><span className="sr-only">Search by destination or package</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-text/40" size={19} /><input value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Search by destination or package" className="h-12 w-full rounded-xl border border-black/10 bg-white pl-11 pr-4 outline-none focus:border-medium-blue" /></label>
        <button type="button" onClick={() => setOpen(true)} className="button-secondary lg:hidden"><SlidersHorizontal size={17} /> Filters</button>
      </div>
      <aside className="hidden rounded-2xl border border-black/5 bg-white p-5 shadow-sm lg:block"><h2 className="mb-5 flex items-center gap-2 font-display text-xl font-bold text-deep-navy"><SlidersHorizontal size={19} /> Filter tours</h2><div className="space-y-5">{controls}</div></aside>
      <div className={`fixed inset-0 z-[60] bg-deep-navy/55 transition lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`} onClick={() => setOpen(false)} />
      <aside className={`fixed right-0 top-0 z-[61] h-full w-[min(88%,360px)] overflow-y-auto bg-off-white p-6 shadow-2xl transition-transform lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}><div className="space-y-5">{controls}</div></aside>
    </>
  );
}

export default TourFilters;
