// app/dashboard/page.js
import BarCharts from "@/components/Barchart";
import Calendar from "@/components/Calender";
import Cards from "@/components/Card";
import GuestManagement from "@/components/GuestManagement";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full justify-between">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-5">
          <Cards />
          <BarCharts />
        </div>
        <Calendar />
      </div>
      <GuestManagement />
    </div>
  );
}
