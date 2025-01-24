"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Cell } from "recharts";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the chart with no SSR
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
});

const BarCharts = () => {
  const [checkIn, setCheckIn] = useState(0);
  const [notCheckIn, setNotCheckIn] = useState(0);

  // Fetch guests from API
  const fetchGuestsSummary = async () => {
    try {
      const response = await axios.get(
        `https://anjeagwe2025-backend.onrender.com/api/checkin-summary`
      );
      console.log("Response: ", response.data);
      setCheckIn(response.data.totalCheckedIn);
      setNotCheckIn(response.data.totalNotCheckedIn);
    } catch (error) {
      console.error("Error fetching guests:", error.message);
    }
  };

  useEffect(() => {
    fetchGuestsSummary();
  }, []);

  const data = [
    { name: "Checked In", value: checkIn, color: "#00AAE8" },
    { name: "UnChecked In", value: notCheckIn, color: "#F3E8FF" },
  ];

  const total = checkIn + notCheckIn;
  const checkedInPercentage = total ? ((checkIn / total) * 100).toFixed(2) : 0;
  const notCheckedInPercentage = total
    ? ((notCheckIn / total) * 100).toFixed(2)
    : 0;

  return (
    <div className="w-full max-w-md bg-white rounded-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Your Pie Chart
          </h3>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-sm">Today</span>
            <ChevronDown size={16} />
          </div>
        </div>

        <div className="flex justify-center relative">
          <PieChart width={280} height={280}>
            <Pie
              data={data}
              cx={140}
              cy={140}
              innerRadius={90}
              outerRadius={120}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-[#1AC2EA]"></div>
            <div>
              <p className="text-sm text-gray-500">Checked In</p>
              <p className="text-lg font-semibold">{checkedInPercentage}%</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-[#F3E8FF]"></div>
            <div>
              <p className="text-sm text-gray-500">UnChecked In</p>
              <p className="text-lg font-semibold">{notCheckedInPercentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarCharts;
