import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function WhatsAppFloatingButton() {
  const number = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (!number) {
    return <Link to="/contact" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1" aria-label="Contact Sangaurii Tours and Travels"><MessageCircle size={27} fill="currentColor" /></Link>;
  }
  const href = `https://wa.me/${number}?text=${encodeURIComponent("Hello Sangaurii Tours and Travels, I would like to plan a trip.")}`;

  return <a href={href} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:-translate-y-1" aria-label="Chat with Sangaurii Tours and Travels on WhatsApp"><MessageCircle size={27} fill="currentColor" /></a>;
}

export default WhatsAppFloatingButton;
