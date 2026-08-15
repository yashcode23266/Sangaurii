import React from "react";

function SectionHeading({ eyebrow, title, description, align = "center", light = false }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment} mb-12`}>
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-2.5 ${
          light ? "text-[#F4A228]" : "text-[#184829]"
        }`}>
          {eyebrow}
        </span>
      )}

      <h2 className={`max-w-3xl font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
        light ? "text-white" : "text-[#111827]"
      }`}>
        {title}
      </h2>

      {description && (
        <p className={`mt-3.5 max-w-2xl text-sm sm:text-base leading-relaxed ${
          light ? "text-slate-200" : "text-[#64748B]"
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
