import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

const defaultImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85";

function PageHero({ eyebrow, title, description, image = defaultImage }) {
  const reduceMotion = useReducedMotion();
  return <section className="relative isolate min-h-[420px] overflow-hidden bg-deep-navy text-white sm:min-h-[500px]">
    <img src={image} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,61,51,.94),rgba(10,61,51,.72)_54%,rgba(15,23,42,.55))]" />
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="site-container relative flex min-h-[420px] flex-col justify-center py-28 sm:min-h-[500px] sm:py-32">
      <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-xs font-medium text-white/75"><Link to="/" className="inline-flex items-center gap-1 transition hover:text-golden-orange"><Home size={14} /> Home</Link><ChevronRight size={13} /><span aria-current="page">{title}</span></nav>
      {eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-golden-orange">{eyebrow}</p>}
      <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl">{title}</h1>
      {description && <p className="mt-5 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">{description}</p>}
    </motion.div>
  </section>;
}

export default PageHero;
