import { Link } from "react-router-dom";

const variants = {
  primary: "button-primary",
  accent: "button-accent",
  secondary: "button-secondary",
  light: "button-outline-light",
};

function Button({ as, to, variant = "primary", className = "", children, ...props }) {
  const classes = `${variants[variant]} ${className}`.trim();
  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  const Component = as || "button";
  return <Component className={classes} {...props}>{children}</Component>;
}

export default Button;
