import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const AdminActionMenu = () => {
  return (
    <div className="flex items-center gap-3">
      <button
        className="w-10 h-10 rounded-xl bg-blue-50
        text-blue-600 hover:scale-105 transition"
      >
        <FaEye className="mx-auto" />
      </button>

      <button
        className="w-10 h-10 rounded-xl bg-yellow-50
        text-yellow-600 hover:scale-105 transition"
      >
        <FaEdit className="mx-auto" />
      </button>

      <button
        className="w-10 h-10 rounded-xl bg-red-50
        text-red-600 hover:scale-105 transition"
      >
        <FaTrash className="mx-auto" />
      </button>
    </div>
  );
};

export default AdminActionMenu;