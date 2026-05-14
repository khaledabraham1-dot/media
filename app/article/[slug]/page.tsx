import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatDate, formatNumber } from "@/lib/utils";
import { ArticleCard } from "@/components/ArticleCard";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Share2, Bookmark, Eye } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } },
    },
  });
}

async function getRelated(categoryId: string, articleId: string) {
  return prisma.article.findMany({
    where: {
      status: "published",
      categoryId,
      id: { not: articleId },
    },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: article.seoTitle || article.title,
    description: article.seoDesc || article.excerpt || article.subtitle,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt || article.subtitle || "",
      images: article.ogImage || article.coverImage
        ? [{ url: (article.ogImage || article.coverImage)!, width: 1200, height: 630 }]
        : [],
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author.name],
      section: article.category.name,
    },
    alternates: {
      canonical: `/article/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelated(article.categoryId, article.id);

  // Increment views
  await prisma.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: [{ "@type": "Person", name: article.author.name }],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "La Ligne Rouge",
      url: "https://lignerouge.media",
    },
    description: article.excerpt || article.subtitle,
    articleSection: article.category.name,
    wordCount: article.body.split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Article Header */}
        <div className="py-16 bg-white">
          <div className="max-w-[820px] mx-auto px-6">
            <Link
              href={`/category/${article.category.slug}`}
              className="inline-block text-[0.75rem] font-bold tracking-wider uppercase mb-4 transition-colors hover:opacity-80"
              style={{ color: article.category.color }}
            >
              {article.category.name}
            </Link>

            <h1 className="font-heading text-[3rem] max-md:text-[2.2rem] font-extrabold leading-[1.1] text-navy mb-6">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="font-serif text-[1.35rem] text-text2 leading-relaxed mb-8 italic">
                {article.subtitle}
              </p>
            )}

            {/* Author + Meta */}
            <div className="flex items-center justify-between py-5 border-t border-b border-border mb-10">
              <div className="flex items-center gap-3">
                {article.author.avatar && (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-bg2">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                )}
                <div>
                  <div className="font-bold text-[0.9rem]">{article.author.name}</div>
                  <div className="text-[0.8rem] text-text3">
                    {article.publishedAt && formatDate(article.publishedAt)} &middot;{" "}
                    {article.readTime} min de lecture
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[0.78rem] text-text3">
                  <Eye size={14} />
                  {formatNumber(article.views)}
                </div>
                <button
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center transition-all hover:bg-bg hover:border-border2"
                  aria-label="Partager"
                >
                  <Share2 size={14} />
                </button>
                <button
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center transition-all hover:bg-bg hover:border-border2"
                  aria-label="Sauvegarder"
                >
                  <Bookmark size={14} />
                </button>
              </div>
            </div>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  width={820}
                  height={460}
                  className="w-full"
                  priority
                  sizes="(max-width: 820px) 100vw, 820px"
                />
              </div>
            )}

            {/* Article Body */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                {article.tags.map(({ tag }) => (
                  <span
                    key={tag.id}
                    className="text-[0.75rem] font-medium text-text2 bg-bg px-3 py-1.5 rounded-full border border-border"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="py-12 bg-bg">
            <div className="max-w-[1320px] mx-auto px-6">
              <SectionHeader
                title="Articles similaires"
                href={`/category/${article.category.slug}`}
                linkText="Voir tout →"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <ArticleCard
                    key={rel.id}
                    slug={rel.slug}
                    title={rel.title}
                    coverImage={rel.coverImage}
                    category={rel.category}
                    author={rel.author}
                    publishedAt={rel.publishedAt}
                    readTime={rel.readTime}
                    views={rel.views}
                    variant="card"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
