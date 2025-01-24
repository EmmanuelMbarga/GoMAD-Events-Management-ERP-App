"use client";
import { useState } from "react";
//import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation"; // Update this import
import Modal from "react-modal"; // Add this import

// Set the app element for accessibility
Modal.setAppElement("body");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(""); // Add this line
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line
  const router = useRouter(); // Update this line

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5003/organiser/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userType", data.organiser.userType); // Store the user type

        if (data.organiser.userType === "admin") {
          // Allow admin to choose between dashboard and scanner
          setError("");
          setUserType("admin");
          setIsModalOpen(true); // Open the modal
        } else if (data.organiser.userType === "staff") {
          router.push("/scanner");
        } else {
          setError("Unauthorized access");
        }
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to login");
    }
  };

  const handleAdminLogin = (destination) => {
    setIsModalOpen(false); // Close the modal
    router.push(destination);
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen "
      id="__next"
    >
      <div className="flex flex-col w-full h-full n items-center">
        <h1 className="flex font-bold mt-[114px] text-3xl text-[#1E232C] w-[280px] h-[78px]">
          Welcome back! Glad to see you!
        </h1>
        <div className="flex flex-col mt-[68px] w-[333px] h-[142px] justify-between rounded-lg items-center">
          <input
            type="text"
            className="w-[330px] h-[56px] rounded-lg border border-[#DADADA] bg-[#F7F8F9] font-medium pl-2 text-[#8391A1]"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="w-[330px] h-[56px] rounded-lg border border-[#DADADA] bg-[#F7F8F9] px-2 flex flex-row justify-between items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="font-medium pl-2 text-[#8391A1] outline-none bg-[#F7F8F9] flex-grow"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={togglePasswordVisibility}
              className="focus:outline-none"
            >
              {showPassword ? (
                <AiFillEye className="text-[#8391A1]" size={22} />
              ) : (
                <AiFillEyeInvisible className="text-[#8391A1]" size={22} />
              )}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-[333px] h-[56px] mt-[35px] bg-[#00AAE8] text-center rounded-lg text-white text-base font-semibold"
        >
          Login
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Admin Options"
          className="modal-overlay flex justify-center items-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Admin Options
            </h2>
            <div className="flex flex-col mt-4">
              <button
                onClick={() => handleAdminLogin("/scanner")}
                className="w-full h-[56px] mt-[15px] bg-[#00AAE8] text-center rounded-lg text-white text-base font-semibold"
              >
                Go to Scanner
              </button>
              <button
                onClick={() => handleAdminLogin("/dashboard")}
                className="w-full h-[56px] mt-[15px] bg-[#00AAE8] text-center rounded-lg text-white text-base font-semibold"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
