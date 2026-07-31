import { Map } from "lucide-react";

function EmptyState({ title = "Nothing here yet", message = "New travel experiences are on their way." }) {
  return <div className="rounded-3xl border border-dashed border-forest-green/25 bg-white p-10 text-center"><Map className="mx-auto text-golden-orange" size={38} /><h3 className="mt-4 font-display text-xl font-bold text-deep-navy">{title}</h3><p className="mt-2 text-dark-text/60">{message}</p></div>;
}

export default EmptyState;
