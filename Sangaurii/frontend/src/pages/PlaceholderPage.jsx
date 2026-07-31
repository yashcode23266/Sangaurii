import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";

function PlaceholderPage({ title }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[65vh] max-w-6xl items-center px-6 py-16"
    >
      <div>
        <MapPinned className="mb-5 text-golden-orange" size={36} />
        <p className="mb-2 font-semibold text-medium-blue">
          Sangaurii Tours and Travels
        </p>
        <h1 className="text-4xl font-bold text-deep-navy">{title}</h1>
        <p className="mt-4 max-w-xl text-dark-text/70">
          This page is ready for the next design and content phase.
        </p>
      </div>
    </motion.section>
  );
}

export default PlaceholderPage;
