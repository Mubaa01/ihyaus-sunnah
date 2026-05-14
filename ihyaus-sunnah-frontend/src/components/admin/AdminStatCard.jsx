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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-1">
            {title}
          </p>

          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-primary">
              {value}
            </h2>
            {trend && (
              <div className={`flex items-center gap-1 text-sm font-medium ${
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
            <p className="text-xs text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color} shadow-lg`}
        >
          {icon}
        </div>
      </div>

      {/* Progress bar for visual appeal */}
      <div className="w-full bg-gray-100 rounded-full h-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`h-1 rounded-full ${
            color.includes('blue') ? 'bg-blue-500' :
            color.includes('green') ? 'bg-green-500' :
            color.includes('purple') ? 'bg-purple-500' :
            color.includes('yellow') ? 'bg-yellow-500' :
            'bg-gray-500'
          }`}
        />
      </div>
    </motion.div>
  );
};

export default AdminStatCard;