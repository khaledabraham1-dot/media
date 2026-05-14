import Link from "next/link";
import { FooterNewsletter } from "./FooterNewsletter";

const RUBRICS = [
  { name: "Actualité", href: "/category/actualite" },
  { name: "Politique", href: "/category/politique" },
  { name: "International", href: "/category/international" },
  { name: "Économie", href: "/category/economie" },
  { name: "Technologie", href: "/category/technologie" },
  { name: "Sport", href: "/category/sport" },
  { name: "Société", href: "/category/societe" },
  { name: "Culture", href: "/category/culture" },
];

const PAGES = [
  { name: "À propos", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Mentions légales", href: "/legal" },
  { name: "Confidentialité", href: "/privacy" },
  { name: "CGU", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-20 pb-10" role="contentinfo">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="font-heading text-[1.6rem] font-extrabold text-navy mb-5">
              La Ligne<span className="text-red">.</span>Rouge
            </div>
            <p className="text-[0.9rem] text-text2 mb-6">
              Plateforme d&apos;information indépendante dédiée à l&apos;actualité
              rigoureuse et à l&apos;analyse approfondie.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com/lignerouge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-bg flex items-center justify-center text-[0.9rem] text-navy transition-all hover:bg-navy hover:text-white"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="https://facebook.com/lignerouge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-bg flex items-center justify-center text-[0.9rem] text-navy transition-all hover:bg-navy hover:text-white"
                aria-label="Facebook"
              >
                f
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[0.75rem] font-bold tracking-wider uppercase text-navy mb-6">
              Rubriques
            </h3>
            <nav className="flex flex-col gap-3">
              {RUBRICS.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-[0.88rem] text-text2 transition-colors hover:text-red"
                >
                  {r.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[0.75rem] font-bold tracking-wider uppercase text-navy mb-6">
              Informations
            </h3>
            <nav className="flex flex-col gap-3">
              {PAGES.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="text-[0.88rem] text-text2 transition-colors hover:text-red"
                >
                  {p.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[0.75rem] font-bold tracking-wider uppercase text-navy mb-6">
              Newsletter
            </h3>
            <p className="text-[0.88rem] text-text2 mb-4">
              Recevez l&apos;essentiel de l&apos;actualité chaque matin.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.8rem] text-text3">
          <span>
            &copy; {new Date().getFullYear()} La Ligne Rouge. Tous droits réservés.
          </span>
          <span>Média indépendant depuis 2024</span>
        </div>
      </div>
    </footer>
  );
}
