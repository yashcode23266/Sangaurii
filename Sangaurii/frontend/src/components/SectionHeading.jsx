function SectionHeading({ eyebrow, title, description, align = "center", light = false }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment} mb-10`}>
      {eyebrow && <span className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-warm-yellow" : "text-golden-orange"}`}>{eyebrow}</span>}
      <h2 className={`max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl ${light ? "text-white" : "text-deep-navy"}`}>{title}</h2>
      {description && <p className={`mt-4 max-w-2xl leading-7 ${light ? "text-white/75" : "text-dark-text/65"}`}>{description}</p>}
    </div>
  );
}

export default SectionHeading;
