import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Compass, Award, Headphones } from "lucide-react";

function Counter({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const stepTime = Math.max(16, Math.floor(duration / 60));
    const stepValue = Math.ceil(end / 60);

    const timer = setInterval(() => {
      start += stepValue;
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
      icon: Users,
      value: 12000,
      suffix: "+",
      label: "Happy Travelers",
      color: "text-[#1C4E8A]",
      bg: "bg-[#1C4E8A]/10",
    },
    {
      icon: Compass,
      value: 150,
      suffix: "+",
      label: "Curated Routes",
      color: "text-[#184829]",
      bg: "bg-[#184829]/10",
    },
    {
      icon: Award,
      value: 10,
      suffix: "+ Years",
      label: "Experience",
      color: "text-[#F4A228]",
      bg: "bg-[#F4A228]/10",
    },
    {
      icon: Headphones,
      value: 24,
      suffix: "/7",
      label: "Concierge Support",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="py-10 sm:py-12 bg-white/75 backdrop-blur-md border-y border-slate-300/40 shadow-xs">
      <div className="site-container grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50/80 transition-colors"
            >
              <div className={`h-11 w-11 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-2.5 shadow-xs`}>
                <Icon size={20} />
              </div>
              <Counter end={stat.value} suffix={stat.suffix} />
              <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1.5">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default TrustStrip;

