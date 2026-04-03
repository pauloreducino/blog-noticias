"use client";

import { useMemo } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { HeroMagazine } from "./HeroMagazine";
import { LatestSection } from "./LatestSection";
import { MostReadSection } from "./MostReadSection";
import type { Article } from "@/types";

interface Props {
  staticFeatured: Article[];
  staticLatest: Article[];
  staticMostRead: Article[];
}

export function HomeDynamic({ staticFeatured, staticLatest, staticMostRead }: Props) {
  const { articles: cmsArticles } = useCMS();

  const { featured, heroLatest, sectionLatest, mostRead } = useMemo(() => {
    const byDate = (a: Article, b: Article) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

    // Merge and deduplicate
    const seen = new Set<string>();
    const merge = (...lists: Article[][]): Article[] => {
      const result: Article[] = [];
      for (const list of lists) {
        for (const a of list) {
          if (!seen.has(a.id)) {
            seen.add(a.id);
            result.push(a);
          }
        }
      }
      return result;
    };

    // CMS newest-first
    const cmsSorted = [...cmsArticles].sort(byDate);

    // Featured: CMS featured first, then static featured
    const cmsFeatured = cmsSorted.filter((a) => a.featured);
    const featured = merge(cmsFeatured, staticFeatured);

    // All articles merged newest-first
    seen.clear();
    const all = merge(cmsSorted, staticLatest).sort(byDate);

    const heroLatest = all.slice(0, 4);
    const sectionLatest = all.slice(0, 6);

    // Most read: by views
    seen.clear();
    const mostRead = merge(cmsSorted, staticMostRead)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return { featured, heroLatest, sectionLatest, mostRead };
  }, [cmsArticles, staticFeatured, staticLatest, staticMostRead]);

  return (
    <>
      <HeroMagazine featured={featured} latest={heroLatest} />
      <LatestSection articles={sectionLatest} />
      <MostReadSection articles={mostRead} />
    </>
  );
}
