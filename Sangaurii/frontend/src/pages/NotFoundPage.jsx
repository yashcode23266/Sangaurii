import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function NotFoundPage() {
  return (
    <section className="site-container min-h-[60vh] py-20">
      <EmptyState title="Page not found" message="The page you requested may have moved or does not exist." />
      <div className="mt-6 text-center"><Link to="/" className="button-primary"><ArrowLeft size={17} /> Return Home</Link></div>
    </section>
  );
}

export default NotFoundPage;
