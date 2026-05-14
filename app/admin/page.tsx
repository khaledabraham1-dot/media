import { prisma } from "@/lib/db";
import { formatNumber } from "@/lib/utils";
import {
  FileText,
  Eye,
  Users,
  TrendingUp,
  MessageSquare,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

async function getStats() {
  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    totalViews,
    totalComments,
    totalUsers,
    totalSubscribers,
    recentArticles,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { status: "published" } }),
    prisma.article.count({ where: { status: "draft" } }),
    prisma.article.aggregate({ _sum: { views: true } }),
    prisma.comment.count(),
    prisma.user.count(),
    prisma.newsletterSub.count({ where: { active: true } }),
    prisma.article.findMany({
      include: { category: true, author: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    totalArticles,
    publishedArticles,
    draftArticles,
    totalViews: totalViews._sum.views || 0,
    totalComments,
    totalUsers,
    totalSubscribers,
    recentArticles,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Articles publiés",
      value: stats.publishedArticles,
      icon: FileText,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Vues totales",
      value: formatNumber(stats.totalViews),
      icon: Eye,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Brouillons",
      value: stats.draftArticles,
      icon: TrendingUp,
      color: "text-orange-600 bg-orange-50",
    },
    {
      label: "Commentaires",
      value: stats.totalComments,
      icon: MessageSquare,
      color: "text-pink-600 bg-pink-50",
    },
    {
      label: "Abonnés newsletter",
      value: stats.totalSubscribers,
      icon: Mail,
      color: "text-cyan-600 bg-cyan-50",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Vue d&apos;ensemble de votre plateforme média
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[0.78rem] font-medium text-gray-500">
                {stat.label}
              </span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Articles récents</h2>
          <Link
            href="/admin/articles"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir tout →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {stats.recentArticles.map((article) => (
            <div key={article.id} className="px-6 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm truncate">
                  {article.title}
                </div>
                <div className="text-[0.75rem] text-gray-500 mt-0.5">
                  {article.category.name} &middot;{" "}
                  {article.createdAt.toLocaleDateString("fr-FR")}
                </div>
              </div>
              <span
                className={`text-[0.7rem] font-medium px-2.5 py-1 rounded-full ${
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
              <span className="text-[0.75rem] text-gray-400 flex items-center gap-1">
                <Eye size={12} />
                {formatNumber(article.views)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
