import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-headline font-bold text-8xl text-cyan/20 mb-4">404</div>
        <h1 className="font-headline font-bold text-text-primary text-3xl mb-3">
          Página não encontrada
        </h1>
        <p className="font-body text-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          A página que você procura não existe ou foi removida. Confira as notícias mais recentes.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-cyan text-base font-headline font-bold px-5 py-2.5 rounded-lg hover:bg-cyan/90 transition-colors"
          >
            Ir para o início
          </Link>
          <Link
            href="/noticias"
            className="border border-white/10 text-text-secondary font-body text-sm px-5 py-2.5 rounded-lg hover:border-cyan/30 hover:text-text-primary transition-all"
          >
            Ver notícias
          </Link>
        </div>
      </div>
    </div>
  );
}
