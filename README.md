# Ligne Rouge — Média numérique premium

Plateforme d'information indépendante construite avec Next.js 15, TypeScript, TailwindCSS et Prisma.

## Stack technique

- **Frontend** : Next.js 15 (App Router), TypeScript strict, TailwindCSS, Lucide Icons
- **Backend** : API Routes Next.js, Prisma ORM
- **Base de données** : SQLite (dev) / PostgreSQL (production)
- **Déploiement** : Vercel-ready

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Initialiser la base de données
npx prisma db push

# Remplir avec les données de démonstration
npm run db:seed

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
├── app/                  # Pages et routes (App Router)
│   ├── admin/           # Dashboard d'administration
│   ├── api/             # Routes API
│   ├── article/[slug]/  # Pages d'articles
│   ├── category/[slug]/ # Pages de catégories
│   ├── search/          # Recherche
│   └── ...              # Pages statiques
├── components/          # Composants réutilisables
├── lib/                 # Utilitaires et configuration
├── prisma/              # Schéma et seed de la base de données
├── public/              # Assets statiques
└── old/                 # Ancien site HTML (référence)
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | Linter ESLint |
| `npm run typecheck` | Vérification des types |
| `npm run db:seed` | Remplir la base de données |
| `npm run db:studio` | Ouvrir Prisma Studio |

## Fonctionnalités

- Articles dynamiques avec SEO complet
- Dashboard d'administration
- Recherche full-text
- Newsletter
- Sitemap XML et RSS feed
- Pages responsive (mobile-first)
- Accessibilité WCAG AA
- Schema.org / JSON-LD
- OpenGraph et Twitter Cards

## Déploiement Vercel

1. Connecter le repository à Vercel
2. Configurer `DATABASE_URL` dans les variables d'environnement
3. Déployer

## Licence

© 2024 Ligne Rouge Media. Tous droits réservés.
