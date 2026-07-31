import { CheckCircle2 } from "lucide-react";

function FormSuccess({ title = "Enquiry received", message = "Thank you. Our travel team will contact you shortly." }) {
  return <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800" role="status"><CheckCircle2 size={28} /><h3 className="mt-3 font-display text-xl font-bold">{title}</h3><p className="mt-1 text-sm">{message}</p></div>;
}

export default FormSuccess;
