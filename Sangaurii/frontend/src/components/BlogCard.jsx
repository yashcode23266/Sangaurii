import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <article className="card group overflow-hidden">
      <div className="h-52 overflow-hidden"><img src={post.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold"><span className="uppercase tracking-wider text-golden-orange">{post.category}</span><span className="inline-flex items-center gap-1 text-dark-text/45"><CalendarDays size={13} /> {post.date}</span></div>
        <h3 className="font-display text-xl font-bold leading-snug text-deep-navy">{post.title}</h3>
        <Link to={`/blogs/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-medium-blue">Read Article <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
}

export default BlogCard;
