"use client";

import { useState, useEffect, useCallback } from "react";
import { Search as SearchIcon } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  readTime: number;
  views: number;
  publishedAt: string | null;
  category: { name: string; slug: string; color: string };
  author: { name: string };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <>
      {/* Search Header */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-[680px] mx-auto px-6">
          <h1 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold text-navy text-center mb-8">
            Rechercher
          </h1>
          <div className="flex items-center border-2 border-border2 rounded overflow-hidden transition-colors focus-within:border-navy">
            <div className="pl-4 text-text3">
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              placeholder="Rechercher un article, un sujet..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-none outline-none text-[1.05rem] font-body py-3.5 px-4 bg-transparent text-text placeholder:text-text3"
              autoFocus
              aria-label="Terme de recherche"
            />
          </div>
          {query.length > 0 && query.length < 2 && (
            <p className="text-sm text-text3 mt-2">Tapez au moins 2 caractères...</p>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-10 bg-bg min-h-[400px]">
        <div className="max-w-[1320px] mx-auto px-6">
          {loading && (
            <div className="text-center py-12 text-text3">
              <div className="inline-block w-6 h-6 border-2 border-border2 border-t-navy rounded-full animate-spin mb-3" />
              <p>Recherche en cours...</p>
            </div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="text-center py-16 text-text3">
              <p className="text-lg mb-2">Aucun résultat pour &laquo; {query} &raquo;</p>
              <p className="text-sm">Essayez avec d&apos;autres termes de recherche.</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-sm text-text3 mb-6">
                {results.length} résultat{results.length > 1 ? "s" : ""} pour &laquo;{" "}
                {query} &raquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article) => (
                  <ArticleCard
                    key={article.id}
                    slug={article.slug}
                    title={article.title}
                    coverImage={article.coverImage}
                    category={article.category}
                    author={article.author}
                    publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
                    readTime={article.readTime}
                    views={article.views}
                    variant="card"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
