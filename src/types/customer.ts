export interface Customer {
  id: number;
  code: string;
  full_name: string;
  national_id: string;
  phone: string;
  risk_level: "Low" | "Medium" | "High";
  kyc_status: "Pending" | "Verified" | "Rejected";
  status: "Active" | "Frozen" | "Closed";
  created_at: string;
}