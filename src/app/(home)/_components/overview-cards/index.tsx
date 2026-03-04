"use client";

import { useEffect, useState } from "react";
import { DollarSign, CreditCard, Landmark, Users } from "lucide-react";

export function OverviewCardsGroup() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/kpis")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);
  

  const cards = [
    {
      title: "Total Bank Balance",
      value: data
        ? `$${Number(data.totalBankBalance).toLocaleString()}`
        : "Loading...",
      icon: DollarSign,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Today Transactions",
      value: data ? data.todayTransactions : "Loading...",
      icon: CreditCard,
      color: "bg-green-500/10 text-green-500",
    },
    {
      title: "Active Accounts",
      value: data ? data.activeAccounts : "Loading...",
      icon: Landmark,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Total Customers",
      value: data ? data.totalCustomers : "Loading...",
      icon: Users,
      color: "bg-cyan-500/10 text-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="col-span-12 sm:col-span-6 xl:col-span-3 
                       rounded-xl bg-white dark:bg-dark-2 
                       p-6 shadow-card transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  {card.title}
                </h4>
                <p className="mt-2 text-2xl font-bold text-dark dark:text-white">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center 
                            rounded-full ${card.color}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}