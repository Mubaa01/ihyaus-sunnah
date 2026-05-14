// src/components/staff/StaffFilters.jsx

const StaffFilters = ({
  search,
  setSearch,
  section,
  setSection,
  category,
  setCategory,
  role,
  setRole,
}) => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <input
            type="text"
            placeholder="Search staff or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-primary"
          />

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="input-primary"
          >
            <option>All</option>
            <option>Islamiyyah</option>
            <option>Tahfeez</option>
            <option>Arabic Studies</option>
            <option>Western Education</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-primary"
          >
            <option>All</option>
            <option>Board of Trustees</option>
            <option>Senior Staff</option>
            <option>Staff I</option>
            <option>Staff II</option>
            <option>Staff III</option>
          </select>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-primary"
          >
            <option>All</option>
            <option>Director</option>
            <option>Head of Islamiyyah</option>
            <option>Head of Tahfeez</option>
            <option>Head of Arabic Studies</option>
            <option>Head of Western Education</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default StaffFilters;