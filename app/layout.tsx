import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://lignerouge.media"
  ),
  title: {
    default: "La Ligne Rouge | Média numérique premium",
    template: "%s | La Ligne Rouge",
  },
  description:
    "Plateforme d'information indépendante. Actualité, Politique, Sport, Société, International, Culture.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "La Ligne Rouge",
    title: "La Ligne Rouge | Média numérique premium",
    description:
      "Plateforme d'information indépendante. Actualité, Politique, Sport, Société, International, Culture.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lignerouge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/api/rss",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "La Ligne Rouge",
              url: "https://lignerouge.media",
              logo: "https://lignerouge.media/logo.svg",
              description: "Plateforme d'information indépendante.",
              sameAs: [
                "https://twitter.com/lignerouge",
                "https://facebook.com/lignerouge",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
