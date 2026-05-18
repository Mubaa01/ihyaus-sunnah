// src/pages/admin/ProgramManagement/ProgramListPage.jsx

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaBookOpen,
  FaEye,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa"

import useProgramsAPI from "../../../hooks/useProgramsAPI"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const ProgramListPage = () => {
  const { programs, removeProgram } = useProgramsAPI()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.title?.toLowerCase().includes(search.toLowerCase()) ||
        program.category?.toLowerCase().includes(search.toLowerCase()) ||
        program.instructor?.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        categoryFilter === "All" || program.category === categoryFilter

      const matchesStatus =
        statusFilter === "All" || program.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [programs, search, categoryFilter, statusFilter])

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = () => {
    removeProgram(selectedId)
    setShowModal(false)
  }

  // Get unique categories for filter
  const categories = useMemo(() => {
    return [...new Set(programs.map(p => p.category).filter(Boolean))]
  }, [programs])

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-primary">
            Program Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage educational programs, courses, and community initiatives.
          </p>
        </div>

        <Link to="/admin/programs/create" className="btn-primary">
          + Add Program
        </Link>

      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">

        <div className="grid md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* CATEGORY FILTER */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>

        </div>
      </div>

      {/* PROGRAMS GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
          >

            {/* IMAGE */}
            <div className="relative h-64 overflow-hidden">

              <img
                src={program.thumbnail}
                alt={program.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* STATUS BADGE */}
              <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm capitalize">
                {program.status}
              </div>

              {/* CATEGORY */}
              <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-md border border-white/20 text-white text-sm">
                {program.category}
              </div>

              {/* INFO */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-2xl font-bold line-clamp-2">
                  {program.title}
                </h2>

                <p className="text-gold mt-1 flex items-center gap-2">
                  <FaUsers className="text-sm" />
                  {program.stats?.totalStudents || 0} Students
                </p>
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-5">

              {/* DETAILS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarAlt />
                  <span>{program.duration}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaBookOpen />
                  <span>{program.instructor}</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {program.shortDescription}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2 flex-col sm:flex-row">

                <Link
                  to={`/programs/${program.slug}`}
                  className="flex-1 bg-secondary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEye /> View Public
                </Link>

                <Link
                  to={`/admin/programs/${program.id}`}
                  className="flex-1 bg-primary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  onClick={() => handleDeleteClick(program.id)}
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
      {filteredPrograms.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center">
          <FaBookOpen className="mx-auto text-6xl text-gray-300 mb-5" />

          <h3 className="text-3xl font-bold text-primary">
            No Programs Found
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

export default ProgramListPage