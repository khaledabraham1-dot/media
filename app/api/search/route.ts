import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const articles = await prisma.article.findMany({
    where: {
      status: "published",
      OR: [
        { title: { contains: q } },
        { subtitle: { contains: q } },
        { excerpt: { contains: q } },
        { body: { contains: q } },
      ],
    },
    include: {
      category: { select: { name: true, slug: true, color: true } },
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ results: articles });
}
