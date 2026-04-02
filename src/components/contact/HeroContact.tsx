import Image from "next/image";

export function HeroContact() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
      <Image
        src="/heros/Rua-Portugal-9-scaled.webp"
        alt="São Luís durante o dia"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 leading-tight">
          Fale <span className="text-cyan">Conosco</span>
        </h1>
        <p className="font-body text-text-secondary text-lg md:text-xl max-w-2xl">
          Estamos aqui para ouvir sugestões, críticas e notícias
        </p>
      </div>
    </section>
  );
}
