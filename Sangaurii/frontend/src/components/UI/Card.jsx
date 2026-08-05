import { forwardRef } from "react";

const Card = forwardRef(function Card({ as: Component = "article", className = "", children, ...props }, ref) {
  return <Component ref={ref} className={`card card-lift ${className}`.trim()} {...props}>{children}</Component>;
});

export default Card;
