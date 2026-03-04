"use client";

import Card from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
  const router = useRouter();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "has_previous" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      router.push("/auth/sign-in");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`, // 🔥 أهم سطر
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Customer created successfully");
        router.push("/dashboard/customers");
      } else {
        console.log("Validation error:", data);
        alert(data.message || "Error creating customer");
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("Server error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-3 bg-white dark:bg-dark px-4 py-2.5 text-sm text-dark dark:text-white focus:border-primary focus:outline-none transition";

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          Add Customer
        </h1>
        <p className="text-sm text-gray-4 mt-1">
          Create a new customer profile in the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Information */}
        <Card className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-6">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input name="customer_name" placeholder="Full Name" className={inputClass} onChange={handleChange} required />
            <input name="national_id" placeholder="National ID" className={inputClass} onChange={handleChange} required />
            <input name="date_of_birth" type="date" className={inputClass} onChange={handleChange} />
            <input name="nationality" placeholder="Nationality" className={inputClass} onChange={handleChange} />

            <select name="gender" className={inputClass} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input name="mobile_number" placeholder="Mobile Number" className={inputClass} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" className={inputClass} onChange={handleChange} />
            <input name="address" placeholder="Address" className={inputClass} onChange={handleChange} />

          </div>
        </Card>

        {/* Employment */}
        <Card className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-6">
            Employment Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input name="job_title" placeholder="Job Title" className={inputClass} onChange={handleChange} />

            <select name="employment_type" className={inputClass} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="employee">Employee</option>
              <option value="self_employed">Self Employed</option>
              <option value="business_owner">Business Owner</option>
            </select>
          </div>
        </Card>

        {/* Account */}
        <Card className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-dark dark:text-white mb-6">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <select name="account_type" className={inputClass} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="saving">Saving</option>
              <option value="current">Current</option>
            </select>

            <input name="currency" placeholder="Currency" className={inputClass} onChange={handleChange} />
            <input name="opening_reason" placeholder="Opening Reason" className={inputClass} onChange={handleChange} />
            <input name="account_purpose" placeholder="Account Purpose" className={inputClass} onChange={handleChange} />
            <input name="open_date" type="date" className={inputClass} onChange={handleChange} />

            <select name="has_previous" className={inputClass} onChange={handleChange}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>

          </div>
        </Card>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-2 text-dark px-6 py-2.5 rounded-lg hover:opacity-80 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition"
          >
            Create Customer
          </button>
        </div>

      </form>
    </div>
  );
}