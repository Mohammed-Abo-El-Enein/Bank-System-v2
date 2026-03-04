export type TransactionType =
  | "deposit"
  | "withdraw"
  | "transfer";

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed";

export type Transaction = {
  id: number;
  reference: string;
  type: TransactionType;
  amount: number;
  fee: number;
  from_account: number | null;
  to_account: number | null;
  status: TransactionStatus;
  created_by: number;
  created_at: string;
};