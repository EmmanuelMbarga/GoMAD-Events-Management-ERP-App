"use client";

import dynamic from "next/dynamic";

const BarCharts = dynamic(() => import("./Barchart"), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
});

export default function ChartWrapper() {
  return <BarCharts />;
}
