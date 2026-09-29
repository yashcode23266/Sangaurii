import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "./UI/Card";

function BlogCard({ post }) {
  return (
    <Card className="group overflow-hidden">
      <div className="aspect-4/3 overflow-hidden"><img src={post.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /></div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold"><span className="uppercase tracking-wider text-golden-orange">{post.category}</span><span className="inline-flex items-center gap-1 text-dark-text/45"><CalendarDays size={13} /> {post.date}</span></div>
        <h3 className="line-clamp-2 font-display text-xl font-bold leading-snug text-slate-900">{post.title}</h3>
        <Link to={`/blogs/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest-green">Read Article <ArrowRight size={15} /></Link>
      </div>
    </Card>
  );
}

export default BlogCard;
