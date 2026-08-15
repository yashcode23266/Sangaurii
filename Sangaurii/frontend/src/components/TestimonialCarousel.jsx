import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";

function TestimonialCarousel({ testimonials }) {
  const reduceMotion = useReducedMotion();
  if (!testimonials.length) return null;
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
  const card = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } } };

  return <motion.div variants={reduceMotion ? undefined : container} initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.15 }} className="grid gap-5 md:grid-cols-3">
    {testimonials.map((item) => <motion.article variants={card} whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }} key={`${item.name}-${item.trip}`} className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[1.75rem] border border-forest-green/10 bg-[#f4f6ef] p-7 shadow-sm transition-shadow hover:shadow-xl">
      <Quote className="absolute -right-2 -top-2 text-golden-orange/15" size={100} fill="currentColor" />
      <div className="relative flex gap-1 text-golden-orange" aria-label={`${item.rating || 5} out of 5 stars`}>{Array.from({ length: item.rating || 5 }, (_, index) => <motion.span key={index} initial={reduceMotion ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.25 + index * 0.06 }}><Star size={17} fill="currentColor" /></motion.span>)}</div>
      <p className="relative mt-6 flex-1 font-display text-xl leading-relaxed text-deep-navy">“{item.text}”</p>
      <div className="relative mt-7 flex items-center gap-3 border-t border-forest-green/10 pt-5">{item.image ? <img src={item.image} alt="" className="h-11 w-11 rounded-full object-cover" /> : <span className="grid h-11 w-11 place-items-center rounded-full bg-forest-green font-bold text-warm-yellow">{item.name?.slice(0, 1)}</span>}<div><strong className="block text-deep-navy">{item.name}</strong><span className="text-sm text-dark-text/60">{item.trip}</span></div></div>
    </motion.article>)}
  </motion.div>;
}

export default TestimonialCarousel;
