"use client";
import { Suspense } from "react";
import Calendar from "../../components/Calender";
import Cards from "../../components/Card";
import GuestManagement from "../../components/GuestManagement";
import ChartWrapper from "../../components/ChartWrapper";
import DashboardLayout from "../../components/DashboardLayout";
import withAuth from "../../utils/withAuth";

function Dashboard() {
  return (
    <div className="flex flex-col w-full justify-between bg-gray-50">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-5">
          <Cards />
          <Suspense fallback={<div>Loading chart...</div>}>
            <ChartWrapper />
          </Suspense>
        </div>
        <Calendar />
      </div>
      <GuestManagement />
    </div>
  );
}

export default withAuth(Dashboard);
