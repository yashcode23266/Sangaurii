import React from "react";

export function DaybreakLogo({ className = "" }) {
  return (
    <div className={`daybreak flex items-center gap-3 ${className}`}>
      <div className="wordmark flex flex-col">
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1C4E8A]">
          SANGAURII
        </span>
        <span className="text-[0.62rem] font-bold tracking-[0.25em] text-[#184829] uppercase">
          TOURS &amp; TRAVELS
        </span>
      </div>
    </div>
  );
}

export default DaybreakLogo;
