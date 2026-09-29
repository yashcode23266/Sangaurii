import React from "react";
import { Marquee } from "./marquee";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Kulkarni",
    role: "Family Tour to Kashmir",
    body: "Sangaurii Tours arranged everything flawlessly. The houseboat stay in Srinagar, punctual driver, and scenic Pahalgam tour were unforgettable.",
    rating: 5,
  },
  {
    name: "Dr. Ananya Deshmukh",
    role: "Ashtavinayak Yatra",
    body: "Traveling with senior parents can be challenging, but Sangaurii made the sacred 8 Ganpati yatra so peaceful and comfortable.",
    rating: 5,
  },
  {
    name: "Vikram & Sneha Patil",
    role: "Kerala Backwaters & Munnar",
    body: "From airport pickup to the private tea plantation resort in Munnar, top notch hospitality and transparent pricing.",
    rating: 5,
  },
  {
    name: "Mahesh Joshi",
    role: "Innova Crysta Rental",
    body: "Booked an Innova for a 4-day outstation trip across Konkan. The vehicle was spotlessly clean and the driver was very courteous.",
    rating: 5,
  },
  {
    name: "Sunil Shinde",
    role: "Somnath & Girnar Parikrama",
    body: "Excellent pilgrimage coordination. Punctual darshan timings, comfortable hotel stays, and total peace of mind throughout Gujarat.",
    rating: 5,
  },
];

export function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-1">
      <Marquee pauseOnHover className="[--duration:35s]">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="relative w-80 sm:w-96 cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#111827]">
                  {review.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium">{review.role}</p>
              </div>
              <div className="flex text-[#F4A228]">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" stroke="none" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              &ldquo;{review.body}&rdquo;
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default TestimonialMarquee;
