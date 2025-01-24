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
    <div className="flex flex-col w-full justify-between bg-white">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex flex-col gap-5 w-full lg:w-2/3">
          <Cards />
          <Suspense fallback={<div>Loading chart...</div>}>
            <ChartWrapper />
          </Suspense>
        </div>
        <div className="w-full lg:w-1/3">
          <Calendar />
        </div>
      </div>
      <div className="mt-4">
        <GuestManagement />
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
