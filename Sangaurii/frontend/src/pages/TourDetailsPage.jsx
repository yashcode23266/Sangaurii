import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BedDouble, CalendarDays, Check, ChevronDown, Clock3, MapPin,
  MessageCircle, ShieldCheck, X,
} from "lucide-react";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import TourCard from "../components/TourCard";
import TourEnquiryForm from "../components/TourEnquiryForm";
import { getTourBySlug, getTours } from "../services/tourService";

function TourDetailsPage() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [openDay, setOpenDay] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([getTourBySlug(slug), getTours()])
      .then(([result, all]) => {
        if (!active) return;
        setTour(result);
        setRelated(all.filter((item) => item.slug !== slug && (item.destination === result?.destination || item.category === result?.category)).slice(0, 3));
      })
      .catch(() => { if (active) setError("We could not load this package."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="site-container min-h-[55vh] py-20"><LoadingSpinner label="Preparing your itinerary…" /></div>;
  if (error) return <div className="site-container min-h-[55vh] py-20"><ErrorMessage message={error} /></div>;
  if (!tour) return <div className="site-container min-h-[55vh] py-20"><EmptyState title="Tour not found" message="This package may have moved or is no longer available." /></div>;

  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello Sangaurii Tours and Travels, I am interested in ${tour.title}.`)}` : "/contact";

  return (
    <>
      <section className="bg-deep-navy py-10 text-white">
        <div className="site-container">
          <span className="rounded-full bg-warm-yellow px-3 py-1 text-xs font-bold text-deep-navy">{tour.category}</span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{tour.title}</h1>
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/75"><span className="inline-flex items-center gap-2"><MapPin size={17} className="text-warm-yellow" />{tour.location}</span><span className="inline-flex items-center gap-2"><Clock3 size={17} className="text-warm-yellow" />{tour.duration}</span><strong className="text-lg text-warm-yellow">From ₹{tour.price.toLocaleString("en-IN")}</strong></div>
        </div>
      </section>

      <section className="site-container py-8">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
          <button type="button" onClick={() => setActiveImage(0)} className="h-[300px] overflow-hidden rounded-3xl md:h-[480px]"><img src={tour.gallery[0]} alt={`${tour.title} main view`} className="h-full w-full object-cover" /></button>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            {tour.gallery.slice(1, 3).map((image, index) => <button type="button" key={image} onClick={() => setActiveImage(index + 1)} className="overflow-hidden rounded-2xl"><img src={image} alt={`${tour.title} gallery ${index + 2}`} className="h-full min-h-36 w-full object-cover" /></button>)}
          </div>
        </div>
        {activeImage > 0 && <div className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-5" role="dialog" aria-modal="true"><button type="button" onClick={() => setActiveImage(0)} className="absolute right-5 top-5 rounded-full bg-white p-2" aria-label="Close gallery"><X /></button><img src={tour.gallery[activeImage]} alt={`${tour.title} enlarged`} className="max-h-[85vh] max-w-full rounded-2xl object-contain" /></div>}
      </section>

      <section className="section-pad pt-8">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <Content title="Tour overview"><p className="leading-8 text-dark-text/70">{tour.overview}</p></Content>
            <Content title="Tour highlights"><ul className="grid gap-3 sm:grid-cols-2">{tour.highlights.map((item) => <li key={item} className="flex gap-3 rounded-xl bg-white p-4 text-sm"><Check className="shrink-0 text-forest-green" size={19} />{item}</li>)}</ul></Content>
            <Content title="Day-wise itinerary">
              <div className="space-y-3">{tour.itinerary.map((item, index) => <div key={item.day} className="overflow-hidden rounded-2xl border border-black/8 bg-white"><button type="button" onClick={() => setOpenDay(openDay === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={openDay === index}><span className="flex items-center gap-4"><strong className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest-green text-sm text-white">D{item.day}</strong><span className="font-bold text-deep-navy">{item.title}</span></span><ChevronDown className={`shrink-0 transition ${openDay === index ? "rotate-180" : ""}`} size={19} /></button>{openDay === index && <p className="border-t border-black/5 px-5 py-4 pl-[5.75rem] text-sm leading-7 text-dark-text/65">{item.description}</p>}</div>)}</div>
            </Content>
            <div className="grid gap-6 md:grid-cols-2">
              <ListBlock title="Inclusions" items={tour.inclusions} positive />
              <ListBlock title="Exclusions" items={tour.exclusions} />
            </div>
            <Content title="Hotel details"><div className="overflow-x-auto rounded-2xl border border-black/8 bg-white"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-deep-navy text-white"><tr><th className="p-4">City</th><th className="p-4">Hotel category</th><th className="p-4">Nights</th></tr></thead><tbody>{tour.hotels.map((hotel) => <tr key={hotel.city} className="border-t border-black/5"><td className="p-4">{hotel.city}</td><td className="p-4">{hotel.hotel}</td><td className="p-4">{hotel.nights}</td></tr>)}</tbody></table></div></Content>
            <Content title="Transport details"><div className="flex gap-4 rounded-2xl bg-white p-5"><BedDouble className="shrink-0 text-golden-orange" /><p className="leading-7 text-dark-text/70">{tour.transport}</p></div></Content>
            <Content title="Upcoming departure dates"><div className="flex flex-wrap gap-3">{tour.departures.map((date) => <span key={date} className="inline-flex items-center gap-2 rounded-xl border border-forest-green/15 bg-white px-4 py-3 text-sm font-semibold text-deep-navy"><CalendarDays size={16} className="text-golden-orange" />{date}</span>)}</div></Content>
            <Content title="Important notes"><ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-dark-text/65">{tour.notes.map((note) => <li key={note}>{note}</li>)}</ul></Content>
          </div>
          <aside className="sticky top-28 rounded-3xl bg-white p-6 shadow-xl shadow-deep-navy/10">
            <div className="mb-5 flex items-center gap-3"><ShieldCheck className="text-forest-green" /><div><h2 className="font-display text-2xl font-bold text-deep-navy">Enquire now</h2><p className="text-xs text-dark-text/50">No payment required</p></div></div>
            <TourEnquiryForm tourTitle={tour.title} packageId={tour.id} destination={tour.destination} />
            <a href={whatsappHref} target={whatsapp ? "_blank" : undefined} rel="noreferrer" className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#25D366] font-bold text-[#178a43]"><MessageCircle size={18} /> WhatsApp Enquiry</a>
          </aside>
        </div>
      </section>

      {related.length > 0 && <section className="section-pad bg-white"><div className="site-container"><h2 className="mb-8 font-display text-3xl font-bold text-deep-navy">Related packages</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{related.map((item) => <TourCard key={item.slug} tour={item} />)}</div></div></section>}
    </>
  );
}

function Content({ title, children }) {
  return <section><h2 className="mb-5 font-display text-2xl font-bold text-deep-navy">{title}</h2>{children}</section>;
}

function ListBlock({ title, items, positive = false }) {
  return <Content title={title}><ul className="space-y-3 rounded-2xl bg-white p-5">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-dark-text/70">{positive ? <Check size={18} className="shrink-0 text-forest-green" /> : <X size={18} className="shrink-0 text-red-500" />}{item}</li>)}</ul></Content>;
}

export default TourDetailsPage;
