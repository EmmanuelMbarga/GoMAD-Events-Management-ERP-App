import DashboardLayout from "../components/DashboardLayout";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isDashboardPage = router.pathname.startsWith("/dashboard");

  if (isDashboardPage) {
    return (
      <AuthProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
