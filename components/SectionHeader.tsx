import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkText?: string;
}

export function SectionHeader({
  title,
  href,
  linkText = "Tout voir →",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-border">
      <h2 className="font-heading text-[1.25rem] font-bold text-navy flex items-center gap-2.5">
        <span className="w-[3px] h-5 bg-red rounded-sm block shrink-0" />
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-[0.75rem] font-semibold text-text3 tracking-wide border border-border px-3.5 py-1.5 rounded-full transition-all hover:text-navy hover:border-navy"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
