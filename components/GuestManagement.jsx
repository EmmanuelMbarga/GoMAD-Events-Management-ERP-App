"use client";
import { useState, useEffect } from "react";
import { MdSearch, MdFilterAlt } from "react-icons/md";
import axios from "axios";

const GuestManagement = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalGuests, setTotalGuests] = useState(0);
  const [limit, setLimit] = useState(10);
  const [behalf, setBehalf] = useState("all");

  // Fetch guests from API
  const fetchGuests = async (page = 1, search = "", behalf = "all") => {
    setLoading(true);
    console.log("Request Params: ", { page, limit, search, behalf });

    try {
      const response = await axios.get(
        `https://anjeagwe2025-backend.onrender.com/api`,
        {
          params: {
            page,
            limit,
            search,
            behalf,
          },
        }
      );
      console.log("Response: ", response.data);
      setGuests(response.data.guests);
      setTotalGuests(response.data.totalGuests);
    } catch (error) {
      console.error("Error fetching guests:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests(currentPage, searchQuery, behalf);
  }, [currentPage, searchQuery, behalf, limit]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
    setBehalf(e.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Guest Management</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row gap-2.5 border border-gray-300 rounded-lg px-4 py-3">
          <MdSearch size={24} />
          <input
            type="text"
            className="text-base font-light outline-none"
            placeholder="Search guests..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
          <MdFilterAlt size={24} />
          <span className="ml-2">Filter</span>
          <select
            value={behalf}
            onChange={handleFilter}
            className="ml-2 border-none outline-none bg-transparent"
          >
            <option value="all">All</option>
            <option value="Groom">Groom</option>
            <option value="Bride">Bride</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Guest N°</th>
              <th className="border border-gray-300 p-2">QR Code</th>
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
            ) : guests.length > 0 ? (
              guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{guest.name}</td>
                  <td className="border border-gray-300 p-2">{guest.phone}</td>
                  <td className="border border-gray-300 p-2">
                    {guest.numberOfGuests}
                  </td>
                  <td className="border border-gray-300 p-2">{guest.id}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      readOnly
                      checked={guest.checkedIn === true}
                      className="cursor-not-allowed"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No guests found.
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
          Showing {guests.length} of {totalGuests} records
        </span>
        <div className="flex space-x-2">
          {Array.from(
            { length: Math.max(1, Math.ceil(totalGuests / limit)) },
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
