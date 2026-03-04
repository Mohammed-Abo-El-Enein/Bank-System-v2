"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Transaction = {
  id: number;
  reference: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function TransactionDetails() {
  const { id } = useParams();  // استخدم useParams لجلب الـ ID
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchTransaction();
    }
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/transactions/${id}`);
      const data = await res.json();

      if (res.ok) {
        setTransaction(data);
      } else {
        setError(data.message || "Transaction not found");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-dark dark:text-white">
        Transaction Details
      </h1>

      {error && (
        <div className="bg-red-light-6 text-red px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {transaction && (
        <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
            Transaction Information
          </h2>

          <div className="space-y-4">
            <div>
              <strong>Reference:</strong> {transaction.reference}
            </div>
            <div>
              <strong>Type:</strong> {transaction.type}
            </div>
            <div>
              <strong>Amount:</strong> {transaction.amount}
            </div>
            <div>
              <strong>Status:</strong> {transaction.status}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(transaction.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}