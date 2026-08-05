import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionSafe } from "../utils/gsapUtils";

function StatsCounter({ value, suffix = "+", label, Icon }) {
  const numberRef = useRef();
  useGSAP(() => {
    if (!motionSafe()) { numberRef.current.textContent = value; return; }
    const counter = { value: 0 };
    gsap.to(counter, { value, duration: 1.8, ease: "power2.out", scrollTrigger: { trigger: numberRef.current, start: "top 88%", once: true }, onUpdate: () => { numberRef.current.textContent = Math.round(counter.value).toLocaleString("en-IN"); } });
  }, { scope: numberRef });
  return <div data-reveal-item className="text-center text-deep-navy"><Icon className="mx-auto mb-2 text-forest-green" size={24} /><strong ref={numberRef} className="block font-display text-3xl font-bold sm:text-4xl">0</strong><span className="inline-block font-display text-3xl font-bold sm:text-4xl">{suffix}</span><span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em] text-deep-navy/65">{label}</span></div>;
}

export default StatsCounter;
