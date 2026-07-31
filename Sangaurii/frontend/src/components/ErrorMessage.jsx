import { CircleAlert } from "lucide-react";

function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert"><CircleAlert className="shrink-0" size={20} /><p>{message}</p></div>;
}

export default ErrorMessage;
