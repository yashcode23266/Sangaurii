import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, motionSafe } from "../utils/gsapUtils";

function AnimatedSection({ children, className = "", stagger = false }) {
  const ref = useRef();
  useGSAP(() => {
    if (!motionSafe()) return;
    const targets = stagger ? ref.current.querySelectorAll("[data-reveal-item]") : ref.current;
    gsap.from(targets, {
      opacity: 0, y: 28, duration: 0.72, ease: "power3.out",
      stagger: stagger ? 0.11 : 0,
      scrollTrigger: { trigger: ref.current, start: "top 86%", once: true },
    });
  }, { scope: ref });
  return <section ref={ref} className={className}>{children}</section>;
}

export default AnimatedSection;
