"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

type Props = {
  type: "deposit" | "withdraw" | "transfer";
  title: string;
};

export default function TransactionForm({ type, title }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    account_number: "",
    to_account_number: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiRequest("/transactions", {
        method: "POST",
        body: JSON.stringify({
          type,
          account_number: form.account_number,
          to_account_number:
            type === "transfer"
              ? form.to_account_number
              : undefined,
          amount: Number(form.amount),
        }),
      });

      router.push("/dashboard/transactions");

    } catch (err: any) {
      setError(err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold text-dark dark:text-white">
        {title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="account_number"
              placeholder="Account Number"
              value={form.account_number}
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3"
            />

            {type === "transfer" && (
              <input
                type="text"
                name="to_account_number"
                placeholder="To Account Number"
                value={form.to_account_number}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-3"
              />
            )}

          </div>
        </div>

        <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-4">
            Transaction Details
          </h2>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3 w-full"
          />
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>

        </div>

      </form>
    </div>
  );
}