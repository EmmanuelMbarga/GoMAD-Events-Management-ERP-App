// app/dashboarduser/page.js
import GuestUser from "../../../components/GuestUser";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full justify-between">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-5"></div>
      </div>
      <GuestUser />
    </div>
  );
}
