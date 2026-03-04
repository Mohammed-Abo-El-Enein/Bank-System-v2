"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (
        !hasRole(["super_admin", "admin", "staff", "teller"])
      ) {
        router.push("/access-denied");
      }
    }
  }, [user, loading, hasRole, router]);

  if (loading) return null;

  return <>{children}</>;
}