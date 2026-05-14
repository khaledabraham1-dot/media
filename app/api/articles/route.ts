import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createArticleSchema = z.object({
  title: z.string().min(1).max(500),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  body: z.string().min(1),
  coverImage: z.string().url().optional(),
  categoryId: z.string(),
  authorId: z.string(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  breaking: z.boolean().default(false),
  readTime: z.number().int().positive().default(5),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status") || "published";
  const categoryId = searchParams.get("categoryId");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  const where: Record<string, unknown> = {};
  if (status !== "all") where.status = status;
  if (categoryId) where.categoryId = categoryId;

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        category: { select: { name: true, slug: true, color: true } },
        author: { select: { name: true, avatar: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.article.count({ where }),
  ]);

  return NextResponse.json({ articles, total, limit, offset });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createArticleSchema.parse(body);

    let slug = slugify(data.title);

    // Ensure unique slug
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug,
        subtitle: data.subtitle,
        excerpt: data.excerpt,
        body: data.body,
        coverImage: data.coverImage,
        categoryId: data.categoryId,
        authorId: data.authorId,
        status: data.status,
        featured: data.featured,
        breaking: data.breaking,
        readTime: data.readTime,
        seoTitle: data.seoTitle,
        seoDesc: data.seoDesc,
        publishedAt: data.status === "published" ? new Date() : null,
      },
      include: {
        category: true,
        author: true,
      },
    });

    if (data.tagIds) {
      await Promise.all(
        data.tagIds.map((tagId) =>
          prisma.articleTag.create({
            data: { articleId: article.id, tagId },
          })
        )
      );
    }

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
