import { prisma } from "@/lib/db";
import { formatNumber } from "@/lib/utils";
import { Eye, TrendingUp, FileText, Users } from "lucide-react";

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const [topArticles, totalViews, categoryCounts] = await Promise.all([
    prisma.article.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: { views: "desc" },
      take: 10,
    }),
    prisma.article.aggregate({ _sum: { views: true } }),
    prisma.category.findMany({
      include: {
        _count: { select: { articles: { where: { status: "published" } } } },
        articles: {
          where: { status: "published" },
          select: { views: true },
        },
      },
      orderBy: { order: "asc" },
    }),
  ]);

  const categoryStats = categoryCounts.map((cat) => ({
    name: cat.name,
    color: cat.color,
    articles: cat._count.articles,
    views: cat.articles.reduce((sum, a) => sum + a.views, 0),
  }));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">
          Statistiques de votre plateforme
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{formatNumber(totalViews._sum.views || 0)}</div>
              <div className="text-[0.75rem] text-gray-500">Vues totales</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {formatNumber(Math.round((totalViews._sum.views || 0) / Math.max(topArticles.length, 1)))}
              </div>
              <div className="text-[0.75rem] text-gray-500">Moy. vues/article</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{topArticles.length}</div>
              <div className="text-[0.75rem] text-gray-500">Articles publiés</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold">{categoryStats.length}</div>
              <div className="text-[0.75rem] text-gray-500">Catégories actives</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Articles les plus vus</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {topArticles.map((article, i) => (
              <div key={article.id} className="px-6 py-3 flex items-center gap-4">
                <span className="text-[0.75rem] font-bold text-gray-300 w-6">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {article.title}
                  </div>
                  <div className="text-[0.72rem] text-gray-400">{article.category.name}</div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {formatNumber(article.views)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Par catégorie</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="px-6 py-3 flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                  <div className="text-[0.72rem] text-gray-400">
                    {cat.articles} article{cat.articles > 1 ? "s" : ""}
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {formatNumber(cat.views)} vues
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
