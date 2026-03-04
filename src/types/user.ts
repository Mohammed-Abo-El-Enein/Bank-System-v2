export type UserRole =
  | "super_admin"
  | "admin"
  | "staff"
  | "teller"
  | "customer";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};