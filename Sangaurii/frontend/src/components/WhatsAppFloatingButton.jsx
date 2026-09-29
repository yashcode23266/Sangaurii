import React, { useState, useEffect } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function WhatsAppFloatingButton() {
  const number = (import.meta.env.VITE_WHATSAPP_NUMBER || "917498045445").replace(/\D/g, "");
  const [showPrompt, setShowPrompt] = useState(false);
  const [closedPrompt, setClosedPrompt] = useState(false);

  useEffect(() => {
    // Show polite prompt after 2.5 seconds
    const timer = setTimeout(() => {
      if (!closedPrompt) setShowPrompt(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [closedPrompt]);

  const href = number
    ? `https://wa.me/${number}?text=${encodeURIComponent("Hello Sangaurii Tours and Travels, I would like to plan a trip.")}`
    : "/contact";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Friendly interactive concierge bubble */}
      <AnimatePresence>
        {showPrompt && !closedPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="pointer-events-auto relative max-w-[280px] bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 text-slate-800"
          >
            <button
              type="button"
              onClick={() => setClosedPrompt(true)}
              aria-label="Close notification"
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100"
            >
              <X size={13} />
            </button>
            <div className="flex items-start gap-2.5 pr-4">
              <span className="relative flex h-3 w-3 shrink-0 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-xs font-bold text-[#111827] flex items-center gap-1">
                  <span>Sangaurii Concierge</span>
                  <Sparkles size={11} className="text-[#F4A228]" />
                </p>
                <p className="text-[0.75rem] text-slate-600 mt-0.5 leading-snug">
                  Need quick holiday planning or custom car rental quotes? Chat with us live!
                </p>
              </div>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-2.5 block text-center w-full bg-[#184829] hover:bg-[#12361e] text-white text-[0.72rem] font-bold py-1.5 px-3 rounded-xl transition-colors shadow-xs"
            >
              Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing WhatsApp CTA Button */}
      {number ? (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl transition-all duration-300 animate-radar"
          aria-label="Chat with Sangaurii Tours and Travels on WhatsApp"
        >
          <MessageCircle size={28} fill="currentColor" />
        </motion.a>
      ) : (
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="pointer-events-auto relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl"
        >
          <Link to="/contact" aria-label="Contact Sangaurii">
            <MessageCircle size={28} fill="currentColor" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default WhatsAppFloatingButton;

