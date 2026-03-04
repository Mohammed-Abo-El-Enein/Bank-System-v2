"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Transaction = {
  id: number;
  reference: string;
  type: string;
  amount: string;
  status: string;
  created_at: string;
  account: {
    account_number: string;
    balance: string;
    customer: {
      customer_name: string;
    };
  };
};

export default function TransactionDetails() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized. Please login again.");
          router.push("/login");
          return;
        }

        const res = await fetch(
          `http://127.0.0.1:8000/api/transactions/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server Error:", errorText);
          setError("Transaction not found");
          return;
        }

        const data = await res.json();
        setTransaction(data);
      } catch (err) {
        console.error("Network Error:", err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (error)
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      </div>
    );

  if (!transaction) return null;

  return (
  <div className="p-6">
    {/* Title */}
    <div className="mb-6">
      <h1 className="text-heading-6 font-semibold text-dark dark:text-white">
        Transaction Details
      </h1>
    </div>

    {/* Card */}
    <div className="rounded-[10px] bg-white dark:bg-dark-2 shadow-card overflow-hidden">

      {/* Rows */}
      <div className="divide-y divide-stroke dark:divide-stroke-dark">

        {/* Reference */}
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-body-sm text-dark-5">Reference</span>
          <span className="font-medium text-dark dark:text-white bg-gray-2 dark:bg-dark-3 px-3 py-1 rounded-full">
            {transaction.reference}
          </span>
        </div>

        {/* Type */}
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-body-sm text-dark-5">Type</span>
          <span
            className={`px-3 py-1 rounded-full text-body-xs font-medium ${
              transaction.type === "deposit"
                ? "bg-green-light-6 text-green-dark"
                : transaction.type === "withdraw"
                ? "bg-red-light-6 text-red-dark"
                : "bg-blue-light-5 text-blue-dark"
            }`}
          >
            {transaction.type}
          </span>
        </div>

        {/* Amount */}
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-body-sm text-dark-5">Amount</span>
          <span className="font-semibold text-green-dark bg-green-light-6 px-3 py-1 rounded-full">
            {transaction.amount} EGP
          </span>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-body-sm text-dark-5">Status</span>
          <span className="bg-green-light-6 text-green-dark px-3 py-1 rounded-full text-body-xs font-medium">
            {transaction.status}
          </span>
        </div>

        {/* Date */}
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-body-sm text-dark-5">Created At</span>
          <span className="font-medium text-dark dark:text-white">
            {new Date(transaction.created_at).toLocaleString()}
          </span>
        </div>

        {/* Account Section */}
        <div className="px-6 py-5 bg-gray-1 dark:bg-dark">
          <h3 className="text-body-2xlg font-semibold text-dark dark:text-white mb-4">
            From Account
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-body-sm text-dark-5">
                Account Number
              </span>
              <span className="font-medium text-dark dark:text-white">
                {transaction.account.account_number}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-body-sm text-dark-5">
                Account Holder
              </span>
              <span className="font-medium text-dark dark:text-white">
                {transaction.account.customer.customer_name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-body-sm text-dark-5">
                Balance
              </span>
              <span className="font-semibold text-green-dark bg-green-light-6 px-3 py-1 rounded-full">
                {transaction.account.balance} EGP
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);
}