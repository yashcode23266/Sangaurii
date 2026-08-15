import React from "react";
import { Star, MapPin } from "lucide-react";

function TestimonialCard({ testimonial }) {
  const starsCount = testimonial.rating || 5;

  return (
    <article className="card-soft flex h-full flex-col p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex gap-1 text-[#F4A228] mb-4" aria-label={`${starsCount} out of 5 stars`}>
        {Array.from({ length: starsCount }, (_, index) => (
          <Star key={index} size={16} className="fill-[#F4A228] text-[#F4A228]" />
        ))}
      </div>

      {/* Review Text */}
      <p className="flex-1 text-sm leading-relaxed text-[#64748B] font-medium mb-6">
        “{testimonial.text}”
      </p>

      {/* Reviewer Info */}
      <div className="mt-auto border-t border-slate-100 pt-4 flex items-center gap-3">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1C4E8A] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0">
            {testimonial.name ? testimonial.name.charAt(0) : "S"}
          </div>
        )}
        <div>
          <h4 className="font-serif font-bold text-sm text-[#111827]">
            {testimonial.name}
          </h4>
          {testimonial.trip && (
            <p className="text-xs font-medium text-[#4A90E2] flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-[#184829]" />
              <span>{testimonial.trip}</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default TestimonialCard;
