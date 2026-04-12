import Link from 'next/link';
import Image from 'next/image';
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
              className="group relative flex flex-col justify-end overflow-hidden rounded-xl aspect-[4/5] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Imagem de fundo */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay escuro sempre presente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

              {/* Overlay colorido da categoria no hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: cat.color }}
              />

              {/* Conteúdo */}
              <div className="relative z-10 p-3">
                <div className="text-2xl mb-1.5 emoji-color">{cat.icon}</div>
                <p className="font-headline font-bold text-white text-sm leading-tight">
                  {cat.name}
                </p>
                <p className="font-mono text-[9px] mt-0.5" style={{ color: cat.color }}>
                  {cat.articleCount} artigos
                </p>
              </div>

              {/* Borda colorida na base no hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: cat.color }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
