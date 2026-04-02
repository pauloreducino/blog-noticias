import Image from "next/image";

export function HeroPolicyEdit() {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
      <Image
        src="/heros/sao-luis-ma-nitght.png"
        alt="Redação jornalística"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-base/95 via-base/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary mb-4 leading-tight">
          Política <span className="text-cyan">Editorial</span>
        </h1>
        <p className="font-body text-text-secondary text-lg md:text-xl max-w-2xl">
          Os princípios que guiam nosso trabalho jornalístico todos os dias
        </p>
      </div>
    </section>
  );
}
