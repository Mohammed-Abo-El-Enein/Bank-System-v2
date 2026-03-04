"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Card from "@/components/ui/card";

export default function ViewCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/customers/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setCustomer(data.data ?? data);
      } catch (err) {
        setError("Unable to load customer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading)
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded-xl"></div>
        <div className="h-40 bg-gray-200 rounded-xl"></div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-6xl mx-auto text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  if (!customer)
    return (
      <div className="max-w-6xl mx-auto text-center py-20">
        <p className="text-gray-500">No customer found.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">
            {customer.customer_name}
          </h1>
          <p className="text-sm opacity-90">
            National ID: {customer.national_id}
          </p>
        </div>
        <span className="px-4 py-1 bg-white/20 rounded-full text-sm">
          Active
        </span>
      </div>

      {/* Grid Sections */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Personal Info */}
        <Card className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Personal Information
          </h2>

          <div className="space-y-3 text-sm">
            <Info label="Date of Birth" value={customer.date_of_birth} />
            <Info label="Nationality" value={customer.nationality} />
            <Info label="Gender" value={customer.gender} />
            <Info label="Mobile" value={customer.mobile_number} />
            <Info label="Email" value={customer.email} />
            <Info label="Address" value={customer.address} />
          </div>
        </Card>

        {/* Employment */}
        <Card className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Employment
          </h2>

          <div className="space-y-3 text-sm">
            <Info label="Job Title" value={customer.job_title} />
            <Info label="Employment Type" value={customer.employment_type} />
          </div>
        </Card>

        {/* Account */}
        <Card className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <Info label="Account Type" value={customer.account_type} />
            <Info label="Currency" value={customer.currency} />
            <Info label="Opening Reason" value={customer.opening_reason} />
            <Info label="Account Purpose" value={customer.account_purpose} />
            <Info label="Open Date" value={customer.open_date} />
            <Info
              label="Previous Account"
              value={customer.has_previous ? "Yes" : "No"}
            />
          </div>
        </Card>

      </div>
    </div>
  );
}

/* Small reusable component */
function Info({ label, value }: any) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800 dark:text-white">
        {value || "-"}
      </span>
    </div>
  );
}