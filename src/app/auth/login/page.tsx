import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Secure sign in page for Bank System users.",
};

export default function SignIn() {
  return (
    <main className="flex min-h-screen items-center bg-gray-2 px-4 py-10 dark:bg-dark-2">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-card dark:bg-gray-dark lg:grid-cols-[1.05fr_.95fr]">
        <section className="p-6 sm:p-10 lg:p-12">
          <span className="inline-flex rounded-full bg-primary/[0.08] px-3 py-1 text-sm font-medium text-primary">
            Bank System
          </span>

          <h1 className="mt-6 text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-3 max-w-xl text-sm text-dark-5 dark:text-dark-6 sm:text-base">
            Sign in with your assigned credentials to access internal banking
            operations or the customer portal.
          </p>

          <div className="mt-8">
            <Signin />
          </div>
        </section>

        <aside className="hidden border-l border-stroke bg-gray-2 p-10 dark:border-dark-3 dark:bg-dark-2 lg:block">
          <h2 className="text-2xl font-semibold text-dark dark:text-white">
            Banking access
          </h2>

          <div className="mt-6 space-y-4 text-sm text-dark-5 dark:text-dark-6">
            <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-dark">
              Admins, staff, and tellers are routed to the dashboard.
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-dark">
              Customers are routed to the client portal.
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-dark">
              Public and auth pages stay separate from the dashboard layout.
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}