import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentArticles } from "@/components/admin/RecentArticles";
import { QuickActions } from "@/components/admin/QuickActions";

export const metadata: Metadata = {
  title: "Dashboard | São Luís em Foco",
  description: "Painel administrativo do portal São Luís em Foco",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-headline font-bold text-3xl text-text-primary mb-2">
            Dashboard
          </h1>
          <p className="font-body text-text-secondary">
            Bem-vindo ao painel administrativo do São Luís em Foco
          </p>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Articles */}
        <RecentArticles />
      </div>
    </AdminLayout>
  );
}
