import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics({ stats }) {
  if (!stats) return null;

  // Define which fields to display dynamically
  const metricItems = [
    {
      key: "monthly_users",
      label: "Users",
      icon: <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
      value: stats.monthly_users,
      subText: "",
      growth: null,
    },
    {
      key: "properties",
      label: "To-Let India Properties",
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      value: stats.properties?.total,
      subText: `Approved: ${stats.properties?.approved || 0}`,
      growth: stats.properties?.growth_percentage,
    },
    {
      key: "hostels",
      label: "Hostels",
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      value: stats.hostels?.total,
      subText: `Approved: ${stats.hostels?.approved || 0}`,
      growth: stats.hostels?.growth_percentage,
    },
    {
      key: "convention_halls",
      label: "Convention Halls",
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
      value: stats.convention_halls?.total,
      subText: `Approved: ${stats.convention_halls?.approved || 0}`,
      growth: stats.convention_halls?.growth_percentage,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {metricItems.map((item) => (
        <div
          key={item.key}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {item.icon}
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.label}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {item.value ?? "--"}
              </h4>
              {item.subText && <p className="text-gray-400">{item.subText}</p>}
            </div>

            {/* Growth Badge */}
            {typeof item.growth === "number" ? (
              <Badge color={item.growth > 0 ? "success" : "error"}>
                {item.growth > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {item.growth > 0 ? "+" : ""}
                {item.growth}%
              </Badge>
            ) : (
              <Badge color="error">
                <ArrowDownIcon />
                0%
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
