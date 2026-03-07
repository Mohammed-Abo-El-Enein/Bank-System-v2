import * as Icons from "../icons";

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

export const DASHBOARD_NAV: NavSection[] = [
  {
    label: "BANK SYSTEM",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Icons.HomeIcon,
        roles: ["super_admin", "admin", "staff", "teller"],
      },
      {
        title: "Customers",
        icon: Icons.User,
        roles: ["super_admin", "admin", "staff", "teller"],
        items: [
          { title: "All Customers", url: "/dashboard/customers" },
          { title: "Create Customer", url: "/dashboard/customers/add" },
        ],
      },
      {
        title: "Transactions",
        icon: Icons.PieChart,
        roles: ["super_admin", "admin", "staff", "teller"],
        items: [
          { title: "All Transactions", url: "/dashboard/transactions" },
          { title: "Deposit", url: "/dashboard/transactions/deposit" },
          { title: "Withdraw", url: "/dashboard/transactions/withdraw" },
          { title: "Transfer", url: "/dashboard/transactions/transfer" },
        ],
      },
      {
        title: "Accounts",
        url: "/dashboard/accounts",
        icon: Icons.Table,
        roles: ["super_admin", "admin", "staff", "teller"],
      },
      {
        title: "Cards",
        url: "/dashboard/cards",
        icon: Icons.FourCircle,
        roles: ["super_admin", "admin", "staff"],
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: Icons.Calendar,
        roles: ["super_admin", "admin", "staff"],
      },
      {
        title: "User Management",
        icon: Icons.User,
        roles: ["super_admin"],
        items: [
          { title: "All Users", url: "/dashboard/users" },
          { title: "Add User", url: "/dashboard/users/add" },
        ],
      },
    ],
  },
];