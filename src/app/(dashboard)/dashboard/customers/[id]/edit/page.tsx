"use client";

import Card from "@/components/ui/card";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";

type CustomerForm = {
  customer_name: string;
  address: string;
  national_id: string;
  date_of_birth: string;
  nationality: string;
  gender: string;
  mobile_number: string;
  email: string;
  job_title: string;
  employment_type: string;
  account_type: string;
  opening_reason: string;
  currency: string;
  account_purpose: string;
  open_date: string;
  has_previous: number;
};

type CustomerApiResponse = Partial<
  Omit<CustomerForm, "has_previous">
> & {
  has_previous?: number | string | null;
};

const initialForm: CustomerForm = {
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
};

function formatDateForInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  return value.includes("T") ? value.split("T")[0] : value;
}

function normalizeCustomerForm(data: CustomerApiResponse): CustomerForm {
  return {
    ...initialForm,
    ...data,
    date_of_birth: formatDateForInput(data.date_of_birth),
    open_date: formatDateForInput(data.open_date),
    has_previous: Number(data.has_previous ?? 0),
  };
}

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();

  const customerId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CustomerForm>(initialForm);

  const updateFormField = <K extends keyof CustomerForm>(
    name: K,
    value: CustomerForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!customerId) {
      return;
    }

    const fetchCustomer = async (): Promise<void> => {
      try {
        setLoading(true);

        const data = await apiRequest<CustomerApiResponse>(
          `/customers/${customerId}`,
        );

        setForm(normalizeCustomerForm(data));
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchCustomer();
  }, [customerId]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const name = event.target.name as keyof CustomerForm;
    const value =
      name === "has_previous"
        ? Number(event.target.value)
        : event.target.value;

    updateFormField(name, value as CustomerForm[typeof name]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!customerId) {
      return;
    }

    try {
      await apiRequest(`/customers/${customerId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });

      router.push("/dashboard/customers");
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-3 bg-white px-4 py-2.5 text-sm dark:bg-dark";

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-bold text-dark dark:text-white">
        Edit Customer
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />

            <input
              name="national_id"
              value={form.national_id}
              onChange={handleChange}
              placeholder="National ID"
              className={inputClass}
            />

            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              placeholder="Nationality"
              className={inputClass}
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              name="mobile_number"
              value={form.mobile_number}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={inputClass}
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className={inputClass}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input
              name="job_title"
              value={form.job_title}
              onChange={handleChange}
              placeholder="Job Title"
              className={inputClass}
            />

            <select
              name="employment_type"
              value={form.employment_type}
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

        <Card className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <select
              name="account_type"
              value={form.account_type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Type</option>
              <option value="saving">Saving</option>
              <option value="current">Current</option>
            </select>

            <input
              name="currency"
              value={form.currency}
              onChange={handleChange}
              placeholder="Currency"
              className={inputClass}
            />

            <input
              name="opening_reason"
              value={form.opening_reason}
              onChange={handleChange}
              placeholder="Opening Reason"
              className={inputClass}
            />

            <input
              name="account_purpose"
              value={form.account_purpose}
              onChange={handleChange}
              placeholder="Account Purpose"
              className={inputClass}
            />

            <input
              type="date"
              name="open_date"
              value={form.open_date}
              onChange={handleChange}
              className={inputClass}
            />

            <select
              name="has_previous"
              value={String(form.has_previous)}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
        </Card>

        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2 text-white"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
}