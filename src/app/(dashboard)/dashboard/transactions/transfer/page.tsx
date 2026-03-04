"use client";

import TransactionForm from "@/components/transactions/TransactionForm";

export default function TransferPage() {
  return (
    <TransactionForm
      type="transfer"
      title="Transfer Money"
    />
  );
}