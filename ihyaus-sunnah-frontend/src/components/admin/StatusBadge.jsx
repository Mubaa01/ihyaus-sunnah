const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-xs font-semibold
      ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;