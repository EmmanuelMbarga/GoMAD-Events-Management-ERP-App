import Link from "next/link";
import { MdNotifications } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4">
      <div>
        <h1 className="text-lg font-bold">Hello Admin 👋</h1>
        <p className="text-sm text-gray-500">Good Morning</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="p-2 bg-gray-100 rounded-full"
          aria-label="Notifications"
        >
          <MdNotifications size={24} />
        </button>
        <div className="flex items-center border rounded p-1 space-x-2">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </Link>
          <div>
            <h2 className="text-sm font-bold">GoMAD</h2>
            <p className="text-xs text-gray-500">Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
