import { motion, useReducedMotion } from "framer-motion";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } } };

function RevealGrid({ className = "", children }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} variants={reduceMotion ? undefined : container} initial={reduceMotion ? false : "hidden"} whileInView={reduceMotion ? undefined : "visible"} viewport={{ once: true, amount: 0.15 }}>{children}</motion.div>;
}

function RevealItem({ className = "", children }) {
  return <motion.div variants={item} className={className}>{children}</motion.div>;
}

export { RevealItem };
export default RevealGrid;
