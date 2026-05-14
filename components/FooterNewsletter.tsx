"use client";

export function FooterNewsletter() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="votre@email.com"
        className="flex-1 bg-bg border border-border rounded px-3 py-2 text-sm outline-none focus:border-navy transition-colors"
        aria-label="Email pour newsletter"
      />
      <button
        type="submit"
        className="bg-red text-white font-semibold px-4 py-2 rounded text-sm transition-colors hover:bg-red2"
      >
        OK
      </button>
    </form>
  );
}
