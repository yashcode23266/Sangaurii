import { useState } from "react";

function BrandLogo({ className = "h-14 w-14", markClassName = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`${className} ${markClassName} grid shrink-0 place-items-center rounded-full bg-forest-green font-display text-lg font-bold text-warm-yellow`}>
        ST
      </span>
    );
  }

  return (
    <img
      src="/assets/sangaurii-logo.jpeg"
      alt="Sangaurii Tours and Travels logo"
      className={`${className} shrink-0 object-contain`}
      onError={() => setFailed(true)}
    />
  );
}

export default BrandLogo;
