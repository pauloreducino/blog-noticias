import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MediaGrid } from "@/components/admin/MediaGrid";
import { UploadArea } from "@/components/admin/UploadArea";

export const metadata: Metadata = {
  title: "Gerenciar Mídia | São Luís em Foco",
  description: "Gerencie imagens e vídeos do portal São Luís em Foco",
};

export default function MediaPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-headline font-bold text-3xl text-text-primary mb-2">
            Biblioteca de Mídia
          </h1>
          <p className="font-body text-text-secondary">
            Gerencie todas as imagens e vídeos do portal
          </p>
        </div>

        {/* Upload Area */}
        <UploadArea />

        {/* Media Grid */}
        <MediaGrid />
      </div>
    </AdminLayout>
  );
}
