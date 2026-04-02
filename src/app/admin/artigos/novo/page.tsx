import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata: Metadata = {
  title: "Novo Artigo | São Luís em Foco",
  description: "Criar novo artigo no portal São Luís em Foco",
};

export default function NewArticlePage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-headline font-bold text-3xl text-text-primary mb-2">
            Novo Artigo
          </h1>
          <p className="font-body text-text-secondary">
            Crie uma nova matéria para o portal
          </p>
        </div>

        {/* Form */}
        <ArticleForm />
      </div>
    </AdminLayout>
  );
}
