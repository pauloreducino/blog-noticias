import type { Metadata } from 'next';
import { HeroContact } from '@/components/contact/HeroContact';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Fale Conosco | ${SITE_NAME}`,
  description:
    'Entre em contato com a redação do São Luís em Foco. Envie sugestões de notícias, críticas e comentários.',
  openGraph: {
    title: `Fale Conosco | ${SITE_NAME}`,
    description:
      'Estamos aqui para ouvir sugestões, críticas e notícias. Entre em contato conosco.',
    url: '/fale-conosco',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-base min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroContact />
      </section>

      {/* Contact Info */}
      <section className="py-16 border-b border-white/5">
        <ContactInfo />
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-text-primary mb-4 text-center">
            Envie sua <span className="text-cyan">Mensagem</span>
          </h2>
          <p className="font-body text-text-secondary text-center max-w-2xl mx-auto">
            Preencha o formulário abaixo com seus dados e sua mensagem. Todos os campos marcados com <span className="text-red-news">*</span> são obrigatórios.
          </p>
        </div>

        <div className="bg-surface border border-white/5 rounded-xl p-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
