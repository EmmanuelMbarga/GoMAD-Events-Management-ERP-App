import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Layout({ children }) {
  return (
    <main className="flex flex-row p-5 gap-2.5 h-screen w-full bg-white">
      <Sidebar />
      <div className="flex flex-col w-full gap-2.5">
        <Navbar />
        <div>{children}</div>
      </div>
    </main>
  );
}
