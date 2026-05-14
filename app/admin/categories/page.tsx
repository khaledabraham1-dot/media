import { prisma } from "@/lib/db";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { articles: true } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Catégories</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez les catégories de votre plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
            </div>
            <div className="text-sm text-gray-500">
              {cat._count.articles} article{cat._count.articles !== 1 ? "s" : ""}
            </div>
            <div className="text-[0.75rem] text-gray-400 mt-1">
              Slug: /{cat.slug}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
