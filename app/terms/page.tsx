import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
};

export default function TermsPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-heading text-[3rem] max-md:text-[2.2rem] font-extrabold leading-[1.1] text-navy mb-8">
          Conditions générales d&apos;utilisation
        </h1>
        <div className="font-serif text-[1.1rem] leading-relaxed text-text space-y-6">
          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Objet</h2>
          <p>
            Les présentes conditions générales d&apos;utilisation régissent l&apos;accès et
            l&apos;utilisation du site Ligne Rouge. En accédant au site, vous acceptez
            sans réserve les présentes conditions.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Accès au service</h2>
          <p>
            L&apos;accès au site est gratuit. Ligne Rouge se réserve le droit de modifier
            ou d&apos;interrompre l&apos;accès au service à tout moment, sans préavis.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Contenu</h2>
          <p>
            Les articles, analyses et contenus publiés sur Ligne Rouge sont protégés
            par le droit d&apos;auteur. Toute reproduction non autorisée est interdite.
            Les opinions exprimées dans les articles engagent leurs auteurs.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Commentaires</h2>
          <p>
            Les commentaires sont soumis à modération. Tout commentaire contraire
            aux lois en vigueur, injurieux, diffamatoire ou hors sujet pourra être
            supprimé sans préavis.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Responsabilité</h2>
          <p>
            Ligne Rouge s&apos;efforce de fournir des informations exactes et à jour.
            Toutefois, la responsabilité de Ligne Rouge ne saurait être engagée en cas
            d&apos;erreur ou d&apos;omission dans les contenus publiés.
          </p>
        </div>
      </div>
    </div>
  );
}
