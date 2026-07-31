import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Tour result pages">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} className="pagination-button" aria-label="Previous page"><ChevronLeft size={17} /></button>
      {Array.from({ length: pages }, (_, index) => index + 1).map((number) => <button type="button" key={number} onClick={() => onChange(number)} aria-current={page === number ? "page" : undefined} className={`pagination-button ${page === number ? "bg-forest-green text-white" : ""}`}>{number}</button>)}
      <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} className="pagination-button" aria-label="Next page"><ChevronRight size={17} /></button>
    </nav>
  );
}

export default Pagination;
