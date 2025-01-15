"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ClipboardCheck, XCircle, Calendar } from "lucide-react";

const Cards = () => {
  const [totalGuests, setTotalGuests] = useState(0);
  const [totalGuestsEvent1, setTotalGuestsEvent1] = useState(0);
  const [totalGuestsEvent2, setTotalGuestsEvent2] = useState(0);
  const [totalGuestsEvent3, setTotalGuestsEvent3] = useState(0);

  // Fetch guests from API
  const fetchGuestsSummary = async () => {
    try {
      const response = await axios.get(
        `https://anjeagwe2025-backend.onrender.com/api/summary`
      );
      console.log("Response: ", response.data);
      setTotalGuests(response.data.totalGuests);
      setTotalGuestsEvent1(response.data.totalGuestsEvent1);
      setTotalGuestsEvent2(response.data.totalGuestsEvent2);
      setTotalGuestsEvent3(response.data.totalGuestsEvent3);
    } catch (error) {
      console.error("Error fetching guests:", error.message);
    }
  };

  useEffect(() => {
    fetchGuestsSummary();
  }, [totalGuests]);

  const stats = [
    {
      title: "Total Guest",
      value: totalGuests,
      icon: Users,
      change: "+12%",
      isPositive: true,
      update: "Date: January 3-5, 2025",
    },
    {
      title: "Pool Party",
      value: totalGuestsEvent1,
      icon: ClipboardCheck,
      change: "+5%",
      isPositive: true,
      update: "Date: January 3, 2025",
    },
    {
      title: "Joining Ceremony",
      value: totalGuestsEvent2,
      icon: XCircle,
      change: "+8%",
      isPositive: false,
      update: "Date: January 4, 2025",
    },
    {
      title: "Thanks Giving Service",
      value: totalGuestsEvent3,
      icon: Calendar,
      change: "+12%",
      isPositive: true,
      update: "Date: January 5, 2025",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-8 justify-evenly">
        {" "}
        {/* Adjusted gap */}
        {stats.map((stat, index) => (
          <div
            key={index}
            className="w-80 h-40 bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-50 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-base font-medium">{stat.title}</h3>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-4xl font-bold">{stat.value}</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  stat.isPositive
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">{stat.update}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
