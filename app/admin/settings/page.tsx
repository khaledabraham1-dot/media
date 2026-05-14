import { prisma } from "@/lib/db";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findFirst({ where: { id: "default" } });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">
          Configuration générale de la plateforme
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Informations du site</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du site</label>
              <input
                type="text"
                defaultValue={settings?.siteName || "Ligne Rouge"}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
              <input
                type="text"
                defaultValue={settings?.tagline || "L'information qui compte"}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                defaultValue={settings?.description || ""}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors resize-none"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Réseaux sociaux</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
              <input
                type="url"
                defaultValue={settings?.socialX || ""}
                placeholder="https://twitter.com/..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input
                type="url"
                defaultValue={settings?.socialFb || ""}
                placeholder="https://facebook.com/..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-colors"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Environnement</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Version</span>
              <span className="font-medium text-gray-900">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Framework</span>
              <span className="font-medium text-gray-900">Next.js 15</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500">Base de données</span>
              <span className="font-medium text-gray-900">SQLite (dev) / PostgreSQL (prod)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Déploiement</span>
              <span className="font-medium text-gray-900">Vercel-ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
