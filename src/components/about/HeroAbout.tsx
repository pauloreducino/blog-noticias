import Image from "next/image";

export function HeroAbout() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80"
        alt="São Luís à noite"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 leading-tight">
          Nossa <span className="text-cyan">Missão</span>
        </h1>
        <p className="font-body text-text-secondary text-lg md:text-xl max-w-2xl">
          Informar, inspirar e conectar São Luís com as histórias que realmente
          importam
        </p>
      </div>
    </section>
  );
}
