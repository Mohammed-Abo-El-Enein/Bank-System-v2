export interface DashboardStats {
  totalBankBalance: number;
  todayTransactions: number;
  activeAccounts: number;
  totalCustomers: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/kpis`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  return res.json();
};

 