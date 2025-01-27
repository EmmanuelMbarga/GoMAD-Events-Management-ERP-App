"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("authToken");
      const userType = localStorage.getItem("userType");
      const lastLogin = localStorage.getItem("lastLogin");
      const selectedDestination = localStorage.getItem("selectedDestination");

      if (token && userType && lastLogin) {
        const isSessionValid =
          Date.now() - Number(lastLogin) < SESSION_DURATION;
        if (isSessionValid) {
          setUser({ userType, token, selectedDestination });
          if (selectedDestination) {
            router.replace(selectedDestination);
          }
        } else {
          localStorage.clear();
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userType", userData.userType);
    localStorage.setItem("lastLogin", Date.now().toString());
    if (userData.selectedDestination) {
      localStorage.setItem("selectedDestination", userData.selectedDestination);
    }
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Clear all auth-related items from localStorage
      localStorage.clear();
      // Reset user state
      setUser(null);
      // Reset any other auth-related state
      setLoading(false);
      // Redirect to login page
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
