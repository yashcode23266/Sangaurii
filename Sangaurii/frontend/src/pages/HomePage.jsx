import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Award, Bus, Globe2, Headphones, HeartHandshake,
  Landmark, MapPinned, ShieldCheck, SlidersHorizontal, Sparkles, Star, UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import DestinationCard from "../components/DestinationCard";
import NewsletterForm from "../components/NewsletterForm";
import SectionHeading from "../components/SectionHeading";
import TourCard from "../components/TourCard";
import GalleryGrid from "../components/GalleryGrid";
import TestimonialCarousel from "../components/TestimonialCarousel";
import UpcomingTours from "../components/UpcomingTours";
import HomeHero from "../components/home/HomeHero";
import Button from "../components/UI/Button";
import RevealGrid from "../components/UI/RevealGrid";
import {
  blogs as fallbackBlogs, destinations, featuredTours as fallbackFeaturedTours,
  galleryImages as fallbackGallery, maharashtraTours,
  testimonials as fallbackTestimonials, tourCategories,
} from "../data/homeData";
import { getPublicContent } from "../services/contentService";
import { getFeaturedTours } from "../services/tourService";
import { openEnquiryModal } from "../utils/enquiry";

const categoryIcons = { Landmark, Globe2, Sparkles, SlidersHorizontal };
const maharashtraPhotoMap = ["/assets/gallery/boating/boating-01.jpeg", "/assets/gallery/temple-tours/temple-tour-01.jpeg", "/assets/gallery/railway-departure/departure-01.jpeg"];
const destinationPhotoMap = ["/assets/gallery/group-outings/group-outing-shimla.jpeg", "/assets/gallery/temple-tours/temple-tour-02.jpeg", "/assets/gallery/boating/boating-01.jpeg", "/assets/gallery/group-outings/group-outing-01.jpeg", "/assets/gallery/malaysia-trip/malaysia-02-merdeka-park.jpeg", "/assets/gallery/malaysia-trip/malaysia-03-city.jpeg"];
const springCard = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } } };


function CountUpStat({ value, suffix = "+", label, Icon }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    if (reduceMotion) { setCount(value); return undefined; }
    let frame;
    const startedAt = performance.now();
    const duration = 1450;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion, value]);

  return <div ref={ref} className="text-center text-deep-navy"><Icon className="mx-auto mb-3 text-forest-green" size={25} /><strong className="font-display text-3xl font-bold sm:text-4xl">{count.toLocaleString("en-IN")}{suffix}</strong><span className="mt-2 block text-xs font-bold uppercase tracking-[0.14em] text-deep-navy/65">{label}</span></div>;
}

