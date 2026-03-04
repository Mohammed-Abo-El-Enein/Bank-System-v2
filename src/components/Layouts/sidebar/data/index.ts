import * as Icons from "../icons";
// import { LucideIcon } from "lucide-react";

/* =========================
   🔹 TYPES
========================= */

export interface SubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  url?: string;
  items?: SubItem[];
  roles?: string[];
}
export interface NavSection {
  label: string;
  items: NavItem[];
}

/* =========================
   🔹 DASHBOARD NAV
========================= */

export const DASHBOARD_NAV: NavSection[] = [
  {
    label: "BANK SYSTEM",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Icons.HomeIcon,
      },
      {
        title: "Customers",
        icon: Icons.User,
        items: [
          {
            title: "All Customers",
            url: "/dashboard/customers",
          },
          {
            title: "Create Customer",
            url: "/dashboard/customers/add",
          },
        ],
      },
      {
        title: "Transactions",
        icon: Icons.PieChart,
        items: [
          {
            title: "All Transactions",
            url: "/dashboard/transactions",
          },
          {
            title: "Deposit",
            url: "/dashboard/transactions/deposit",
          },
          {
            title: "Withdraw",
            url: "/dashboard/transactions/withdraw",
          },
          {
            title: "Transfer",
            url: "/dashboard/transactions/transfer",
          },
        ],
      },
      {
        title: "Accounts",
        url: "/dashboard/accounts",
        icon: Icons.Table,
      },
      {
        title: "Cards",
        url: "/dashboard/cards",
        icon: Icons.FourCircle,
      },
      {
        title: "Loans",
        url: "/dashboard/loans",
        icon: Icons.Alphabet,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: Icons.Calendar,
      },

      // 👑 SUPER ADMIN ONLY
      {
  title: "User Management",
  icon: Icons.User,
  roles: ["super_admin"],
  items: [
    {
      title: "All Users",
      url: "/dashboard/users",
    },
    {
      title: "Add User",
      url: "/dashboard/users/add",
    },
  ],
},
    ],
  },
];