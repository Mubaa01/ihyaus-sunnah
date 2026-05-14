import { FaSearch } from "react-icons/fa";

const AdminSearchBar = ({
  search,
  setSearch,
}) => {
  return (
    <div
      className="flex items-center gap-3
      bg-white rounded-2xl px-5 py-4
      border border-gray-100 shadow-soft"
    >
      <FaSearch className="text-gray-400" />

      <input
        type="text"
        placeholder="Search staff..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="bg-transparent outline-none w-full"
      />
    </div>
  );
};

export default AdminSearchBar;