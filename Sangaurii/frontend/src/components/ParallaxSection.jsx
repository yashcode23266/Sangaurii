import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Reusable Parallax Container Component
 * Adds scroll-driven motion to background images, text, and floating elements.
 */
function ParallaxSection({
  bgImage,
  overlayOpacity = "bg-sangaurii-blue/70",
  children,
  className = "",
  speed = 0.3,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate background Y movement based on scroll position
  const yShift = `${Math.round(speed * 40)}%`;
  const yBg = useTransform(scrollYProgress, [0, 1], [`-${yShift}`, yShift]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Scroll-driven Parallax Background Image */}
      {bgImage && (
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 -top-[15%] -bottom-[15%] w-full h-[130%] z-0"
        >
          <img
            src={bgImage}
            alt="Travel background"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      )}

      {/* Dark / Brand Color Overlay */}
      {overlayOpacity && (
        <div className={`absolute inset-0 z-10 ${overlayOpacity}`} />
      )}

      {/* Foreground Content */}
      <motion.div style={{ opacity: opacityText }} className="relative z-20">
        {children}
      </motion.div>
    </div>
  );
}

export default ParallaxSection;
