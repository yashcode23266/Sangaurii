function Container({ className = "", children }) {
  return <div className={`site-container ${className}`.trim()}>{children}</div>;
}

export default Container;
