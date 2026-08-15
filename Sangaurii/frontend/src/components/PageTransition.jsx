import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, motionSafe } from "../utils/gsapUtils";

function PageTransition({ children }) {
  const ref = useRef();
  const { pathname } = useLocation();
  useGSAP(() => { if (motionSafe()) gsap.fromTo(ref.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .38, ease: "power2.out" }); }, [pathname]);
  return <div ref={ref}>{children}</div>;
}

export default PageTransition;
