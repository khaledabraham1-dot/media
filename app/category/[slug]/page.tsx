import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};

  return {
    title: `${category.name} — Actualités et analyses`,
    description: category.description || `Toute l'actualité ${category.name} sur Ligne Rouge.`,
    openGraph: {
      title: `${category.name} | Ligne Rouge`,
      description: `Toute l'actualité ${category.name} sur Ligne Rouge.`,
    },
    alternates: {
      canonical: `/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const articles = await prisma.article.findMany({
    where: { status: "published", categoryId: category.id },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
    take: 30,
  });

  return (
    <>
      {/* Category Header */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h1 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold text-navy">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-text2 text-lg max-w-2xl mt-2">
              {category.description}
            </p>
          )}
          <p className="text-text3 text-sm mt-3">
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 bg-bg">
        <div className="max-w-[1320px] mx-auto px-6">
          {articles.length > 0 ? (
            <>
              {/* Featured first article */}
              {articles[0] && (
                <div className="mb-10">
                  <ArticleCard
                    slug={articles[0].slug}
                    title={articles[0].title}
                    excerpt={articles[0].excerpt}
                    coverImage={articles[0].coverImage}
                    category={articles[0].category}
                    author={articles[0].author}
                    publishedAt={articles[0].publishedAt}
                    readTime={articles[0].readTime}
                    views={articles[0].views}
                    variant="hero"
                  />
                </div>
              )}

              <SectionHeader title="Tous les articles" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map((article) => (
                  <ArticleCard
                    key={article.id}
                    slug={article.slug}
                    title={article.title}
                    coverImage={article.coverImage}
                    category={article.category}
                    author={article.author}
                    publishedAt={article.publishedAt}
                    readTime={article.readTime}
                    views={article.views}
                    variant="card"
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-text3">
              <p className="text-lg">Aucun article dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
