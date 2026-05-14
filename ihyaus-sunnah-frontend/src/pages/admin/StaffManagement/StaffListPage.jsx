// src/pages/admin/StaffManagement/StaffListPage.jsx

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaUsers,
  FaEye,
} from "react-icons/fa"

import useStaff from "../../../hooks/useStaff"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const StaffListPage = () => {
  const { staff, removeStaff } = useStaff()

  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  // ROLE LABEL MAPPER (same hierarchy logic used across app)
  const getRoleLabel = (role) => {
    switch (role) {
      case "director":
        return "Leadership Directorate"
      case "board":
        return "Board of Trustees"
      case "senior":
        return "Senior Staff"
      case "staff-i":
        return "Staff I"
      case "staff-ii":
        return "Staff II"
      case "staff-iii":
        return "Staff III"
      default:
        return "Staff Member"
    }
  }

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchesSearch =
        member.name?.toLowerCase().includes(search.toLowerCase()) ||
        member.position?.toLowerCase().includes(search.toLowerCase())

      const matchesRole =
        roleFilter === "All" || member.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [staff, search, roleFilter])

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = () => {
    removeStaff(selectedId)
    setShowModal(false)
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-primary">
            Staff Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage leadership structure, academic staff, and administrative workforce.
          </p>
        </div>

        <Link to="/admin/staff/create" className="btn-primary">
          + Add Staff
        </Link>

      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">

        <div className="grid md:grid-cols-2 gap-4">

          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search staff by name or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* ROLE FILTER */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Roles</option>
            <option value="director">Director</option>
            <option value="board">Board of Trustees</option>
            <option value="senior">Senior Staff</option>
            <option value="staff-i">Staff I</option>
            <option value="staff-ii">Staff II</option>
            <option value="staff-iii">Staff III</option>
          </select>

        </div>
      </div>

      {/* STAFF GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredStaff.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
          >

            {/* IMAGE */}
            <div className="relative h-80 overflow-hidden">

              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* ROLE */}
              <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm capitalize">
                {getRoleLabel(member.role)}
              </div>

              {/* INFO */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-2xl font-bold">
                  {member.name}
                </h2>

                <p className="text-gold mt-1">
                  {member.position}
                </p>
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-5">

              {/* SECTIONS */}
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-3">
                  Departments
                </p>

                <div className="flex flex-wrap gap-2">
                  {member.sections?.map((section) => (
                    <span
                      key={section}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>

              {/* BIO */}
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {member.bio}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2 flex-col sm:flex-row">

                <Link
                  to={`/admin/staff/view/${member.id}`}
                  className="flex-1 bg-secondary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEye /> View
                </Link>

                <Link
                  to={`/admin/staff/${member.id}`}
                  className="flex-1 bg-primary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  onClick={() => handleDeleteClick(member.id)}
                  className="w-full sm:w-14 rounded-2xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredStaff.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center">
          <FaUsers className="mx-auto text-6xl text-gray-300 mb-5" />

          <h3 className="text-3xl font-bold text-primary">
            No Staff Found
          </h3>

          <p className="text-gray-500 mt-3">
            Try adjusting your filters or search.
          </p>
        </div>
      )}

      {/* MODAL */}
      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />

    </div>
  )
}

export default StaffListPage