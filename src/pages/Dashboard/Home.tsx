import { Building2, ClipboardList } from "lucide-react";
import PageMeta from "../../components/common/PageMeta";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";

export default function Home() {
  return (
    <>
      <PageMeta
        title="To-Let India Services Admin Dashboard"
        description="Manage your To-Let India services efficiently — track properties, clients, and operations all in one place."
      />

      {/* Heading Section */}
      <section className="mb-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          {/* Heading with icon */}
          <div className="flex items-center gap-3 flex-wrap">
            <Building2 className="w-8 h-8 text-[#7C0902]" />
            <h1 className="text-3xl font-extrabold text-[#7C0902] whitespace-nowrap">
              To-Let India Services Admin
            </h1>
          </div>

          {/* Paragraph with icon below heading */}
          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 max-w-xl">
            <p className="text-base sm:text-lg leading-relaxed">
              Manage To-Let India properties, monitor tenant requests, and
              handle operations seamlessly — all from one dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="col-span-12 space-y-6">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 ">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12">{/* <StatisticsChart /> */}</div>
      </div>
    </>
  );
}
