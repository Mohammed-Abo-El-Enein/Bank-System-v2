"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/card";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

interface Account {
  id: number;
  account_number: string;
  type: string;
  balance: string;
  currency: string;
  status: string;
}

interface Customer {
  id: number;
  customer_name: string;
  national_id: string;
  mobile_number: string;
  status: string;
  accounts: Account[];
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async (): Promise<void> => {
    try {
      setLoading(true);

      const data = await apiRequest<Customer[]>("/customers");
      setCustomers(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCustomers();
  }, []);

  const handleFreeze = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to freeze this customer?")) return;

    try {
      await apiRequest(`/customers/${id}`, {
        method: "DELETE",
      });

      await fetchCustomers();
    } catch (error) {
      console.error("Freeze Error:", error);
    }
  };

  const handleActivate = async (id: number): Promise<void> => {
    try {
      await apiRequest(`/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "active" }),
      });

      await fetchCustomers();
    } catch (error) {
      console.error("Activate Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark dark:text-white">
        Customers
      </h1>

      <Card>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-2 dark:bg-dark">
                <tr>
                  <th className="px-4 py-3 text-left">Account Number</th>
                  <th className="px-4 py-3 text-left">Balance</th>
                  <th className="px-4 py-3 text-left">Full Name</th>
                  <th className="px-4 py-3 text-left">National ID</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-3 transition hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-3"
                  >
                    <td className="px-4 py-3">
                      {customer.accounts?.length ? (
                        <span className="rounded-lg bg-gray-2 px-3 py-1 text-xs dark:bg-dark-3">
                          {customer.accounts[0].account_number}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {customer.accounts?.length ? (
                        <span className="rounded-lg bg-green-light-6 px-3 py-1 text-xs font-semibold text-green">
                          {parseFloat(customer.accounts[0].balance).toFixed(2)}{" "}
                          {customer.accounts[0].currency}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="px-4 py-3">{customer.customer_name}</td>

                    <td className="px-4 py-3 text-dark-6">
                      {customer.national_id}
                    </td>

                    <td className="px-4 py-3 text-dark-6">
                      {customer.mobile_number}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          customer.status === "active"
                            ? "bg-green-light-6 text-green"
                            : "bg-red-light-6 text-red"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td className="space-x-2 px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/customers/${customer.id}`}
                        className="rounded-lg bg-primary px-3 py-1 text-xs text-white"
                      >
                        View
                      </Link>

                      <Link
                        href={`/dashboard/customers/${customer.id}/edit`}
                        className="rounded-lg bg-yellow-light-4 px-3 py-1 text-xs text-yellow"
                      >
                        Edit
                      </Link>

                      {customer.status === "active" && (
                        <button
                          onClick={() => handleFreeze(customer.id)}
                          className="rounded-lg bg-red-light-6 px-3 py-1 text-xs text-red"
                        >
                          Freeze
                        </button>
                      )}

                      {customer.status === "inactive" && (
                        <button
                          onClick={() => handleActivate(customer.id)}
                          className="rounded-lg bg-green-light-6 px-3 py-1 text-xs text-green"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}