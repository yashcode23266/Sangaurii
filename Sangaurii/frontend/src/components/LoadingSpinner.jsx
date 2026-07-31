function LoadingSpinner({ label = "Loading" }) {
  return <div className="flex items-center justify-center gap-3 py-12 text-forest-green" role="status"><span className="h-7 w-7 animate-spin rounded-full border-2 border-forest-green/20 border-t-forest-green" /><span className="text-sm font-semibold">{label}</span></div>;
}

export default LoadingSpinner;
