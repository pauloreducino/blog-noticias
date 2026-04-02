import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticlesList } from "@/components/admin/ArticlesList";

export const metadata: Metadata = {
  title: "Gerenciar Artigos | São Luís em Foco",
  description: "Gerencie todos os artigos do portal São Luís em Foco",
};

export default function ArticlesPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline font-bold text-3xl text-text-primary mb-2">
              Artigos
            </h1>
            <p className="font-body text-text-secondary">
              Gerencie todas as matérias publicadas
            </p>
          </div>
          <a
            href="/admin/artigos/novo"
            className="px-6 py-3 bg-cyan text-base font-mono font-semibold text-black rounded-lg hover:bg-cyan/80 transition-all"
          >
            Novo Artigo
          </a>
        </div>

        {/* Articles List */}
        <ArticlesList />
      </div>
    </AdminLayout>
  );
}
