import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function DestinationCard({ destination, large = false }) {
  return (
    <Link to={`/tours?destination=${encodeURIComponent(destination.name)}`} className={`group relative overflow-hidden rounded-3xl ${large ? "min-h-[380px]" : "min-h-[260px]"}`}>
      <img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
        <div><h3 className="font-display text-2xl font-bold">{destination.name}</h3><p className="mt-1 text-sm text-white/75">{destination.count}</p></div>
        <span className="rounded-full bg-white/15 p-2.5 backdrop-blur transition group-hover:bg-golden-orange"><ArrowUpRight size={19} /></span>
      </div>
    </Link>
  );
}

export default DestinationCard;
