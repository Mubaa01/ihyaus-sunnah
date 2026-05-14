import { motion } from "framer-motion";

const AdminPageHeader = ({
  title,
  description,
  action,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
    >
      <div>
        <h1 className="text-4xl font-heading font-bold text-primary">
          {title}
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl">
          {description}
        </p>
      </div>

      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default AdminPageHeader;