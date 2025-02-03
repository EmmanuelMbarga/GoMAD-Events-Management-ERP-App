"use client";
import { Menu, Home, User, ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./Side";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    if (window.innerWidth >= 768) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setIsOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          bg-white border-r border-gray-200
          z-50 flex flex-col
        `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden absolute right-2 top-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Collapse Button */}
        <div className="hidden md:flex justify-end p-4">
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Menu className="h-6 w-6 text-gray-700" />
            ) : (
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div
          className={`
          flex justify-center items-center p-4
          ${isCollapsed ? "px-2" : "px-6"}
          min-h-[80px]
        `}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={isCollapsed ? 40 : 120}
            height={isCollapsed ? 40 : 60}
            className="object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-2">
            <SidebarItem
              icon={Home}
              label="Dashboard"
              href="/dashboard"
              isActive={pathname === "/dashboard"}
              isCollapsed={isCollapsed}
            />
            <SidebarItem
              icon={User}
              label="User"
              href="/dashboard/user"
              isActive={pathname === "/dashboard/user"}
              isCollapsed={isCollapsed}
            />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
