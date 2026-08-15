import React, { useState } from "react";

/**
 * Sangaurii Tours & Travels Official Logo Component
 * Renders the official uploaded brand mark from /assets/sangaurii-logo.png
 * plus the company name in elegant Cinzel/Outfit luxury typography.
 */
function BrandLogo({
  className = "h-12 sm:h-14 lg:h-16",
  showText = true,
  darkText = false,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="inline-flex items-center gap-2.5 sm:gap-3.5 shrink-0 whitespace-nowrap group">
      {!failed ? (
        <img
          src="/assets/sangaurii-logo.png"
          alt="Sangaurii Tours and Travels logo"
          className={`${className} w-auto object-contain shrink-0 max-h-20 filter drop-shadow-sm animate-logo-slide transition-transform duration-300 group-hover:scale-105`}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="grid shrink-0 h-11 w-11 sm:h-13 sm:w-13 place-items-center rounded-2xl bg-[#184829] font-serif text-xl sm:text-2xl font-extrabold text-[#F4A228] shadow animate-logo-slide">
          SG
        </span>
      )}

      {showText && (
        <div className="flex flex-col text-left justify-center border-l-2 sm:border-l-[2.5px] border-[#F4A228] pl-2.5 sm:pl-3 shrink-0 whitespace-nowrap animate-divider-grow">
          <div className="flex flex-col animate-text-reveal">
            <span className={`font-['Cinzel'] font-black tracking-[0.06em] sm:tracking-[0.08em] uppercase leading-none whitespace-nowrap text-base sm:text-xl lg:text-[1.35rem] transition-colors duration-200 ${
              darkText ? "text-white" : "text-[#1C4E8A]"
            }`}>
              SANGAURII
            </span>
            <span className={`font-['Outfit'] text-[0.56rem] sm:text-[0.66rem] lg:text-[0.74rem] font-black tracking-[0.16em] sm:tracking-[0.20em] uppercase mt-1 sm:mt-1.5 whitespace-nowrap transition-colors duration-200 ${
              darkText ? "text-[#F4A228]" : "text-[#184829]"
            }`}>
              Tours &amp; Travels
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrandLogo;
