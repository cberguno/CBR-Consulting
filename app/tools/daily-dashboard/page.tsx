"use client";

import dynamic from "next/dynamic";

const ToolComponent = dynamic(
  () => import("@/components/tools/DailyDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-tertiary text-sm">Loading...</p>
      </div>
    ),
  }
);

export default function Page() {
  return <ToolComponent />;
}
