"use client";

import { useState } from "react";

export default function TransferPage() {
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // هنا بعدين هنربطه بالـ API
    console.log({
      amount,
      toAccount,
    });
  };

  return (
    <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6 max-w-xl">
      <h1 className="text-2xl font-semibold text-dark dark:text-white mb-6">
        Transfer Money
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-2 mb-2">
            To Account
          </label>
          <input
            type="text"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            className="w-full border border-gray-3 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-2 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-3 rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Send Money
        </button>
      </form>
    </div>
  );
}