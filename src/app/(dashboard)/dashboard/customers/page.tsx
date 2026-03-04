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

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/customers");
      setCustomers(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleFreeze = async (id: number) => {
    if (!confirm("Are you sure you want to freeze this customer?")) return;

    try {
      await apiRequest(`/customers/${id}`, {
        method: "DELETE",
      });
      fetchCustomers();
    } catch (error) {
      console.error("Freeze Error:", error);
    }
  };

  const handleActivate = async (id: number) => {
    try {
      await apiRequest(`/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: "active" }),
      });
      fetchCustomers();
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
                    className="border-b border-gray-3 dark:border-dark-3 hover:bg-gray-1 dark:hover:bg-dark-3 transition"
                  >
                    {/* Account Number */}
                    <td className="px-4 py-3">
                      {customer.accounts?.length ? (
                        <span className="bg-gray-2 dark:bg-dark-3 px-3 py-1 rounded-lg text-xs">
                          {customer.accounts[0].account_number}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Balance */}
                    <td className="px-4 py-3">
                      {customer.accounts?.length ? (
                        <span className="bg-green-light-6 text-green px-3 py-1 rounded-lg text-xs font-semibold">
                          {parseFloat(
                            customer.accounts[0].balance
                          ).toFixed(2)}{" "}
                          {customer.accounts[0].currency}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3">
                      {customer.customer_name}
                    </td>

                    {/* National ID */}
                    <td className="px-4 py-3 text-dark-6">
                      {customer.national_id}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3 text-dark-6">
                      {customer.mobile_number}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          customer.status === "active"
                            ? "bg-green-light-6 text-green"
                            : "bg-red-light-6 text-red"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        href={`/dashboard/customers/${customer.id}`}
                        className="bg-primary text-white px-3 py-1 rounded-lg text-xs"
                      >
                        View
                      </Link>

                      <Link
                        href={`/dashboard/customers/${customer.id}/edit`}
                        className="bg-yellow-light-4 text-yellow px-3 py-1 rounded-lg text-xs"
                      >
                        Edit
                      </Link>

                      {customer.status === "active" && (
                        <button
                          onClick={() => handleFreeze(customer.id)}
                          className="bg-red-light-6 text-red px-3 py-1 rounded-lg text-xs"
                        >
                          Freeze
                        </button>
                      )}

                      {customer.status === "inactive" && (
                        <button
                          onClick={() => handleActivate(customer.id)}
                          className="bg-green-light-6 text-green px-3 py-1 rounded-lg text-xs"
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