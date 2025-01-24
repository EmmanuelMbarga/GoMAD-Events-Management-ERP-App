"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isCurrentDate = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isHighlightedDate = (day) => {
    const highlightedDates = [];
    return (
      highlightedDates.includes(day) &&
      currentMonth.getMonth() === 0 && // January
      currentMonth.getFullYear() === 2025
    );
  };

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className="w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Events Schedule</h2>
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-[#1AC2EA] font-medium">A</span>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="w-10 h-10 bg-[#1AC2EA] rounded-lg flex items-center justify-center text-white hover:bg-[#1AC2EA] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h3 className="text-lg font-medium text-gray-700">
          {monthName}, {year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-10 h-10 bg-[#1AC2EA] rounded-lg flex items-center justify-center text-white hover:bg-[#1AC2EA] transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth(currentMonth).map((day, index) => (
          <div
            key={index}
            className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
              day === null
                ? "text-gray-400"
                : isCurrentDate(day)
                ? "bg-[#1AC2EA] text-white"
                : isHighlightedDate(day)
                ? "bg-purple-400 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
