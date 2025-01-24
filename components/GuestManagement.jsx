"use client";
import { useState, useEffect } from "react";
import { MdSearch, MdFilterAlt } from "react-icons/md";
import { Download } from "lucide-react";
import axios from "axios";

const GuestManagement = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [limit, setLimit] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [message, setMessage] = useState(""); // Add this line

  // Fetch guests from API
  const fetchParticipants = async (
    page = 1,
    search = "",
    paymentMethod = "all"
  ) => {
    setLoading(true);
    console.log("Request Params: ", { page, limit, search, paymentMethod });

    try {
      const response = await axios.get(
        `https://gomad-backend.onrender.com/api`,
        {
          params: {
            page,
            limit,
            search,
            paymentMethod,
          },
        }
      );
      setParticipants(response.data.participants);
      setTotalParticipants(response.data.totalParticipants);
    } catch (error) {
      console.error("Error fetching Participants:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async (format = "json") => {
    try {
      const response = await fetch(
        `http://localhost:5003/api/export?format=${format}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `participants.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage("Participant data exported successfully");
      } else {
        setMessage("Failed to export participant data");
      }
    } catch (error) {
      setMessage("Failed to export participant data");
    }
  };

  useEffect(() => {
    fetchParticipants(currentPage, searchQuery, paymentMethod);
  }, [currentPage, searchQuery, paymentMethod, limit]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
    setPaymentMethod(e.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Participants Management</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row gap-2.5 border border-gray-300 rounded-lg px-4 py-3">
          <MdSearch size={24} />
          <input
            type="text"
            className="text-base font-light outline-none"
            placeholder="Search Participants..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
          <MdFilterAlt size={24} />
          <span className="ml-2">Filter</span>
          <select
            value={paymentMethod}
            onChange={handleFilter}
            className="ml-2 border-none outline-none bg-transparent"
          >
            <option value="all">All</option>
            <option value="momo">MOMO</option>
            <option value="om">OM</option>
          </select>
        </div>
        <div className="flex items-center rounded-lg gap-2 px-4 py-3">
          {/* Export Button */}
          <button
            onClick={() => handleExportData("json")}
            className="bg-blue-400 px-4 py-4 flex hover:bg-blue-500 rounded-lg text-white font-bold "
          >
            {" "}
            <Download />
            Export JSON
          </button>
          <button
            onClick={() => handleExportData("csv")}
            className="bg-blue-400 px-4 py-4 flex hover:bg-blue-500 rounded-lg text-white font-bold "
          >
            {" "}
            <Download />
            Export CSV
          </button>
        </div>
      </div>
      {/* Message Pop-up */}
      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg">
          {message}
          <button onClick={() => setMessage("")} className="ml-2 text-red-500">
            X
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Check In Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : participants.length > 0 ? (
              participants.map((participant, index) => (
                <tr
                  key={participant.id || participant._id || index}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-300 p-2">
                    {participant.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {participant.tel}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      readOnly
                      checked={participant.checkedIn === true}
                      className="cursor-not-allowed"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Participants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span>Showing</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="ml-2 border border-gray-300 rounded-md p-1"
          >
            {[10, 20, 30].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <span>
          Showing {participants.length} of {totalParticipants} records
        </span>
        <div className="flex space-x-2">
          {Array.from(
            { length: Math.max(1, Math.ceil(totalParticipants / limit)) },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestManagement;
