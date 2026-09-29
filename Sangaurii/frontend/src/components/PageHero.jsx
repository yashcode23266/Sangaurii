import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function PageHero({ eyebrow, title, description, bgImage }) {
  return (
    <section className="relative bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden">
      {/* Background Overlay with subtle scale animation */}
      {bgImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#1C4E8A]/90 to-[#184829]/90 z-0 opacity-90" />
      )}

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#F4A228]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content with Framer Motion Stagger */}
      <div className="site-container relative z-10">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-300"
        >
          <Link to="/" aria-label="Home" className="hover:text-[#F4A228] transition-colors flex items-center gap-1">
            <Home size={14} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#F4A228]">{title}</span>
        </motion.div>

        {/* Eyebrow Pill */}
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[0.7rem] font-extrabold uppercase tracking-widest bg-white/10 text-[#F4A228] border border-white/15 mb-3.5 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={12} className="text-[#F4A228]" />
            <span>{eyebrow}</span>
          </motion.span>
        )}

        {/* Title & Description */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white drop-shadow-md"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200 font-normal"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export default PageHero;

