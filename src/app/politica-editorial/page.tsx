import type { Metadata } from 'next';
import { HeroPolicyEdit } from '@/components/editorialPolicy/HeroPolicyEdit';
import { PolicyContent } from '@/components/editorialPolicy/PolicyContent';
import { SITE_NAME } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Política Editorial | ${SITE_NAME}`,
  description:
    'Conheça os princípios editoriais que guiam o trabalho do São Luís em Foco: verdade, transparência, independência e responsabilidade.',
  openGraph: {
    title: `Política Editorial | ${SITE_NAME}`,
    description:
      'Os valores e princípios que guiam nosso jornalismo todos os dias.',
    url: '/politica-editorial',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="bg-base min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroPolicyEdit />
      </section>

      {/* Content */}
      <PolicyContent />
    </div>
  );
}
