import React from "react";
import { Star } from "lucide-react";
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Marquee } from "@/components/ui/marquee";

const indianTestimonials = [
  {
    name: "Anjali & Sameer Kulkarni",
    role: "Jyotirlinga Darshan Yatra",
    content:
      "Every detail of our Yatra was handled with utmost care. The vehicle was clean, drivers were polite, and my elderly parents felt so comfortable throughout.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    name: "Meera Deshpande",
    role: "Malvan & Tarkarli Getaway",
    content:
      "Stunning coastal views! Visited Spatik Shivling & Golden Rock seamlessly. Transparent pricing with zero hidden charges. Highly recommended Sangaurii!",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    name: "Rohan Patil",
    role: "Girnar Parikrama & Somnath",
    content:
      "Punctual airport pickups, wonderful hotel bookings, and smooth temple darshans. Sangaurii Tours & Travels made our family pilgrimage memorable.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    name: "Vikram & Priya Joshi",
    role: "Kashmir Paradise Circuit",
    content:
      "7 Days in Kashmir with private luxury SUV and heritage houseboat stay in Srinagar. The team was available 24/7 on WhatsApp!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
  {
    name: "Suresh Kadam",
    role: "Ashtavinayak Group Rental",
    content:
      "Rented a Tempo Traveller for 12 family members to Ashtavinayak. Excellent vehicle condition, clean seats, and polite driver Gauri & Sangeeta ma'am coordinated well.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
  },
];

export const Component = () => {
  return (
    <div className="w-full overflow-hidden py-4">
      <Marquee pauseOnHover speed="normal">
        {indianTestimonials.map((testimonial, index) => (
          <LiquidCard key={index} className="mx-2 rounded-3xl w-80 sm:w-96 shrink-0 bg-white shadow-sm border border-slate-200/80">
            <CardContent className="p-6 py-4">
              <div className="mb-3 flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-11 w-11 object-cover rounded-full border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#111827]">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#184829]">{testimonial.role}</p>
                </div>
              </div>
              <p className="mb-3 text-xs text-slate-600 font-medium leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#F4A228] text-[#F4A228]"
                  />
                ))}
              </div>
            </CardContent>
          </LiquidCard>
        ))}
      </Marquee>
    </div>
  );
};

export default Component;
