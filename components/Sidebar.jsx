"use client";
// components/Sidebar.js
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdEventNote, MdSettings } from "react-icons/md"; // md is the prefix for material design icons

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-[#A2A1A80D] shadow-md w-64 p-4">
      <div className="text-base font-bold flex justify-center mb-6">
        AnjeAgwe2025-25th
      </div>
      <div className="flex-grow">
        <Link href="/dashboard">
          <div
            className={`flex items-center p-2 mb-4 text-gray-700 rounded ${
              pathname === "/dashboard"
                ? "bg-purple-200 text-purple-600 border-l-4 border-purple-800"
                : "hover:bg-purple-200 hover:text-purple-600"
            }`}
          >
            <MdDashboard size={24} />
            <span className="ml-2">Dashboard</span>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={`flex items-center p-2 mb-4 text-gray-700 rounded ${
              pathname === "/invitation"
                ? "bg-purple-200 text-purple-600 border-l-4 border-purple-800"
                : "hover:bg-purple-200 hover:text-purple-600"
            }`}
          >
            <MdEventNote size={24} />
            <span className="ml-2">Invitation</span>
          </div>
        </Link>
        <Link href="/dashboard">
          <div
            className={`flex items-center p-2 text-gray-700 rounded ${
              pathname === "/settings"
                ? "bg-purple-200 text-purple-600 border-l-4 border-purple-800"
                : "hover:bg-purple-200 hover:text-purple-600"
            }`}
          >
            <MdSettings size={24} />
            <span className="ml-2">Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
