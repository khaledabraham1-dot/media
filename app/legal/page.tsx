import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function LegalPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-heading text-[3rem] max-md:text-[2.2rem] font-extrabold leading-[1.1] text-navy mb-8">
          Mentions légales
        </h1>
        <div className="font-serif text-[1.1rem] leading-relaxed text-text space-y-6">
          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Éditeur</h2>
          <p>
            Le site Ligne Rouge est édité par Ligne Rouge Media.<br />
            Siège social : Dakar, Sénégal<br />
            Email : contact@lignerouge.media
          </p>
          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Directeur de la publication</h2>
          <p>Ligne Rouge Media</p>
          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA
          </p>
          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, vidéos, graphismes, logo,
            icônes, etc.) est protégé par le droit d&apos;auteur et le droit de la propriété
            intellectuelle. Toute reproduction, même partielle, est soumise à autorisation
            préalable.
          </p>
        </div>
      </div>
    </div>
  );
}
