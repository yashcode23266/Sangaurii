import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Award, BadgeCheck, Bus, Globe2, Headphones, HeartHandshake,
  Landmark, MapPinned, ShieldCheck, SlidersHorizontal, Sparkles, Star, UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import DestinationCard from "../components/DestinationCard";
import NewsletterForm from "../components/NewsletterForm";
import SearchToursForm from "../components/SearchToursForm";
import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import TourCard from "../components/TourCard";
import {
  blogs as fallbackBlogs, destinations, featuredTours as fallbackFeaturedTours,
  galleryImages as fallbackGallery, maharashtraTours,
  testimonials as fallbackTestimonials, tourCategories,
} from "../data/homeData";
import { getPublicContent } from "../services/contentService";
import { getFeaturedTours } from "../services/tourService";
import { openEnquiryModal } from "../utils/enquiry";

const categoryIcons = { Landmark, Globe2, Sparkles, SlidersHorizontal };

function HomePage() {
  const reduceMotion = useReducedMotion();
  const [featuredTours, setFeaturedTours] = useState(fallbackFeaturedTours);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [galleryImages, setGalleryImages] = useState(fallbackGallery);
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.55 } };

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

  return (
    <>
      <section className="hero-section relative isolate min-h-[720px] overflow-hidden text-white lg:min-h-[760px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,35,21,.92)_0%,rgba(16,53,32,.68)_48%,rgba(16,53,32,.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(248,198,61,.18),transparent_25%)]" />
        <div className="site-container relative z-10 flex min-h-[620px] items-center py-20 lg:min-h-[650px]">
          <motion.div {...(reduceMotion ? {} : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7 } })} className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"><Sparkles size={16} className="text-warm-yellow" /> Thoughtfully planned holidays</div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">Journeys That <span className="text-warm-yellow">Stay With You</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">Explore beautiful destinations across India and around the world with thoughtfully planned holidays by Sangaurii Tours and Travels.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/tours" className="button-accent">Explore Tours <ArrowRight size={18} /></Link>
              <button type="button" onClick={openEnquiryModal} className="button-outline-light">Plan My Trip</button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-2"><BadgeCheck className="text-warm-yellow" size={18} /> Personalized itineraries</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck className="text-warm-yellow" size={18} /> Trusted local support</span>
              <span className="inline-flex items-center gap-2"><BadgeCheck className="text-warm-yellow" size={18} /> Family-friendly travel</span>
            </div>
          </motion.div>
        </div>
        <div className="site-container relative z-20 -mb-20"><SearchToursForm /></div>
      </section>

      <section className="section-pad pt-32">
        <div className="site-container">
          <SectionHeading eyebrow="Find your kind of holiday" title="Travel experiences for every dream" description="From easy family escapes to deeply personal journeys, choose a travel style that feels right for you." />
          <motion.div {...reveal} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tourCategories.map((category) => {
              const Icon = categoryIcons[category.icon];
              return <Link key={category.title} to={category.path} className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className={`grid h-13 w-13 place-items-center rounded-2xl text-white ${category.color}`}><Icon size={24} /></span>
                <h3 className="mt-5 font-display text-xl font-bold text-deep-navy">{category.title}</h3><p className="mt-2 text-sm leading-6 text-dark-text/60">{category.subtitle}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest-green">Explore <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
              </Link>;
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <SectionHeading eyebrow="Guest favourites" title="Featured tour packages" description="Curated journeys that bring together iconic sights, comfortable stays and the right amount of time to enjoy each place." />
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredTours.slice(0, 3).map((tour) => <TourCard key={tour.slug} tour={tour} />)}</motion.div>
          <div className="mt-10 text-center"><Link to="/tours" className="button-secondary">View All Tours <ArrowRight size={17} /></Link></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <SectionHeading eyebrow="Across incredible India" title="Popular Indian destinations" description="Mountains, beaches, culture and quiet corners—there is always another side of India waiting to be explored." />
          <motion.div {...reveal} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => <div key={destination.name} className={index < 2 ? "lg:col-span-2" : ""}><DestinationCard destination={destination} large={index < 2} /></div>)}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-[#edf4ef]">
        <div className="site-container">
          <SectionHeading eyebrow="Closer to home" title="Maharashtra special tours" description="Coastal roads, ancient caves, sacred temples and scenic hill stations—rediscover the beauty in our own backyard." />
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{maharashtraTours.map((tour) => <TourCard key={tour.slug} tour={tour} />)}</motion.div>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-white">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...reveal} className="relative">
            <div className="overflow-hidden rounded-[2rem]"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=85" alt="Family enjoying a holiday together" className="min-h-[430px] w-full object-cover" /></div>
            <div className="absolute -bottom-6 right-4 rounded-2xl bg-golden-orange p-5 text-deep-navy shadow-xl sm:right-[-24px]"><strong className="block font-display text-3xl">Made with care</strong><span className="text-sm font-semibold">From first call to homecoming</span></div>
          </motion.div>
          <motion.div {...reveal}>
            <SectionHeading align="left" eyebrow="About Sangaurii" title="Travel planning that feels personal" description="At Sangaurii Tours and Travels, we believe a great holiday begins by listening. We understand who you are travelling with, what matters to you and how you want the journey to feel." />
            <p className="-mt-5 leading-7 text-dark-text/65">Our team brings destinations, stays, transport and local experiences together into a smooth itinerary—with friendly support before, during and after your trip.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <span className="inline-flex items-center gap-3 font-semibold text-deep-navy"><HeartHandshake className="text-golden-orange" /> Warm, personal service</span>
              <span className="inline-flex items-center gap-3 font-semibold text-deep-navy"><MapPinned className="text-golden-orange" /> Carefully planned routes</span>
            </div>
            <Link to="/about" className="button-primary mt-8">Our Story <ArrowRight size={17} /></Link>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-deep-navy">
        <div className="site-container">
          <SectionHeading light eyebrow="Why travel with us" title="Comfort in every part of your journey" description="Reliable planning and genuine care so you can spend less time coordinating and more time making memories." />
          <motion.div {...reveal} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "Trusted Planning", "Clear itineraries and reliable partners selected with care."],
              [UsersRound, "Family First", "Comfortable pacing for children, parents and senior travellers."],
              [Headphones, "Travel Support", "A helpful team within reach throughout your holiday."],
              [Award, "Local Expertise", "Practical recommendations shaped by destination knowledge."],
            ].map(([Icon, title, text]) => <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white"><Icon className="text-warm-yellow" size={30} /><h3 className="mt-5 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p></div>)}
          </motion.div>
        </div>
      </section>

      <section className="bg-golden-orange py-10">
        <div className="site-container grid grid-cols-2 gap-7 text-center text-deep-navy lg:grid-cols-4">
          {[[MapPinned, "50+", "Destinations"], [UsersRound, "1,200+", "Happy Travellers"], [Bus, "150+", "Tours Planned"], [Star, "4.9/5", "Guest Rating"]].map(([Icon, number, label]) => <div key={label}><Icon className="mx-auto mb-2" size={26} /><strong className="block font-display text-3xl font-bold sm:text-4xl">{number}</strong><span className="mt-1 block text-sm font-semibold">{label}</span></div>)}
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <motion.div {...reveal} className="relative overflow-hidden rounded-[2rem] bg-forest-green px-6 py-14 text-white sm:px-10 lg:px-16">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-warm-yellow/15" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-warm-yellow">Made just for you</span><h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">Have a destination in mind? Let’s shape the perfect trip.</h2><p className="mt-4 max-w-2xl text-white/70">Share your dates, interests and travel style. We’ll create a thoughtful itinerary around you.</p></div>
              <button type="button" onClick={openEnquiryModal} className="button-accent whitespace-nowrap">Start My Enquiry <ArrowRight size={18} /></button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="site-container">
          <SectionHeading eyebrow="Traveller stories" title="Memories shared by our guests" description="The kind words that inspire us to make every journey even more thoughtful." />
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-3">{testimonials.slice(0, 3).map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}</motion.div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading align="left" eyebrow="Travel moments" title="A glimpse from the road" description="Landscapes, landmarks and little moments that make every journey special." /><Link to="/gallery" className="button-secondary mb-10 shrink-0">View Gallery <ArrowRight size={16} /></Link></div>
          <motion.div {...reveal} className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4">
            {galleryImages.slice(0, 5).map((image, index) => <div key={image.src} className={`overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 row-span-2" : index === 3 ? "md:col-span-2" : ""}`}><img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-700 hover:scale-105" /></div>)}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-[#edf4ef]">
        <div className="site-container">
          <SectionHeading eyebrow="From our travel desk" title="Ideas and guides for better holidays" description="Useful tips, destination inspiration and simple planning advice for your next journey." />
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-3">{blogs.slice(0, 3).map((post) => <BlogCard key={post.slug} post={post} />)}</motion.div>
        </div>
      </section>

      <section className="bg-deep-navy py-14 text-white">
        <div className="site-container grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
          <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-warm-yellow">Travel inspiration, delivered</span><h2 className="mt-3 font-display text-3xl font-bold">Stay close to your next adventure</h2><p className="mt-3 text-white/65">Receive destination ideas, seasonal tours and useful travel tips.</p></div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

export default HomePage;
