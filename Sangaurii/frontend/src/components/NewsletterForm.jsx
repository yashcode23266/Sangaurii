import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { subscribeNewsletter } from "../services/contentService";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await subscribeNewsletter(email);
      setMessage(response.message || "Thank you for subscribing!");
      setEmail("");
    } catch (submitError) {
      setError(submitError.message || "Failed to subscribe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-2 rounded-2xl bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-lg sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <div className="flex-1 flex items-center gap-2 px-3">
          <Mail size={16} className="text-[#F4A228] shrink-0" />
          <input
            id="newsletter-email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address..."
            className="w-full min-h-[46px] text-white placeholder-slate-400 bg-transparent text-sm outline-none font-medium"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-[#F4A228] text-[#111827] hover:bg-[#E5931C] font-bold text-xs px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md shrink-0 inline-flex items-center gap-2 justify-center"
        >
          <span>{loading ? "Subscribing..." : "Subscribe"}</span>
          {!loading && <ArrowRight size={14} />}
        </button>
      </form>
      {message && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#F4A228]" role="status">
          <CheckCircle2 size={15} />
          {message}
        </p>
      )}
      {error && (
        <p className="mt-3 text-xs font-semibold text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default NewsletterForm;
