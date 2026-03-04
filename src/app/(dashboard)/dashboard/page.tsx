import { Suspense } from "react";
import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { OverviewCardsGroup } from "@/app/(home)/_components/overview-cards";
import { OverviewCardsSkeleton } from "@/app/(home)/_components/overview-cards/skeleton";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function BankControlCenter({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;

  return (
    <>
      {/* 🔹 Bank KPI Cards */}
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        
        {/* 🔹 Transactions Overview */}
        <PaymentsOverview
          className="col-span-12 xl:col-span-7"
        />

        {/* 🔹 Weekly Cash Flow */}
        <WeeksProfit
          className="col-span-12 xl:col-span-5"
        />

        {/* 🔹 هنضيف لاحقًا:
            - Recent Transactions Table
            - Suspicious Transactions Panel
        */}
      </div>
    </>
  );
}