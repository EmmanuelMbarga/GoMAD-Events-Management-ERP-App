"use client";
// filepath: /c:/Users/user/Desktop/Projects/3- In Progress/GoMAD Event Management App/frontend/utils/withAuth.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!user) {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <p>Loading...</p>; // Show a loading message while checking auth status
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;
