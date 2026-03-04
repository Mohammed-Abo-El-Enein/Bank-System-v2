"use client";

import Card from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function EditCustomerPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    national_id: "",
    date_of_birth: "",
    nationality: "",
    gender: "",
    mobile_number: "",
    email: "",
    job_title: "",
    employment_type: "",
    account_type: "",
    opening_reason: "",
    currency: "",
    account_purpose: "",
    open_date: "",
    has_previous: 0,
  });

  // ✅ نجيب بيانات العميل
  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const data = await apiRequest(`/customers/${id}`);

        // ندمج البيانات مع الفورم الافتراضي
        setForm((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "has_previous" ? Number(value) : value,
    });
  };

  // ✅ تحديث البيانات
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiRequest(`/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      router.push("/dashboard/customers");
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-3 bg-white dark:bg-dark px-4 py-2.5 text-sm";

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Customer</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="customer_name"
              value={form.customer_name || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />

            <input
              name="national_id"
              value={form.national_id || ""}
              onChange={handleChange}
              placeholder="National ID"
              className={inputClass}
            />

            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth || ""}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="nationality"
              value={form.nationality || ""}
              onChange={handleChange}
              placeholder="Nationality"
              className={inputClass}
            />

            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              name="mobile_number"
              value={form.mobile_number || ""}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={inputClass}
            />

            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />

            <input
              name="address"
              value={form.address || ""}
              onChange={handleChange}
              placeholder="Address"
              className={inputClass}
            />
          </div>
        </Card>

        {/* Employment */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              name="job_title"
              value={form.job_title || ""}
              onChange={handleChange}
              placeholder="Job Title"
              className={inputClass}
            />

            <select
              name="employment_type"
              value={form.employment_type || ""}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Type</option>
              <option value="employee">Employee</option>
              <option value="self_employed">Self Employed</option>
              <option value="business_owner">Business Owner</option>
            </select>
          </div>
        </Card>

        {/* Account */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <select
              name="account_type"
              value={form.account_type || ""}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Type</option>
              <option value="saving">Saving</option>
              <option value="current">Current</option>
            </select>

            <input
              name="currency"
              value={form.currency || ""}
              onChange={handleChange}
              placeholder="Currency"
              className={inputClass}
            />

            <input
              name="opening_reason"
              value={form.opening_reason || ""}
              onChange={handleChange}
              placeholder="Opening Reason"
              className={inputClass}
            />

            <input
              name="account_purpose"
              value={form.account_purpose || ""}
              onChange={handleChange}
              placeholder="Account Purpose"
              className={inputClass}
            />

            <input
              type="date"
              name="open_date"
              value={form.open_date || ""}
              onChange={handleChange}
              className={inputClass}
            />

            <select
              name="has_previous"
              value={form.has_previous}
              onChange={handleChange}
              className={inputClass}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
        </Card>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
}