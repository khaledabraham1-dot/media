import { prisma } from "@/lib/db";
import { stripHtml } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lignerouge.media";

  const articles = await prisma.article.findMany({
    where: { status: "published" },
    include: { category: true, author: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  const items = articles
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/article/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/article/${article.slug}</guid>
      <description><![CDATA[${article.excerpt || stripHtml(article.body).slice(0, 200)}]]></description>
      <category>${article.category.name}</category>
      <author>${article.author.name}</author>
      ${article.publishedAt ? `<pubDate>${article.publishedAt.toUTCString()}</pubDate>` : ""}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>La Ligne Rouge</title>
    <link>${baseUrl}</link>
    <description>Plateforme d'information indépendante premium</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
