"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 bg-navy text-white text-center">
      <div className="max-w-[600px] mx-auto px-6">
        <span className="text-[0.7rem] font-bold tracking-[0.12em] uppercase text-red block mb-4">
          Newsletter
        </span>
        <h2 className="font-heading text-[2.2rem] max-md:text-[1.6rem] font-bold leading-[1.2] mb-4">
          L&apos;information, directement chez vous
        </h2>
        <p className="text-base text-white/70 mb-8">
          Recevez chaque matin les articles les plus importants sélectionnés par
          la rédaction de Ligne Rouge.
        </p>

        {status === "success" ? (
          <div className="bg-white/10 rounded p-4 text-sm">
            Merci pour votre inscription ! Vous recevrez bientôt nos actualités.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex max-md:flex-col gap-3 max-w-[480px] mx-auto mb-4"
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/5 border border-white/15 rounded px-5 py-3.5 text-white font-body outline-none transition-colors focus:border-red placeholder:text-white/40"
              aria-label="Votre adresse email"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-red text-white font-bold px-7 py-3.5 rounded transition-colors hover:bg-red2 disabled:opacity-60"
            >
              {status === "loading" ? "..." : "S'abonner"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-[0.8rem] text-red mt-2">
            Une erreur est survenue. Veuillez réessayer.
          </p>
        )}

        <p className="text-[0.75rem] text-white/50">
          En vous abonnant, vous acceptez notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
}
