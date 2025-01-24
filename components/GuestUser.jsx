"use client";
import { useState, useEffect } from "react";
import { MdSearch, MdFilterAlt } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Download } from "lucide-react";

const GuestUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [organisers, setOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalOrganisers, setTotalOrganisers] = useState(0);
  const [limit, setLimit] = useState(10);
  const [userType, setUserType] = useState("all");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fetch Organisers from API
  const fetchOrganisers = async (page = 1, search = "", userType = "all") => {
    setLoading(true);
    console.log("Request Params: ", { page, limit, search, userType });

    try {
      const response = await axios.get(`http://localhost:5003/organiser`, {
        params: {
          page,
          limit,
          search,
          userType,
        },
      });
      console.log("Response: ", response.data);
      setOrganisers(response.data.organisers || []); // Fallback to empty array
      setTotalOrganisers(response.data.totalOrganisers || 0); // Fallback to zero
    } catch (error) {
      console.error("Error fetching Organisers:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganisers(currentPage, searchQuery, userType);
  }, [currentPage, searchQuery, userType, limit]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
    setUserType(e.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row gap-2.5 border border-gray-300 rounded-lg px-4 py-3">
          <MdSearch size={24} />
          <input
            type="text"
            className="text-base font-light outline-none"
            placeholder="Search user..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
          <MdFilterAlt size={24} />
          <span className="ml-2">Filter</span>
          <select
            value={userType}
            onChange={handleFilter}
            className="ml-2 border-none outline-none bg-transparent"
          >
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div className="flex items-center rounded-lg px-4 py-3">
          <button className="bg-blue-400 px-4 py-4 flex hover:bg-blue-500 rounded-lg text-white font-bold ">
            {" "}
            <Download />
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Rule</th>
              <th className="border border-gray-300 p-2">Password</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : organisers.length > 0 ? (
              organisers.map((organiser, index) => (
                <tr
                  key={organiser.id || organiser._id || index}
                  className="hover:bg-gray-50"
                >
                  <td className="border border-gray-300 p-2">
                    {organiser.name}
                  </td>
                  <td className="border border-gray-300 p-2 text-center ">
                    <select name="" id="">
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <div className="flex justify-between">
                      <div
                        className="div"
                        type={showPassword ? "text" : "password"}
                      >
                        {showPassword ? "xxxx" : organiser.password}
                      </div>
                      <p
                        role="button"
                        className="my-1"
                        onClick={() => togglePasswordVisibility(organiser.id)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </p>
                    </div>
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    <button className="bg-blue-400 px-2 rounded-lg py-2 text-white font-bold">
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No Organisers found.
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
          Showing {organisers.length} of {totalOrganisers} records
        </span>
        <div className="flex space-x-2">
          {Array.from(
            { length: Math.max(1, Math.ceil(totalOrganisers / limit)) },
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

export default GuestUser;
