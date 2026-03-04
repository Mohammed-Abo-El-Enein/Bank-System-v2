// "use client";

// import { useEffect, useState } from "react";

// type Account = {
//   id: number;
//   account_number: string;
//   balance: number;
//   type: string;
// };

// export default function ClientAccountsPage() {
//   const [accounts, setAccounts] = useState<Account[]>([]);

//   useEffect(() => {
//     // هنستبدله بـ API بعدين
//     setAccounts([
//       {
//         id: 1,
//         account_number: "123456789",
//         balance: 10000,
//         type: "Saving",
//       },
//     ]);
//   }, []);

//   return (
//     <div className="bg-white dark:bg-dark-2 rounded-xl shadow-card p-6">
//       <h1 className="text-2xl font-semibold mb-6 text-dark dark:text-white">
//         My Accounts
//       </h1>

//       <div className="space-y-4">
//         {accounts.map((acc) => (
//           <div
//             key={acc.id}
//             className="border border-gray-3 rounded-lg p-4"
//           >
//             <p className="text-sm text-gray-2">
//               Account Number
//             </p>
//             <p className="font-medium text-dark dark:text-white">
//               {acc.account_number}
//             </p>

//             <p className="text-sm text-gray-2 mt-2">
//               Balance
//             </p>
//             <p className="font-bold text-primary">
//               ${acc.balance.toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await apiRequest("/accounts");
        setAccounts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      {accounts.map((acc: any) => (
        <div key={acc.id}>
          {acc.account_number} - {acc.balance}
        </div>
      ))}
    </div>
  );
}