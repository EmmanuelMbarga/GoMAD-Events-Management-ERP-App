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
    <div className="flex gap-4">
      <div className="w-[344px] h-[118px] bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-50 p-2 rounded-full">
            <Users className="w-5 h-5 text-[#1AC2EA]" />
          </div>
          <h3 className="text-sm font-medium">Total Users</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{totalUsers.toLocaleString()}</span>
          <span className="px-2 py-1 rounded text-xs bg-green-50 text-green-600">
            +16%
          </span>
        </div>
      </div>
      <div className="w-[344px] h-[118px] bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-purple-50 p-2 rounded-full">
            <ArrowUp className="w-5 h-5 text-[#1AC2EA]" />
          </div>
          <h3 className="text-sm font-medium">Total Sales</h3>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{totalSales.toLocaleString()} FCFA</span>
          <span className="px-2 py-1 rounded text-xs bg-green-50 text-[#1AC2EA]">
            +16%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Carts;