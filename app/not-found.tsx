import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center bg-white">
      <div className="max-w-lg mx-auto px-6">
        <div className="font-heading text-[6rem] font-extrabold text-navy/10 leading-none mb-4">
          404
        </div>
        <h1 className="font-heading text-2xl font-bold text-navy mb-4">
          Page introuvable
        </h1>
        <p className="text-text2 mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex bg-red text-white font-semibold px-6 py-3 rounded transition-colors hover:bg-red2"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
