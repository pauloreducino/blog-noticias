'use client';
import { useState } from 'react';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section
      className="relative overflow-hidden bg-elevated border-y border-cyan/15 py-14"
      aria-label="Newsletter"
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
      {/* Cyan glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mb-2">Newsletter</p>
        <h2 className="font-headline font-bold text-text-primary text-3xl mb-3 tracking-tight">
          São Luís na sua caixa de entrada
        </h2>
        <p className="font-body text-text-muted mb-8 leading-relaxed">
          Receba as principais notícias de São Luís e do Maranhão todos os dias, sem spam.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-green-live/15 border border-green-live/30 rounded-xl px-6 py-4 text-green-live font-body font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Obrigado! Você está inscrito.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-cyan text-base font-headline font-bold px-6 py-3 rounded-xl hover:bg-cyan/90 active:scale-95 transition-all whitespace-nowrap"
            >
              Assinar Grátis
            </button>
          </form>
        )}
        <p className="font-mono text-[10px] text-text-muted mt-3">Sem spam. Cancele quando quiser.</p>
      </div>
    </section>
  );
}
