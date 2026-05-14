"use client";

import { useEffect, useState } from "react";

interface TickerItem {
  id: string;
  title: string;
  breaking?: boolean;
}

export function Ticker({ items }: { items: TickerItem[] }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (items.length === 0) setIsVisible(false);
  }, [items]);

  if (!isVisible || items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div
      className="bg-navy h-10 flex items-center overflow-hidden relative z-50"
      role="marquee"
      aria-label="Actualités défilantes"
    >
      <div className="bg-red text-white font-body text-[0.72rem] font-bold tracking-wider uppercase px-3.5 py-1 whitespace-nowrap shrink-0 h-full flex items-center">
        {items.some((i) => i.breaking) ? "Breaking" : "Flash Info"}
      </div>
      <div className="flex items-center overflow-hidden flex-1 h-full">
        <div className="flex whitespace-nowrap ticker-animate">
          {doubled.map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              className="text-[#E8E4DC] text-[0.8rem] font-medium px-12 inline-flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-red rounded-full shrink-0" />
              {item.title}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#E8E4DC]/50 hover:text-white px-3 text-sm transition-colors shrink-0"
        aria-label="Fermer le ticker"
      >
        ✕
      </button>
    </div>
  );
}
