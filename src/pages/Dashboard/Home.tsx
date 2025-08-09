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
        title="Rental Services Admin Dashboard"
        description="Manage your rental services efficiently — track properties, clients, and operations all in one place."
      />

      {/* Heading Section */}
      <section className="mb-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-2">
          {/* Heading with icon */}
          <div className="flex items-center gap-3 flex-wrap">
            <Building2 className="w-8 h-8 text-[#465FFF]" />
            <h1 className="text-3xl font-extrabold text-[#465FFF] whitespace-nowrap">
              Rental Services Admin
            </h1>
          </div>

          {/* Paragraph with icon below heading */}
          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 max-w-xl">
            <p className="text-base sm:text-lg leading-relaxed">
              Manage rental properties, monitor tenant requests, and handle
              operations seamlessly — all from one dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
