import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const AdminStatCard = ({
  title,
  value,
  icon,
  color,
  trend,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-sm font-medium text-neutral-400">
            {title}
          </p>

          <div className="flex flex-wrap items-baseline gap-2">
            <h2 className="text-3xl font-semibold leading-none text-primary">
              {value}
            </h2>
            {trend && (
              <div className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.direction === 'up' ? (
                  <FaArrowUp className="w-3 h-3" />
                ) : (
                  <FaArrowDown className="w-3 h-3" />
                )}
                {trend.value}
              </div>
            )}
          </div>

          {description && (
            <p className="mt-3 text-sm text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-xl ${color}`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminStatCard;
