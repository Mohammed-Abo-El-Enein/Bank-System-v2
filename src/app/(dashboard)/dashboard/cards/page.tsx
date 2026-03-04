"use client";

import { useEffect, useState } from "react";

export default function CardsPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const fetchCards = async () => {
    try {
      setLoading(true);

      let query = `?search=${search}&status=${status}`;

      const res = await fetch(`/api/cards${query}`);
      const data = await res.json();

      setCards(data.data); // لازم الباك يرجع { data: [...] }
    } catch (err) {
      setError("Failed to load cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [search, status]);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="rounded-[10px] bg-white dark:bg-dark-2 shadow-card overflow-hidden">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-4 border-b border-stroke dark:border-stroke-dark">
          
          <h1 className="text-heading-6 font-semibold text-dark dark:text-white">
            All Cards
          </h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-stroke dark:border-stroke-dark bg-transparent px-4 py-2 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-stroke dark:border-stroke-dark bg-transparent px-3 py-2 text-body-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-gray-1 dark:bg-dark border-b border-stroke dark:border-stroke-dark">
                <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-6">
                  Card Number
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-6">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-6">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-6">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-6">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stroke dark:divide-stroke-dark">

              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                cards.map((card: any) => (
                  <tr key={card.id} className="hover:bg-gray-1 dark:hover:bg-dark transition">

                    <td className="px-6 py-4">
                      <span className="bg-gray-2 dark:bg-dark-3 px-3 py-1 rounded-full text-body-sm font-medium text-dark dark:text-white">
                        **** **** **** {card.last_four}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-dark dark:text-white">
                      {card.customer_name}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-body-xs font-medium bg-blue-light-5 text-blue-dark">
                        {card.type}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-body-xs font-medium
                        ${card.status === "active" && "bg-green-light-6 text-green-dark"}
                        ${card.status === "frozen" && "bg-red-light-6 text-red-dark"}
                        ${card.status === "expired" && "bg-yellow-200 text-yellow-700"}
                      `}>
                        {card.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button className="px-3 py-1 text-body-xs rounded-lg bg-primary text-white">
                        View
                      </button>
                    </td>

                  </tr>
                ))}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}