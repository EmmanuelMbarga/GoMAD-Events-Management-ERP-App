import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar /> {/* Sidebar spans full height */}
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow overflow-auto p-4 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
