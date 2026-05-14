import { prisma } from "@/lib/db";
import { Ticker } from "@/components/Ticker";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Newsletter } from "@/components/Newsletter";
import Link from "next/link";

export const revalidate = 60;

async function getArticles() {
  return prisma.article.findMany({
    where: { status: "published" },
    include: {
      category: true,
      author: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { articles: { where: { status: "published" } } } },
    },
  });
}

export default async function HomePage() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const sideArticles = articles.filter((a) => a.id !== featured?.id).slice(0, 3);
  const trendingArticles = articles.slice(0, 8);
  const latestArticles = articles.slice(0, 12);

  const tickerItems = articles
    .filter((a) => a.breaking || a.featured)
    .concat(articles.slice(0, 5))
    .slice(0, 8)
    .map((a) => ({ id: a.id, title: a.title, breaking: a.breaking }));

  return (
    <>
      <Ticker items={tickerItems} />

      {/* Hero Section */}
      {featured && (
        <section className="py-10 bg-white border-b border-border">
          <div className="max-w-[1320px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
              <ArticleCard
                slug={featured.slug}
                title={featured.title}
                excerpt={featured.excerpt}
                coverImage={featured.coverImage}
                category={featured.category}
                author={featured.author}
                publishedAt={featured.publishedAt}
                readTime={featured.readTime}
                views={featured.views}
                variant="hero"
              />
              <div className="flex flex-col gap-4">
                {sideArticles.map((article) => (
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
                    variant="side"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section className="py-10 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          <SectionHeader title="À la une" href="/search" linkText="Tout voir →" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingArticles.slice(0, 4).map((article, i) => (
              <div key={article.id} className="relative">
                <span className="text-[0.68rem] font-bold tracking-wider uppercase text-red mb-1 block">
                  #{i + 1}
                </span>
                <ArticleCard
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 bg-bg">
        <div className="max-w-[1320px] mx-auto px-6">
          <SectionHeader title="Rubriques" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories
              .filter((c) => c._count.articles > 0)
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-lg p-5 border border-border transition-all hover:border-border2 hover:shadow-[0_1px_4px_rgba(0,0,0,.07),0_4px_16px_rgba(0,0,0,.06)] group"
                >
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h3 className="font-heading text-lg font-bold text-navy group-hover:text-red transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[0.8rem] text-text3 mt-1">
                    {cat._count.articles} article{cat._count.articles > 1 ? "s" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-10 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          <SectionHeader title="Derniers articles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.slice(4).map((article) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
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
        </div>
      </section>

      <Newsletter />
    </>
  );
}
