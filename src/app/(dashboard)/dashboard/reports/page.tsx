"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type ReportStats = {
  totalCustomers: number;
  totalAccounts: number;
  totalBalance: number;
  todayTransactions: number;
};

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats>({
    totalCustomers: 0,
    totalAccounts: 0,
    totalBalance: 0,
    todayTransactions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        // 👇 لو عملت endpoint اسمه /reports
        const data = await apiRequest("/reports");

        setStats({
          totalCustomers: data.totalCustomers,
          totalAccounts: data.totalAccounts,
          totalBalance: data.totalBalance,
          todayTransactions: data.todayTransactions,
        });
      } catch (err) {
        setError("Failed to load reports data");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading)
    return (
      <div className="p-6 animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="h-28 bg-gray-200 rounded-xl"></div>
          <div className="h-28 bg-gray-200 rounded-xl"></div>
          <div className="h-28 bg-gray-200 rounded-xl"></div>
          <div className="h-28 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold">
          Reports Dashboard
        </h1>
        <p className="opacity-90 mt-1">
          Real-time banking system analytics
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          color="from-purple-600 to-indigo-600"
        />

        <StatCard
          title="Total Accounts"
          value={stats.totalAccounts}
          color="from-green-500 to-emerald-600"
        />

        <StatCard
          title="Total Balance"
          value={`EGP ${stats.totalBalance.toLocaleString()}`}
          color="from-blue-600 to-cyan-600"
        />

        <StatCard
          title="Today Transactions"
          value={stats.todayTransactions}
          color="from-orange-500 to-red-500"
        />

      </div>
    </div>
  );
}

/* Reusable Card */
function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: any;
  color: string;
}) {
  return (
    <div
      className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300`}
    >
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}