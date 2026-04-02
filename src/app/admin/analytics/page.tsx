import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Analytics | São Luís em Foco",
  description: "Estatísticas e métricas do portal São Luís em Foco",
};

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-headline font-bold text-3xl text-text-primary mb-2">
            Analytics
          </h1>
          <p className="font-body text-text-secondary">
            Acompanhe o desempenho do seu portal
          </p>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </AdminLayout>
  );
}
