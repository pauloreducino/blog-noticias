'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';

export function CategoryPills({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="list" aria-label="Filtros de categoria">
      <Link
        href="/noticias"
        role="listitem"
        className={`shrink-0 px-4 py-2 rounded-full font-mono text-[11px] font-medium tracking-wider uppercase transition-all ${
          !activeSlug
            ? 'bg-cyan text-base font-bold'
            : 'border border-white/10 text-text-muted hover:border-cyan/40 hover:text-text-primary'
        }`}
      >
        Todos
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/categoria/${cat.slug}`}
          role="listitem"
          className={`shrink-0 px-4 py-2 rounded-full font-mono text-[11px] font-medium tracking-wider uppercase transition-all ${
            activeSlug === cat.slug
              ? 'text-base font-bold'
              : 'border border-white/10 text-text-muted hover:text-text-primary'
          }`}
          style={
            activeSlug === cat.slug
              ? { backgroundColor: cat.color, borderColor: cat.color }
              : {}
          }
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
