import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-deep-navy py-14 text-white sm:py-16">
      <div className="site-container">
        <div className="mb-5 flex items-center gap-2 text-xs text-white/55"><Link to="/" aria-label="Home"><Home size={14} /></Link><ChevronRight size={13} /><span>{title}</span></div>
        {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-warm-yellow">{eyebrow}</p>}
        <h1 className="max-w-3xl font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl leading-7 text-white/70">{description}</p>}
      </div>
    </section>
  );
}

export default PageHero;
