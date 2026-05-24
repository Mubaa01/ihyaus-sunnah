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
      className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-neutral-500 sm:text-base">
          {description}
        </p>
      </div>

      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default AdminPageHeader;
