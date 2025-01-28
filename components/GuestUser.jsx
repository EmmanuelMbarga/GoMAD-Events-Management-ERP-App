"use client";
import { useState, useEffect } from "react";
import { MdSearch, MdFilterAlt } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Download } from "lucide-react";
import Modal from "react-modal"; // Add this import

// Set the app element for accessibility
Modal.setAppElement("#__next"); // Updated selector for Next.js applications

const GuestUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [organisers, setOrganisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalOrganisers, setTotalOrganisers] = useState(0);
  const [limit, setLimit] = useState(10);
  const [userType, setUserType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    role: "staff",
  });
  const [message, setMessage] = useState("");

  /*const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };*/

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch(
        "https://gomad-backend.onrender.com/organiser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newUser.name,
            password: newUser.password,
            userType: newUser.role,
          }),
        }
      );
      if (response.status === 201) {
        setMessage("Organiser created successfully");
        fetchOrganisers(currentPage, searchQuery, userType); // Refresh the list
        setNewUser({ name: "", password: "", role: "staff" }); // Clear the form fields
      } else {
        setMessage("Failed to create organiser");
      }
    } catch (error) {
      setMessage("Failed to create organiser");
    } finally {
      toggleModal();
    }
  };

  const handleDeleteUser = async (name) => {
    try {
      const response = await fetch(
        `https://gomad-backend.onrender.com/organiser/name/${name}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        setMessage("Organiser deleted successfully");
        fetchOrganisers(currentPage, searchQuery, userType); // Refresh the list
      } else {
        setMessage("Failed to delete organiser");
      }
    } catch (error) {
      setMessage("Failed to delete organiser");
    }
  };

  const handleUpdateUserRole = async (name, newRole) => {
    try {
      const response = await fetch(
        `https://gomad-backend.onrender.com/organiser/name/${name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userType: newRole }),
        }
      );
      if (response.status === 200) {
        setMessage("Organiser updated successfully");
        fetchOrganisers(currentPage, searchQuery, userType); // Refresh the list
      } else {
        setMessage("Failed to update organiser");
      }
    } catch (error) {
      setMessage("Failed to update organiser");
    }
  };

  const handleExportData = async (format = "json") => {
    try {
      const response = await fetch(
        `https://gomad-backend.onrender.com/organiser/export?format=${format}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `organisers.${format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage("Organiser data exported successfully");
      } else {
        setMessage("Failed to export organiser data");
      }
    } catch (error) {
      setMessage("Failed to export organiser data");
    }
  };

  // Fetch Organisers from API
  const fetchOrganisers = async (page = 1, search = "", userType = "all") => {
    setLoading(true);
    console.log("Request Params: ", { page, limit, search, userType });

    try {
      const response = await axios.get(
        `https://gomad-backend.onrender.com/organiser`,
        {
          params: {
            page,
            limit,
            search,
            userType,
          },
        }
      );
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
    <div className="p-2 sm:p-6">
      {/* Modal for Adding User */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add User Modal"
        className="modal-overlay flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Add New User</h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddUser}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold mr-2 hover:bg-blue-600"
              >
                Add
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* Message Pop-up */}
      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg">
          {message}
          <button onClick={() => setMessage("")} className="ml-2 text-red-500">
            X
          </button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <div className="w-full sm:w-auto flex flex-row gap-2.5 border border-gray-300 rounded-lg px-4 py-3">
          <MdSearch size={24} />
          <input
            type="text"
            className="w-full text-base font-light outline-none"
            placeholder="Search user..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-auto flex items-center border border-gray-300 rounded-lg px-4 py-3">
            <MdFilterAlt size={24} />
            <span className="ml-2">Filter</span>
            <select
              value={userType}
              onChange={handleFilter}
              className="ml-2 border-none outline-none bg-transparent w-full sm:w-auto"
            >
              <option value="all">All</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={toggleModal}
              className="w-full sm:w-auto bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
            >
              Add User
            </button>
            <button
              onClick={() => handleExportData("json")}
              className="w-full sm:w-auto bg-blue-400 px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-500 rounded-lg text-white font-bold"
            >
              <Download />
              Export JSON
            </button>
            <button
              onClick={() => handleExportData("csv")}
              className="w-full sm:w-auto bg-blue-400 px-4 py-2 flex items-center justify-center gap-2 hover:bg-blue-500 rounded-lg text-white font-bold"
            >
              <Download />
              Export CSV
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">
                Full Name
              </th>
              <th className="border border-gray-300 p-2 text-left">Rule</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
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
                  <td className="border border-gray-300 p-2">
                    <select
                      value={organiser.userType}
                      onChange={(e) =>
                        handleUpdateUserRole(organiser.name, e.target.value)
                      }
                      className="w-full sm:w-auto border-none outline-none bg-transparent"
                    >
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDeleteUser(organiser.name)}
                      className="w-full sm:w-auto bg-blue-400 px-2 rounded-lg py-2 text-white font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No Organisers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <div className="flex items-center">
          <span>Showing</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="mx-2 border border-gray-300 rounded-md p-1"
          >
            {[10, 20, 30].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <span className="text-sm">
          Showing {organisers.length} of {totalOrganisers} records
        </span>
        <div className="flex flex-wrap justify-center gap-1">
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

// Add the following CSS to your global stylesheet or in a <style> tag in your component
/*
.modal {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
  },
}
*/
