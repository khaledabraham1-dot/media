import { prisma } from "@/lib/db";
import { formatNumber, formatDate } from "@/lib/utils";
import { Eye, Plus, Edit2 } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    include: {
      category: true,
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500 text-sm mt-1">
            {articles.length} article{articles.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-red text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red2 transition-colors"
        >
          <Plus size={16} />
          Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Article
                </th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Catégorie
                </th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Statut
                </th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Vues
                </th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Date
                </th>
                <th className="text-left text-[0.75rem] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {article.title}
                      </div>
                      <div className="text-[0.75rem] text-gray-400 mt-0.5 truncate">
                        {article.author.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-[0.72rem] font-semibold px-2 py-1 rounded"
                      style={{
                        color: article.category.color,
                        backgroundColor: `${article.category.color}15`,
                      }}
                    >
                      {article.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[0.72rem] font-medium px-2.5 py-1 rounded-full ${
                        article.status === "published"
                          ? "bg-green-50 text-green-700"
                          : article.status === "draft"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {article.status === "published"
                        ? "Publié"
                        : article.status === "draft"
                        ? "Brouillon"
                        : "Archivé"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {formatNumber(article.views)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Voir"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
