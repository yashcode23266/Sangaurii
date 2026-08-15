import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-serif text-3xl sm:text-4xl font-extrabold text-[#111827]">
      {count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

function TrustStrip() {
  const stats = [
    {
      value: 12000,
      suffix: "+",
      label: "Happy Travelers",
    },
    {
      value: 150,
      suffix: "+",
      label: "Curated Routes",
    },
    {
      value: 10,
      suffix: "+ Years",
      label: "Industry Experience",
    },
    {
      value: 24,
      suffix: "/7",
      label: "Concierge Support",
    },
  ];

  return (
    <div className="py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="site-container grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center ${
              idx > 0 ? "pt-6 sm:pt-0 sm:pl-4" : ""
            }`}
          >
            <Counter end={stat.value} suffix={stat.suffix} />
            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustStrip;
