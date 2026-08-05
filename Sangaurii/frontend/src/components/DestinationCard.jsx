import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { gsap, motionSafe } from "../utils/gsapUtils";

function DestinationCard({ destination, large = false }) {
  const ref = useRef();
  useGSAP(() => {
    if (!motionSafe()) return;
    const card = ref.current;
    const enter = () => gsap.to(card, { y: -5, duration: .35, ease: "power2.out" });
    const leave = () => gsap.to(card, { y: 0, duration: .45, ease: "power3.out" });
    card.addEventListener("pointerenter", enter); card.addEventListener("pointerleave", leave); return () => { card.removeEventListener("pointerenter", enter); card.removeEventListener("pointerleave", leave); };
  }, { scope: ref });
  return (
    <Link ref={ref} to={`/tours?destination=${encodeURIComponent(destination.name)}`} className={`group relative block aspect-[4/3] overflow-hidden rounded-3xl shadow-sm will-change-transform ${large ? "lg:aspect-[16/9]" : ""}`}>
      <img src={destination.image} alt={destination.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/15 to-transparent transition duration-500 group-hover:from-deep-navy/95 group-hover:via-deep-navy/45" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
        <div><h3 className="origin-left font-display text-2xl font-bold transition duration-500 group-hover:scale-105">{destination.name}</h3><p className="mt-1 text-sm text-white/75 transition group-hover:text-white">{destination.count}</p></div>
        <span className="rounded-full bg-white/15 p-2.5 backdrop-blur transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-golden-orange"><ArrowUpRight size={19} /></span>
      </div>
    </Link>
  );
}

export default DestinationCard;
