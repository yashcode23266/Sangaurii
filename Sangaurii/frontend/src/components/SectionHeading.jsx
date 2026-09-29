import React from "react";
import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title, description, align = "center", light = false, className = "" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${alignment} mb-6 sm:mb-8 ${className}`}
    >
      {eyebrow && (
        <span
          className={`text-xs font-extrabold uppercase tracking-[0.2em] mb-2.5 inline-flex items-center gap-1.5 ${
            light ? "text-[#F4A228]" : "text-[#184829]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F4A228] animate-pulse" />
          {eyebrow}
        </span>
      )}

      <h2
        className={`max-w-3xl font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? "text-white" : "text-[#111827]"
        }`}
      >
        {title}
      </h2>

      {/* Decorative animated accent bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 44, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="h-1 rounded-full bg-gradient-to-r from-[#F4A228] to-[#E5931C] mt-3.5 mb-1"
      />

      {description && (
        <p
          className={`mt-2.5 max-w-2xl text-sm sm:text-base leading-relaxed ${
            light ? "text-slate-200" : "text-[#64748B]"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;

