"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiRequest("/accounts");

        // يدعم كل أشكال الريسبونس
        const accountsData = Array.isArray(response)
          ? response
          : response.data ?? [];

        setAccounts(accountsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading)
    return (
      <div className="max-w-7xl mx-auto p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-7xl mx-auto p-6 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Accounts Management
          </h1>
          <p className="text-sm text-gray-500">
            Total Accounts: {accounts.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-dark-3 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="text-left px-6 py-3">Account Number</th>
                <th className="text-left px-6 py-3">Customer</th>
                <th className="text-left px-6 py-3">Type</th>
                <th className="text-left px-6 py-3">Currency</th>
                <th className="text-left px-6 py-3">Balance</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-dark-3 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {account.account_number}
                  </td>

                  <td className="px-6 py-4">
                    {account.customer
                      ? account.customer.customer_name
                      : "Unassigned"}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {account.type}
                  </td>

                  <td className="px-6 py-4">
                    {account.currency}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {Number(account.balance).toLocaleString()}{" "}
                    {account.currency}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={account.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {accounts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No accounts available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Status Badge */
function StatusBadge({ status }: any) {
  const base =
    "px-3 py-1 text-xs rounded-full font-medium capitalize";

  if (status === "active")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        Active
      </span>
    );

  if (status === "suspended")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        Suspended
      </span>
    );

  return (
    <span className={`${base} bg-red-100 text-red-700`}>
      {status}
    </span>
  );
}