import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
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
      setMessage(response.message);
      setEmail("");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" className="min-h-12 flex-1 rounded-xl px-4 text-dark-text outline-none" />
        <button disabled={loading} className="button-accent justify-center">{loading ? "Subscribing…" : "Subscribe"} {!loading && <ArrowRight size={17} />}</button>
      </form>
      {message && <p className="mt-3 inline-flex items-center gap-2 text-sm text-green-300" role="status"><CheckCircle2 size={16} />{message}</p>}
      {error && <p className="mt-3 text-sm text-red-300" role="alert">{error}</p>}
    </div>
  );
}

export default NewsletterForm;
