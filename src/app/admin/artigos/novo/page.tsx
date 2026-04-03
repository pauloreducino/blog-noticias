import { Suspense } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NewArticlePage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-headline font-bold text-3xl text-text-primary mb-2">
            Novo Artigo
          </h1>
          <p className="font-body text-text-secondary">
            Crie uma nova matéria para o portal
          </p>
        </div>
        <Suspense fallback={<div className="font-mono text-text-muted text-sm">Carregando formulário...</div>}>
          <ArticleForm />
        </Suspense>
      </div>
    </AdminLayout>
  );
}
