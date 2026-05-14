import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez Ligne Rouge, plateforme d'information indépendante et premium.",
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-heading text-[3rem] max-md:text-[2.2rem] font-extrabold leading-[1.1] text-navy mb-8">
          À propos
        </h1>
        <div className="font-serif text-[1.15rem] leading-relaxed text-text space-y-6">
          <p>
            <strong>Ligne Rouge</strong> est une plateforme d&apos;information indépendante dédiée
            à la couverture rigoureuse de l&apos;actualité internationale, politique, économique,
            technologique, sportive et culturelle.
          </p>
          <p>
            Fondée avec la conviction que l&apos;information de qualité est un pilier essentiel
            de la démocratie, notre rédaction s&apos;engage à fournir des analyses approfondies,
            des enquêtes exclusives et une couverture factuelle des événements qui façonnent
            notre monde.
          </p>
          <h2 className="font-heading text-2xl font-bold text-navy !mt-12 !mb-4">Notre mission</h2>
          <p>
            Informer avec rigueur, analyser avec profondeur, et éclairer les débats publics
            avec indépendance. Nous croyons en un journalisme accessible, transparent et
            engagé au service de l&apos;intérêt général.
          </p>
          <h2 className="font-heading text-2xl font-bold text-navy !mt-12 !mb-4">Nos valeurs</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Indépendance éditoriale</strong> — Aucune pression extérieure n&apos;influence notre ligne éditoriale.</li>
            <li><strong>Rigueur factuelle</strong> — Chaque information est vérifiée et sourcée.</li>
            <li><strong>Pluralisme</strong> — Nous donnons la parole à toutes les perspectives.</li>
            <li><strong>Innovation</strong> — Nous adoptons les meilleures technologies pour vous informer.</li>
          </ul>
          <h2 className="font-heading text-2xl font-bold text-navy !mt-12 !mb-4">Contact</h2>
          <p>
            Pour toute question, suggestion ou partenariat, contactez-nous à{" "}
            <a href="mailto:contact@lignerouge.media" className="text-red hover:underline">
              contact@lignerouge.media
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
