"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/card";
import { Transaction } from "@/types/transaction";
import { apiRequest } from "@/lib/api";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const data = await apiRequest("/transactions");
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          Transactions
        </h1>

        <div className="space-x-2">
          <Link
            href="/dashboard/transactions/deposit"
            className="bg-green text-white px-4 py-2 rounded-lg text-sm"
          >
            Deposit
          </Link>

          <Link
            href="/dashboard/transactions/withdraw"
            className="bg-red text-white px-4 py-2 rounded-lg text-sm"
          >
            Withdraw
          </Link>

          <Link
            href="/dashboard/transactions/transfer"
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
          >
            Transfer
          </Link>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-2 dark:bg-dark">
              <tr>
                <th className="px-4 py-3 text-left">Reference</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-dark-6">
                    Loading...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-dark-6">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-3 dark:border-dark-3 hover:bg-gray-1 dark:hover:bg-dark-3 transition"
                  >
                    <td className="px-4 py-3">{tx.reference}</td>

                    <td className="px-4 py-3 capitalize">
                      {tx.type}
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {tx.amount}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          tx.status === "completed"
                            ? "bg-green-light-6 text-green"
                            : tx.status === "pending"
                            ? "bg-yellow-light-4 text-yellow"
                            : "bg-red-light-6 text-red"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/transactions/${tx.id}`}
                        className="bg-primary text-white px-3 py-1 rounded-lg text-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}