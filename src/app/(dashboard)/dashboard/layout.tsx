"use client";

import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import { useAuth } from "@/context/AuthContext";
import { DASHBOARD_ROLES, getDefaultRouteForRole } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (!hasRole([...DASHBOARD_ROLES])) {
      router.replace(getDefaultRouteForRole(user.role));
    }
  }, [user, loading, hasRole, router]);

  if (loading || !user) {
    return null;
  }

  if (
    !DASHBOARD_ROLES.includes(
      user.role as (typeof DASHBOARD_ROLES)[number],
    )
  ) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}