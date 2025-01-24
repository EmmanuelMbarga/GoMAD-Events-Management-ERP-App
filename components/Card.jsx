"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ArrowUp } from "lucide-react";

const Carts = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `https://anjeagwe2025-backend.onrender.com/api/dashboard`
      );
      setTotalSales(response.data.totalSales);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-8 justify-evenly">
      <div className="w-full max-w-[300px] h-[200px] bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-50 p-3 rounded-full">
            <Users className="w-6 h-6 text-[#1AC2EA]" />
          </div>
          <h3 className="text-base font-medium">Total Users</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-4xl font-bold">{totalUsers.toLocaleString()}</span>
          <span className="px-2 py-1 rounded text-xs bg-green-50 text-green-600">
            +16%
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Date: July 2022</p>
        </div>
      </div>
      <div className="w-full max-w-[300px] h-[200px] bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-purple-50 p-3 rounded-full">
            <ArrowUp className="w-6 h-6 text-[#1AC2EA]" />
          </div>
          <h3 className="text-base font-medium">Total Sales</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-4xl font-bold">{totalSales.toLocaleString()} FCFA</span>
          <span className="px-2 py-1 rounded text-xs bg-green-50 text-[#1AC2EA]">
            +16%
          </span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">Date: July 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Carts;