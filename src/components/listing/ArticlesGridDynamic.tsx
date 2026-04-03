"use client";

import { useMemo } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types";

interface Props {
  staticArticles: Article[];
  categorySlug?: string; // filter CMS articles by category
  searchQuery?: string;  // filter CMS articles by search
}

export function ArticlesGridDynamic({ staticArticles, categorySlug, searchQuery }: Props) {
  const { articles: cmsArticles } = useCMS();

  const merged = useMemo(() => {
    let cms = [...cmsArticles];

    if (categorySlug) {
      cms = cms.filter((a) => a.category.slug === categorySlug);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cms = cms.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.author.name.toLowerCase().includes(q),
      );
    }

    // Merge: CMS first, then static (deduplicate by id)
    const seen = new Set<string>();
    const result: Article[] = [];
    for (const a of [...cms, ...staticArticles]) {
      if (!seen.has(a.id)) {
        seen.add(a.id);
        result.push(a);
      }
    }

    return result.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [cmsArticles, staticArticles, categorySlug, searchQuery]);

  if (merged.length === 0) {
    return (
      <div className="text-center py-20 text-text-muted font-body">
        Nenhum artigo encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {merged.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
