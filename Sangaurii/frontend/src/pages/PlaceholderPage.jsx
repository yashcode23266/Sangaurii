import { MapPinned } from "lucide-react";
import PageHero from "../components/PageHero";

function PlaceholderPage({ title }) {
  return (
    <>
      <PageHero eyebrow="Sangaurii Tours and Travels" title={title} description={`Explore ${title.toLowerCase()} with Sangaurii Tours and Travels.`} />
      <section className="site-container flex min-h-[32vh] items-center py-16 sm:py-24"><div>
        <MapPinned className="mb-5 text-golden-orange" size={36} />
        <p className="mb-2 font-semibold text-medium-blue">
          Sangaurii Tours and Travels
        </p>
        <h1 className="text-4xl font-bold text-deep-navy">{title}</h1>
        <p className="mt-4 max-w-xl text-dark-text/70">
          This page is ready for the next design and content phase.
        </p>
      </div></section>
    </>
  );
}

export default PlaceholderPage;
