import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, Clock3, MapPin, Sparkles } from "lucide-react";
import SearchToursForm from "../SearchToursForm";
import Button from "../UI/Button";
import Container from "../UI/Container";
import { openEnquiryModal } from "../../utils/enquiry";

const heroWords = ["Journeys", "That", "Stay", "With", "You"];
const benefits = ["Personalized itineraries", "Trusted local support", "Family-friendly travel"];

function HomeHero({ featuredTour }) {
  const reduceMotion = useReducedMotion();
  const price = typeof featuredTour?.price === "number" ? `₹${featuredTour.price.toLocaleString("en-IN")}` : featuredTour?.price;
  return <section className="relative isolate min-h-[720px] overflow-hidden text-white lg:min-h-[760px]">
    <div className="absolute -inset-8 bg-[radial-gradient(circle_at_78%_18%,rgba(249,115,22,.3),transparent_24%),radial-gradient(circle_at_80%_78%,rgba(56,189,248,.12),transparent_30%),linear-gradient(115deg,#0f172a_10%,#1e293b_55%,#0f172a_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,.3),rgba(15,23,42,.1))]" />
    <Container className="relative z-10 grid min-h-[620px] items-center gap-10 py-20 lg:min-h-[650px] lg:grid-cols-[1.05fr_.75fr]"><div className="max-w-3xl">
      <motion.div animate={reduceMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold shadow-lg shadow-black/10 backdrop-blur-xl"><Sparkles size={16} className="text-warm-yellow" /> Thoughtfully planned holidays</motion.div>
      <h1 className="font-display text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-7xl" aria-label="Journeys That Stay With You">{heroWords.map((word, index) => <span key={word} className="mr-[0.22em] inline-block overflow-hidden align-top"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.3, delay: index * 0.06 }} className={`inline-block ${word === "Stay" || word === "You" ? "text-warm-yellow" : ""}`}>{word}</motion.span></span>)}</h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">Explore beautiful destinations across India and around the world with thoughtfully planned holidays by Sangaurii Tours and Travels.</p>
      <div className="mt-8 flex flex-wrap gap-4"><Button to="/tours" variant="accent">Explore Tours <ArrowRight size={18} /></Button><Button type="button" onClick={openEnquiryModal} variant="light">Plan My Trip</Button></div>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">{benefits.map((item) => <span key={item} className="inline-flex items-center gap-2"><BadgeCheck className="text-warm-yellow" size={18} />{item}</span>)}</div>
    </div>{featuredTour && <motion.article initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.12 }} className="overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/95 text-dark-text shadow-2xl shadow-slate-950/30">
      <div className="relative aspect-[4/3] overflow-hidden"><img src={featuredTour.image} alt={featuredTour.title} loading="eager" fetchPriority="high" className="h-full w-full object-cover" /><span className="absolute left-4 top-4 rounded-full bg-forest-green px-3 py-1.5 text-xs font-bold text-white">Featured journey</span></div>
      <div className="p-6"><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-forest-green"><MapPin size={14} /> {featuredTour.location}</p><h2 className="mt-2 font-display text-2xl font-bold text-deep-navy">{featuredTour.title}</h2><div className="mt-4 flex items-center justify-between border-y border-slate-200 py-3 text-sm"><span className="inline-flex items-center gap-2 text-dark-text/65"><Clock3 size={15} className="text-golden-orange" /> {featuredTour.duration}</span><strong className="text-lg text-forest-green">{price}</strong></div><Button to={`/tours/${featuredTour.slug}`} variant="accent" className="mt-5 w-full">Book Now <ArrowRight size={17} /></Button></div>
    </motion.article>}</Container>
    <Container className="relative z-20 -mb-20"><div className="rounded-[1.75rem] border border-white/35 bg-white/55 p-1.5 shadow-2xl shadow-black/25 backdrop-blur-2xl"><SearchToursForm /></div></Container>
  </section>;
}

export default HomeHero;
