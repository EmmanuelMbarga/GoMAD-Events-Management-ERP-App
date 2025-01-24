import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
