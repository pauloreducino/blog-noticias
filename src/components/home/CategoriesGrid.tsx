import Link from 'next/link';
import { categories } from '@/data/categories';

export function CategoriesGrid() {
  return (
    <section className="bg-surface border-y border-white/5 py-10" aria-label="Navegar por categorias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-6 bg-amber-news rounded-full" />
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-amber-news">Temas</p>
            <h2 className="font-headline font-bold text-text-primary text-2xl -mt-0.5">Navegue por Editoria</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-elevated border border-white/5 hover:border-opacity-100 transition-all duration-300 hover:-translate-y-1 text-center"
              style={{ ['--cat-color' as string]: cat.color }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: cat.color + '15', border: `1px solid ${cat.color}30` }}
              >
                {cat.icon}
              </div>
              <div>
                <p className="font-headline font-semibold text-text-secondary group-hover:text-text-primary text-sm transition-colors leading-tight">
                  {cat.name}
                </p>
                <p className="font-mono text-[9px] text-text-muted mt-0.5">{cat.articleCount} artigos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
