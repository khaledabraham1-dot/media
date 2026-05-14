import Image from "next/image";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category: { name: string; slug: string; color: string };
  author: { name: string };
  publishedAt: Date | null;
  readTime: number;
  views: number;
  variant?: "hero" | "card" | "side" | "compact";
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  coverImage,
  category,
  author,
  publishedAt,
  readTime,
  views,
  variant = "card",
}: ArticleCardProps) {
  if (variant === "hero") {
    return (
      <Link href={`/article/${slug}`} className="relative overflow-hidden rounded group block">
        <div className="relative h-[480px] max-md:h-[320px]">
          {coverImage && (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <span
              className="inline-flex text-white text-[0.68rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm mb-3"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
            <h2 className="font-heading text-[2rem] max-md:text-[1.5rem] font-bold text-white leading-[1.2] mb-2.5">
              {title}
            </h2>
            {excerpt && (
              <p className="text-[0.9rem] text-white/80 leading-relaxed mb-4 line-clamp-2">
                {excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-[0.75rem] text-white/70">
              <span>{author.name}</span>
              {publishedAt && <span>{formatRelativeDate(publishedAt)}</span>}
              <span>{readTime} min de lecture</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "side") {
    return (
      <Link
        href={`/article/${slug}`}
        className="flex gap-3.5 p-3.5 rounded border border-border bg-bg transition-all hover:border-border2 hover:bg-white hover:shadow-[0_1px_4px_rgba(0,0,0,.07),0_4px_16px_rgba(0,0,0,.06)] group"
      >
        {coverImage && (
          <div className="relative w-[90px] h-[72px] shrink-0 rounded overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="90px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span
            className="text-[0.65rem] font-bold tracking-wider uppercase mb-1 block"
            style={{ color: category.color }}
          >
            {category.name}
          </span>
          <h3 className="font-heading text-[0.92rem] font-semibold leading-snug text-text line-clamp-3 group-hover:text-navy transition-colors">
            {title}
          </h3>
          {publishedAt && (
            <span className="text-[0.7rem] text-text3 mt-1.5 block">
              {formatRelativeDate(publishedAt)}
            </span>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${slug}`}
        className="flex gap-4 py-4 border-b border-border/50 last:border-0 group"
      >
        {coverImage && (
          <div className="relative w-[120px] h-[80px] shrink-0 rounded overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span
            className="text-[0.65rem] font-bold tracking-wider uppercase mb-1 block"
            style={{ color: category.color }}
          >
            {category.name}
          </span>
          <h3 className="font-heading text-[0.95rem] font-semibold leading-snug text-text line-clamp-2 group-hover:text-red transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-3 text-[0.7rem] text-text3 mt-1.5">
            {publishedAt && <span>{formatRelativeDate(publishedAt)}</span>}
            <span>{readTime} min</span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card variant
  return (
    <Link href={`/article/${slug}`} className="group block">
      {coverImage && (
        <div className="relative w-full h-[190px] rounded overflow-hidden mb-3">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      )}
      <span
        className="text-[0.68rem] font-bold tracking-wider uppercase mb-1 block"
        style={{ color: category.color }}
      >
        {category.name}
      </span>
      <h3 className="font-heading text-[1rem] font-bold leading-snug text-text mb-2 line-clamp-3 group-hover:text-red transition-colors">
        {title}
      </h3>
      <div className="text-[0.72rem] text-text3">
        {publishedAt && formatRelativeDate(publishedAt)} &middot; {readTime} min
      </div>
    </Link>
  );
}
