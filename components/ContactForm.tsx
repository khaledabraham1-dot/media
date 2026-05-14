"use client";

export function ContactForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Nom complet</label>
          <input
            type="text"
            className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-white"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-white"
            placeholder="votre@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Sujet</label>
        <input
          type="text"
          className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-white"
          placeholder="Objet de votre message"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Message</label>
        <textarea
          rows={6}
          className="w-full border border-border rounded px-4 py-3 text-sm outline-none focus:border-navy transition-colors bg-white resize-none"
          placeholder="Votre message..."
        />
      </div>
      <button
        type="submit"
        className="bg-red text-white font-bold px-8 py-3 rounded transition-colors hover:bg-red2"
      >
        Envoyer le message
      </button>
    </form>
  );
}
