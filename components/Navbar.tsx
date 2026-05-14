"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

const NAV_CATEGORIES = [
  { name: "Accueil", href: "/" },
  { name: "Actualité", href: "/category/actualite" },
  { name: "Politique", href: "/category/politique" },
  { name: "International", href: "/category/international" },
  { name: "Économie", href: "/category/economie" },
  { name: "Technologie", href: "/category/technologie" },
  { name: "Sport", href: "/category/sport" },
  { name: "Société", href: "/category/societe" },
  { name: "Culture", href: "/category/culture" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="bg-white border-b border-border sticky top-0 z-[200] h-16"
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center h-full">
          <Link
            href="/"
            className="font-heading text-[1.45rem] font-bold text-navy tracking-tight shrink-0"
          >
            Ligne<span className="text-red">.</span>Rouge
          </Link>

          <div className="w-px h-7 bg-border2 mx-5 shrink-0 hidden lg:block" />

          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-[0.78rem] font-semibold tracking-wider uppercase text-text2 px-3 py-2 rounded transition-colors hover:text-navy hover:bg-bg whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Link
              href="/search"
              className="flex items-center gap-1.5 text-[0.8rem] font-medium text-text2 bg-bg border border-border px-3.5 py-1.5 rounded-full transition-all hover:border-border2 hover:text-text"
              aria-label="Rechercher"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Rechercher</span>
            </Link>

            <Link
              href="/admin"
              className="hidden md:flex items-center text-[0.78rem] font-semibold text-text2 px-3 py-1.5 rounded transition-colors hover:text-navy hover:bg-bg"
            >
              Admin
            </Link>

            <button
              className="lg:hidden flex flex-col gap-[5px] p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-[190] overflow-y-auto">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase text-text2 px-4 py-3 rounded transition-colors hover:text-navy hover:bg-bg border-b border-border/50"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold tracking-wider uppercase text-red px-4 py-3 rounded transition-colors hover:bg-bg border-b border-border/50 mt-2"
            >
              Administration
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
