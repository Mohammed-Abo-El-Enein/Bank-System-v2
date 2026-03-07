import { apiRequest } from "@/lib/api";

export interface DashboardStats {
  totalBankBalance: number;
  todayTransactions: number;
  activeAccounts: number;
  totalCustomers: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return apiRequest<DashboardStats>("/dashboard/kpis");
};