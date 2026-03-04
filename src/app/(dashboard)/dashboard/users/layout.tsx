"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "super_admin") {
      router.replace("/dashboard");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          Loading...
        </div>
      </div>
    );
  }

  if (user?.role !== "super_admin") {
    return null;
  }

  return <>{children}</>;
}