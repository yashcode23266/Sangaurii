import { Quote, Star } from "lucide-react";

function TestimonialCard({ testimonial }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <Quote className="mb-5 text-golden-orange/35" size={38} fill="currentColor" />
      <div className="mb-4 flex gap-1 text-golden-orange" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }, (_, index) => <Star key={index} size={16} fill="currentColor" />)}
      </div>
      <p className="flex-1 leading-7 text-dark-text/70">“{testimonial.text}”</p>
      <div className="mt-6 border-t border-black/5 pt-4"><h3 className="font-bold text-deep-navy">{testimonial.name}</h3><p className="mt-1 text-sm text-medium-blue">{testimonial.trip}</p></div>
    </article>
  );
}

export default TestimonialCard;
