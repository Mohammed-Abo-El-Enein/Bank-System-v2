"use client";

import { usePathname } from "next/navigation";

import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Bank Dashboard",
    subtitle: "Operations overview and performance metrics",
  },
  "/dashboard/customers": {
    title: "Customers",
    subtitle: "Manage customer records and onboarding",
  },
  "/dashboard/accounts": {
    title: "Accounts",
    subtitle: "Track balances and account activity",
  },
  "/dashboard/transactions": {
    title: "Transactions",
    subtitle: "Monitor transfers, deposits, and withdrawals",
  },
  "/dashboard/cards": {
    title: "Cards",
    subtitle: "Manage issued cards and card status",
  },
  "/dashboard/reports": {
    title: "Reports",
    subtitle: "View banking and operational reports",
  },
  "/dashboard/users": {
    title: "Users",
    subtitle: "Manage system access and roles",
  },
};

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const pathname = usePathname();

  const current =
    pageMeta[pathname] ||
    Object.entries(pageMeta).find(([key]) => pathname.startsWith(key))?.[1] || {
      title: "Bank Dashboard",
      subtitle: "Manage daily banking operations",
    };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-3 bg-white/80 px-4 py-4 backdrop-blur dark:border-dark-3 dark:bg-dark-2/80 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-3 text-dark dark:border-dark-3 dark:text-white"
            aria-label="Toggle Sidebar"
          >
            <MenuIcon />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-dark dark:text-white md:text-2xl">
              {current.title}
            </h1>
            <p className="text-sm text-gray-2">{current.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isMobile && <ThemeToggleSwitch />}
          <Notification />
          <UserInfo />
        </div>
      </div>
    </header>
  );
}