import { Building2, ClipboardList } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Rental Services Admin Dashboard"
        description="Manage your rental services efficiently — track properties, clients, and operations all in one place."
      />

      <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
        {/* Icon */}
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Building2 className="w-10 h-10 text-primary" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#465FFF] mb-2">
          Welcome to Rental Services Admin
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 max-w-xl mb-6">
          Manage rental properties, monitor tenant requests, and handle
          operations seamlessly — all from one dashboard.
        </p>

        {/* Example Action Buttons */}
        {/* <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            <Building2 className="w-4 h-4" />
            Manage Properties
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            <ClipboardList className="w-4 h-4" />
            View Reports
          </button>
        </div> */}
      </div>
    </>
  );
}
