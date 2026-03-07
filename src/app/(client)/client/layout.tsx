"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, hasRole, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (!hasRole(["customer"])) {
      if (["super_admin", "admin", "staff", "teller"].includes(user.role)) {
        router.replace("/dashboard");
      } else {
        router.replace("/access-denied");
      }
    }
  }, [user, loading, hasRole, router]);

  if (loading || !user || !hasRole(["customer"])) {
    return null;
  }

  const links = [
    { href: "/client", label: "Overview" },
    { href: "/client/accounts", label: "Accounts" },
    { href: "/client/transfers", label: "Transfers" },
    { href: "/client/profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-2 dark:bg-[#020d1a]">
      <header className="border-b border-gray-3 bg-white px-4 py-4 dark:border-dark-3 dark:bg-dark-2 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-2">Client Portal</p>
            <h1 className="text-2xl font-semibold text-dark dark:text-white">
              Welcome, {user.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-white"
                      : "bg-gray-1 text-dark hover:bg-gray-3 dark:bg-dark-3 dark:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/auth/login");
              }}
              className="rounded-lg border border-red px-4 py-2 text-sm font-medium text-red transition hover:bg-red/5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4 md:p-6 2xl:p-8">{children}</main>
    </div>
  );
}