function HomePage() {
  const reduceMotion = useReducedMotion();
  const [featuredTours, setFeaturedTours] = useState(fallbackFeaturedTours);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [galleryImages, setGalleryImages] = useState(fallbackGallery);

  useEffect(() => {
    let active = true;
    Promise.all([getFeaturedTours(), getPublicContent()]).then(([tourItems, content]) => {
      if (!active) return;
      if (tourItems.length) setFeaturedTours(tourItems);
      setTestimonials(content.testimonials);
      setBlogs(content.blogs);
      setGalleryImages(content.gallery);
    });
    return () => { active = false; };
  }, []);

  return <>
    <HomeHero featuredTour={featuredTours[0]} />

    <section className="section-pad pt-32"><div className="site-container"><SectionHeading eyebrow="Find your kind of holiday" title="Travel experiences for every dream" description="From easy family escapes to deeply personal journeys, choose a travel style that feels right for you." /><RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{tourCategories.map((category) => { const Icon = categoryIcons[category.icon]; return <motion.div variants={springCard} whileHover={reduceMotion ? undefined : { y: -8, rotate: 0.7 }} key={category.title}><Link to={category.path} className="group block h-full rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"><span className={`grid h-13 w-13 place-items-center rounded-2xl text-white ${category.color}`}><Icon size={24} /></span><h3 className="mt-5 font-display text-xl font-bold text-deep-navy">{category.title}</h3><p className="mt-2 text-sm leading-6 text-dark-text/60">{category.subtitle}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest-green">Explore <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span></Link></motion.div>; })}</RevealGrid></div></section>

    <section className="section-pad bg-white"><div className="site-container"><SectionHeading eyebrow="Guest favourites" title="Featured tour packages" description="Curated journeys that bring together iconic sights, comfortable stays and the right amount of time to enjoy each place." /><RevealGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredTours.slice(0, 3).map((tour) => <motion.div variants={springCard} key={tour.slug}><TourCard tour={tour} /></motion.div>)}</RevealGrid><div className="mt-10 text-center"><Link to="/tours" className="button-secondary">View All Tours <ArrowRight size={17} /></Link></div></div></section>

    <UpcomingTours />

    <section className="section-pad"><div className="site-container"><SectionHeading eyebrow="Across incredible India" title="Popular Indian destinations" description="Mountains, beaches, culture and quiet corners—there is always another side of India waiting to be explored." /><RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{destinations.map((destination, index) => <motion.div variants={springCard} whileHover={reduceMotion ? undefined : { scale: 1.025 }} key={destination.name} className={index < 2 ? "lg:col-span-2" : ""}><DestinationCard destination={{ ...destination, image: destinationPhotoMap[index] }} large={index < 2} /></motion.div>)}</RevealGrid></div></section>

    <section className="section-pad bg-[#edf4ef]"><div className="site-container"><SectionHeading eyebrow="Closer to home" title="Maharashtra special tours" description="Coastal roads, ancient caves, sacred temples and scenic hill stations—rediscover the beauty in our own backyard." /><RevealGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{maharashtraTours.map((tour, index) => <motion.div variants={springCard} key={tour.slug}><TourCard tour={{ ...tour, image: maharashtraPhotoMap[index] }} /></motion.div>)}</RevealGrid></div></section>

    <section className="section-pad overflow-hidden bg-white"><div className="site-container grid items-center gap-12 lg:grid-cols-2"><motion.div variants={springCard} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="relative"><div className="overflow-hidden rounded-[2rem]"><img src="/assets/gallery/group-outings/group-outing-02.jpeg" alt="Sangaurii travellers enjoying a group tour" className="min-h-[430px] w-full object-cover" /></div><div className="absolute -bottom-6 right-4 rounded-2xl bg-golden-orange p-5 text-deep-navy shadow-xl sm:right-[-24px]"><strong className="block font-display text-3xl">Made with care</strong><span className="text-sm font-semibold">From first call to homecoming</span></div></motion.div><motion.div variants={springCard} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><SectionHeading align="left" eyebrow="About Sangaurii" title="Travel planning that feels personal" description="At Sangaurii Tours and Travels, we believe a great holiday begins by listening. We understand who you are travelling with, what matters to you and how you want the journey to feel." /><p className="-mt-5 leading-7 text-dark-text/65">Our team brings destinations, stays, transport and local experiences together into a smooth itinerary—with friendly support before, during and after your trip.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><span className="inline-flex items-center gap-3 font-semibold text-deep-navy"><HeartHandshake className="text-golden-orange" /> Warm, personal service</span><span className="inline-flex items-center gap-3 font-semibold text-deep-navy"><MapPinned className="text-golden-orange" /> Carefully planned routes</span></div><Link to="/about" className="button-primary mt-8">Our Story <ArrowRight size={17} /></Link></motion.div></div></section>

    <section className="section-pad bg-deep-navy"><div className="site-container"><SectionHeading light eyebrow="Why travel with us" title="Comfort in every part of your journey" description="Reliable planning and genuine care so you can spend less time coordinating and more time making memories." /><RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck, "Trusted Planning", "Clear itineraries and reliable partners selected with care."], [UsersRound, "Family First", "Comfortable pacing for children, parents and senior travellers."], [Headphones, "Travel Support", "A helpful team within reach throughout your holiday."], [Award, "Local Expertise", "Practical recommendations shaped by destination knowledge."]].map(([Icon, title, text]) => <motion.div variants={springCard} key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white"><Icon className="text-warm-yellow" size={30} /><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p></motion.div>)}</RevealGrid></div></section>

    <section className="bg-golden-orange py-10"><RevealGrid className="site-container grid grid-cols-2 gap-7 lg:grid-cols-4"><CountUpStat Icon={MapPinned} value={50} label="Destinations" /><CountUpStat Icon={UsersRound} value={1200} label="Happy Travellers" /><CountUpStat Icon={Bus} value={150} label="Tours Planned" /><CountUpStat Icon={Star} value={49} suffix="/ 5" label="Guest Rating" /></RevealGrid></section>

    <section className="section-pad"><div className="site-container"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={springCard} className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(125deg,#0f172a,#1e293b_55%,#0f172a)] px-6 py-14 text-white shadow-2xl shadow-slate-900/20 sm:px-10 lg:px-16"><div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-warm-yellow">Bespoke trip planning</span><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">Have a destination in mind? Let’s shape the perfect trip.</h2><p className="mt-4 max-w-2xl text-white/75">Share your dates, interests and travel style. We’ll create a thoughtful itinerary around you.</p></div><Button type="button" onClick={openEnquiryModal} variant="accent" className="whitespace-nowrap shadow-lg shadow-black/20">Start My Enquiry <ArrowRight size={18} /></Button></div></motion.div></div></section>

    <section className="section-pad bg-white"><div className="site-container"><SectionHeading eyebrow="Traveller stories" title="Memories shared by our guests" description="The kind words that inspire us to make every journey even more thoughtful." /><TestimonialCarousel testimonials={testimonials.slice(0, 3)} /></div></section>
    <section className="section-pad"><div className="site-container"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading align="left" eyebrow="Travel moments" title="A glimpse from the road" description="Landscapes, landmarks and little moments that make every journey special." /><Link to="/gallery" className="button-secondary mb-10 shrink-0">View Gallery <ArrowRight size={16} /></Link></div><GalleryGrid images={galleryImages} /></div></section>
    <section className="section-pad bg-[#edf4ef]"><div className="site-container"><SectionHeading eyebrow="From our travel desk" title="Ideas and guides for better holidays" description="Useful tips, destination inspiration and simple planning advice for your next journey." /><RevealGrid className="grid gap-6 md:grid-cols-3">{blogs.slice(0, 3).map((post) => <motion.div variants={springCard} key={post.slug}><BlogCard post={post} /></motion.div>)}</RevealGrid></div></section>
    <section className="bg-deep-navy py-14 text-white"><div className="site-container grid items-center gap-8 lg:grid-cols-[1fr_1fr]"><div><span className="text-xs font-bold uppercase tracking-[0.2em] text-warm-yellow">Travel inspiration, delivered</span><h2 className="mt-3 font-display text-3xl font-bold">Stay close to your next adventure</h2><p className="mt-3 text-white/65">Receive destination ideas, seasonal tours and useful travel tips.</p></div><NewsletterForm /></div></section>
  </>;
}

export default HomePage;
