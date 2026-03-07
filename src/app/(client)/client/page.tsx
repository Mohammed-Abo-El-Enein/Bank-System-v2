import Link from "next/link";

export default function ClientPage() {
  const cards = [
    {
      title: "My Accounts",
      description: "Review balances and account details.",
      href: "/client/accounts",
    },
    {
      title: "Transfers",
      description: "Send money between accounts safely.",
      href: "/client/transfers",
    },
    {
      title: "Profile",
      description: "Review your personal information.",
      href: "/client/profile",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-3 bg-white p-6 shadow-card dark:border-dark-3 dark:bg-dark-2">
        <p className="text-sm font-medium text-primary">Client Overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-dark dark:text-white">
          Manage your banking activity in one place
        </h2>
        <p className="mt-3 max-w-2xl text-gray-2">
          Access your accounts, transfer funds, and review your profile from the client portal.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-gray-3 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg dark:border-dark-3 dark:bg-dark-2"
          >
            <h3 className="text-lg font-semibold text-dark dark:text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-gray-2">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}