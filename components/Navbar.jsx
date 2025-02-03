import Link from "next/link";
import { MdNotifications, MdMenu } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleSidebar }) {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <MdMenu size={24} />
      </button>

      <div className="hidden md:block">
        <h1 className="text-lg font-bold">Hello Admin 👋</h1>
        <p className="text-sm text-gray-500">Good Morning</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Notifications"
        >
          <MdNotifications size={24} />
        </button>

        <button
          onClick={logout}
          className="flex items-center border rounded p-1 space-x-2 hover:bg-gray-100"
        >
          <img src="/logo.png" alt="logout" className="w-8 h-8 rounded-full" />
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold">GoMAD</h2>
            <p className="text-xs text-gray-500">Logout</p>
          </div>
        </button>
      </div>
    </div>
  );
}
