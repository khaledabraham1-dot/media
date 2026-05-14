import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const updateArticleSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  body: z.string().min(1).optional(),
  coverImage: z.string().url().optional().nullable(),
  categoryId: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  featured: z.boolean().optional(),
  breaking: z.boolean().optional(),
  readTime: z.number().int().positive().optional(),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
});

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      category: true,
      author: true,
      tags: { include: { tag: true } },
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!article) {
    return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = await request.json();
    const data = updateArticleSchema.parse(body);

    const updateData: Record<string, unknown> = { ...data };

    // Set publishedAt when publishing
    if (data.status === "published") {
      const existing = await prisma.article.findUnique({ where: { id } });
      if (existing && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: updateData,
      include: { category: true, author: true },
    });

    return NextResponse.json(article);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    await prisma.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
