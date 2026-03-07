"use client";

import { getDefaultRouteForRole } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const parsedUser = JSON.parse(storedUser) as { role?: string };
      const nextRoute = getDefaultRouteForRole(parsedUser.role);

      if (nextRoute !== "/auth/login") {
        router.replace(nextRoute);
      }
    } catch (error) {
      console.error("Failed to restore home route:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center bg-gray-2 px-4 py-12 dark:bg-dark-2">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl bg-white p-8 shadow-card dark:bg-gray-dark lg:grid-cols-[1.1fr_.9fr] lg:p-12">
        <section>
          <span className="inline-flex rounded-full bg-primary/[0.08] px-3 py-1 text-sm font-medium text-primary">
            Bank System v2
          </span>

          <h1 className="mt-6 text-3xl font-bold text-dark dark:text-white sm:text-5xl">
            Secure banking operations for staff and customers.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-dark-5 dark:text-dark-6 sm:text-lg">
            Access internal banking workflows, customer accounts, and protected
            areas from a frontend that is focused on the actual project instead
            of generic dashboard template pages.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:opacity-90"
            >
              Sign in
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-stroke px-5 py-3 font-medium text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-white"
            >
              Open dashboard
            </Link>

            <Link
              href="/client"
              className="inline-flex items-center justify-center rounded-xl border border-stroke px-5 py-3 font-medium text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-white"
            >
              Open client portal
            </Link>
          </div>
        </section>

        <section className="rounded-2xl bg-gray-2 p-6 dark:bg-dark-2">
          <h2 className="text-xl font-semibold text-dark dark:text-white">
            Core areas
          </h2>

          <ul className="mt-5 space-y-3 text-sm text-dark-5 dark:text-dark-6">
            <li>Internal dashboard for admins, staff, and tellers.</li>
            <li>Separate customer portal experience.</li>
            <li>Protected role-based routing after login.</li>
            <li>Shared API layer for authentication and data requests.</li>
            <li>Cleaner UI without template-first landing content.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}