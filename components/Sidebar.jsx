"use client";
import { Menu, Home, User, Settings, ChevronLeft, X } from "lucide-react"; // Using Lucide React icons
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./Side";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Add mobile open state

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Close mobile sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 m-4 text-gray-600"
        onClick={toggleMobile}
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobile}
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`fixed z-50 inset-y-0 left-0 transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-0
          transition-transform duration-200 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"} bg-gray-50 border-r border-gray-200`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-2">
          <button
            onClick={toggleMobile}
            className="p-2 text-gray-600"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Top Section */}
        <div>
          {/* Collapse Button */}
          <div className="p-6 flex justify-center">
            <button
              onClick={toggleCollapse}
              className="flex items-center justify-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? (
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Sidebar Menu Items */}
          <div className="mt-8 space-y-6">
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
        </div>

        {/* Logo Section */}
        {!isCollapsed && (
          <div className="my-8 flex flex-col items-center">
            <Image src="/logo.png" alt="Logo" width={279} height={146} />
          </div>
        )}

        {/* Bottom Section 
        {!isCollapsed && (
          <div className="my-6">
            <SidebarItem
              icon={Settings}
              label="Settings"
              href="/settings"
              isActive={pathname === "/settings"}
              isCollapsed={isCollapsed}
            />
          </div>
        )}*/}
      </div>
    </>
  );
};

export default Sidebar;
