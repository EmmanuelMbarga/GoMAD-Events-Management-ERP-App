"use client";
import { useState, useEffect } from "react";
//import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation"; // Update this import
import Modal from "react-modal"; // Add this import
import { useAuth } from "../../context/AuthContext";

// Set the app element for accessibility
Modal.setAppElement("#__next");

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(""); // Add this line
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this line
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Add this line
  const router = useRouter(); // Update this line
  const { login, user } = useAuth();

  useEffect(() => {
    // Only redirect if user exists and no pending destination selection
    if (user && !sessionStorage.getItem("pendingLoginData")) {
      const destination =
        user.selectedDestination ||
        (user.userType === "admin" ? "/dashboard" : "/scanner");
      router.replace(destination);
    }
  }, [user, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    // Validate inputs before making API call
    if (!name.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoggingIn(true);
    setError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(
        "https://gomad-backend.onrender.com/organiser/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ name: name.trim(), password }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        // For admin users, show modal first before completing login
        if (data.organiser.userType === "admin") {
          setUserType("admin");
          setIsModalOpen(true);
          // Store login data temporarily
          sessionStorage.setItem(
            "pendingLoginData",
            JSON.stringify({
              userType: data.organiser.userType,
              token: data.token,
              name: data.organiser.name,
            })
          );
        } else {
          // For non-admin users, login and redirect immediately
          login({
            userType: data.organiser.userType,
            token: data.token,
            name: data.organiser.name,
          });
          router.push("/scanner");
        }
      } else {
        throw new Error(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError(
        error.message === "Failed to fetch"
          ? "Network error. Please check your connection."
          : error.message
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Add keyboard event listener for Enter key
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && !isLoggingIn) {
        handleLogin();
      }
    };
    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  }, [name, password, isLoggingIn]);

  const handleAdminLogin = async (destination) => {
    try {
      const pendingLoginData = JSON.parse(
        sessionStorage.getItem("pendingLoginData")
      );
      if (pendingLoginData) {
        await login({
          ...pendingLoginData,
          selectedDestination: destination,
        });
        sessionStorage.removeItem("pendingLoginData");
        setIsModalOpen(false);
        router.replace(destination);
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      setError("Failed to complete login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
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
          disabled={isLoggingIn}
          className="w-[333px] h-[56px] mt-[35px] bg-[#00AAE8] hover:bg-[#00BFFF] text-center rounded-lg text-white text-base font-semibold disabled:opacity-50"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
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
                className="w-full h-[56px] mt-[15px] bg-[#00AAE8] hover:bg-[#00BFFF] text-center rounded-lg text-white text-base font-semibold"
              >
                Go to Scanner
              </button>
              <button
                onClick={() => handleAdminLogin("/dashboard")}
                className="w-full h-[56px] mt-[15px] bg-[#00AAE8] hover:bg-[#00BFFF] text-center rounded-lg text-white text-base font-semibold"
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
