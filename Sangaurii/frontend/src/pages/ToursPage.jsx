import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHero from "../components/PageHero";
import Pagination from "../components/Pagination";
import TourCard from "../components/TourCard";
import TourFilters from "../components/TourFilters";
import { getTours } from "../services/tourService";

const pageCopy = {
  all: ["All Tour Packages", "Browse thoughtfully planned holidays across India and around the world."],
  domestic: ["Domestic Tours", "Discover mountains, coastlines, culture and sacred journeys across incredible India."],
  international: ["International Tours", "Explore unforgettable destinations beyond borders with planning you can rely on."],
  special: ["Special Tours", "Seasonal escapes, spiritual journeys and distinctive travel experiences for meaningful occasions."],
};

const initialFilters = { search: "", destination: "", category: "", type: "", price: "200000", duration: "" };

function ToursPage({ mode = "all" }) {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ ...initialFilters, destination: searchParams.get("destination") || "" });
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTours()
      .then((data) => { if (active) setItems(data); })
      .catch(() => { if (active) setError("We could not load the tours. Please try again shortly."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const modeItems = useMemo(() => items.filter((item) => {
    if (mode === "domestic") return item.type === "Domestic";
    if (mode === "international") return item.type === "International";
    if (mode === "special") return item.type === "Special";
    return true;
  }), [items, mode]);

  const destinations = useMemo(() => [...new Set(modeItems.map((item) => item.destination))].sort(), [modeItems]);
  const categories = useMemo(() => [...new Set(modeItems.map((item) => item.category))].sort(), [modeItems]);

  const filtered = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const result = modeItems.filter((item) =>
      (!search || `${item.title} ${item.destination} ${item.location}`.toLowerCase().includes(search)) &&
      (!filters.destination || item.destination === filters.destination) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.type || item.type === filters.type) &&
      item.price <= Number(filters.price) &&
      (!filters.duration || item.days <= Number(filters.duration))
    );
    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "duration-short") return a.days - b.days;
      if (sort === "duration-long") return b.days - a.days;
      return b.popularity - a.popularity;
    });
  }, [filters, modeItems, sort]);

  useEffect(() => { setPage(1); }, [filters, sort, mode]);

  const pages = Math.ceil(filtered.length / perPage);
  const visible = filtered.slice((page - 1) * perPage, page * perPage);
  const copy = pageCopy[mode];

  return (
    <>
      <PageHero eyebrow="Plan your next journey" title={copy[0]} description={copy[1]} />
      <section className="section-pad">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
            <div><TourFilters filters={filters} setFilters={setFilters} destinations={destinations} categories={categories} clearFilters={() => setFilters(initialFilters)} /></div>
            <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-dark-text/60"><strong className="text-deep-navy">{filtered.length}</strong> packages found</p>
                <label className="flex items-center gap-3 text-sm font-semibold text-deep-navy">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-xl border border-black/10 bg-white px-3 py-2 outline-none"><option value="popularity">Popularity</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="duration-short">Duration: Shortest</option><option value="duration-long">Duration: Longest</option></select></label>
              </div>
              {loading ? <LoadingSpinner label="Finding the best journeys…" /> : error ? <ErrorMessage message={error} /> : visible.length === 0 ? <EmptyState title="No tours match your filters" message="Try changing or clearing a few filters to discover more journeys." /> : <>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <TourCard key={item.slug} tour={item} />)}</div>
                <Pagination page={page} pages={pages} onChange={(next) => { setPage(next); window.scrollTo({ top: 350, behavior: "smooth" }); }} />
              </>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ToursPage;
