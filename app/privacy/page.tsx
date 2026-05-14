import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-[820px] mx-auto px-6">
        <h1 className="font-heading text-[3rem] max-md:text-[2.2rem] font-extrabold leading-[1.1] text-navy mb-8">
          Politique de confidentialité
        </h1>
        <div className="font-serif text-[1.1rem] leading-relaxed text-text space-y-6">
          <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Collecte des données</h2>
          <p>
            La Ligne Rouge collecte uniquement les données nécessaires au fonctionnement
            du service : adresse email (newsletter), données de navigation anonymisées
            (analytics), et commentaires.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Utilisation des données</h2>
          <p>
            Vos données sont utilisées exclusivement pour : l&apos;envoi de la newsletter,
            l&apos;amélioration de l&apos;expérience utilisateur, et la modération des commentaires.
            Aucune donnée n&apos;est vendue à des tiers.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires au fonctionnement du service.
            Des cookies analytiques peuvent être utilisés de manière anonymisée pour améliorer
            nos contenus.
          </p>

          <h2 className="font-heading text-xl font-bold text-navy !mt-8">Vos droits</h2>
          <p>
            Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès,
            de rectification, de suppression et de portabilité de vos données personnelles.
            Pour exercer ces droits, contactez-nous à contact@lignerouge.media.
          </p>
        </div>
      </div>
    </div>
  );
}
