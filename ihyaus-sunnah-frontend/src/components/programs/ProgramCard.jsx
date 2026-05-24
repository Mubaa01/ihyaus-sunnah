// src/components/programs/ProgramCard.jsx

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import {
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaBookOpen,
  FaHandsHelping,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa"

const fallbackProgramImage =
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop"

const ProgramCard = ({
  program,
  index = 0,
}) => {
  const detailId = program.slug || program._id || program.id
  const features = program.features || []
  const detailPath = detailId ? `/programs/${detailId}` : null
  const title = program.title || "Educational Program"
  const description =
    program.shortDescription ||
    "Structured learning, mentorship, and character development."
  const category = program.category || "Program"
  const status = program.status || "active"
  const level =
    program.ageGroup ||
    program.level ||
    program.targetAge ||
    program.audience ||
    program.categories?.[0]?.ageRange ||
    program.categories?.[0]?.categoryType ||
    "All learners"
  const schedule = program.schedule
    ? [program.schedule.days, program.schedule.time].filter(Boolean).join(" / ")
    : ""
  const enrolled = Number(program.stats?.totalStudents || program.enrollment?.enrolled || 0)
  const capacity = Number(program.enrollment?.capacity || 0)
  const enrollmentText = enrolled
    ? `${enrolled}${capacity ? ` / ${capacity}` : ""} enrolled`
    : "Open enrollment"
  const enrollmentProgress =
    enrolled && capacity ? Math.min(100, Math.round((enrolled / capacity) * 100)) : null
  const highlights = features.length
    ? features
    : ["Structured learning", "Qualified mentorship", "Character growth"]
  const updateGlowPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()

    event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`)
  }

  const getStatusStyle = (
    status
  ) => {
    switch (status) {
      case "active":
        return "bg-green-500/90 text-white"

      case "upcoming":
        return "bg-yellow-500/90 text-white"

      case "completed":
        return "bg-gray-700/90 text-white"

      default:
        return "bg-primary/90 text-white"
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -10,
      }}
      onMouseMove={updateGlowPosition}
      data-program-glow
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-premium"
    >

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden bg-primary/10">

        <img
          src={program.thumbnail || program.banner || fallbackProgramImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* CATEGORY */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
          <FaBookOpen className="text-gold" />
          {category}
        </div>

        {/* STATUS */}
        <div
          className={`absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-5 left-5 right-5 text-white">

          <h2 className="mb-3 text-2xl md:text-3xl font-bold leading-tight">
            {title}
          </h2>

          <p className="text-gray-200 line-clamp-2 leading-relaxed">
            {description}
          </p>

        </div>

      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col p-6 md:p-7">

        {/* META */}
        <div className="grid gap-4 sm:grid-cols-2">

          {/* DURATION */}
          <div className="flex items-start gap-3">

            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FaClock />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Duration
              </p>

              <p className="font-semibold text-primary">
                {program.duration || "Ongoing"}
              </p>
            </div>

          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-3">

            <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-semibold text-primary line-clamp-1">
                {program.location || "Foundation Campus"}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <FaLayerGroup />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Age / Level
              </p>
              <p className="font-semibold text-primary line-clamp-1">
                {level}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FaUsers />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Enrollment
              </p>
              <p className="font-semibold text-primary line-clamp-1">
                {enrollmentText}
              </p>
            </div>
          </div>
        </div>

        {schedule && (
          <div className="mt-5 rounded-lg border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
            {schedule}
          </div>
        )}

        {enrollmentProgress !== null && (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
              <span>Enrollment</span>
              <span>{enrollmentProgress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${enrollmentProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* FEATURES */}
        <div className="mt-6">

          <p className="text-sm font-semibold text-gray-500 mb-3">
            Program Highlights
          </p>

          <div className="flex flex-wrap gap-2">

            {highlights
              .slice(0, 3)
              .map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {feature}
                </span>
              ))}

          </div>

        </div>

        {/* CTA */}
        <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-[1fr_auto]">
          {detailPath ? (
            <Link
              to={detailPath}
              className="group/button flex items-center justify-center gap-3 bg-primary text-white px-5 py-4 rounded-lg hover:bg-primaryLight transition-all duration-300"
            >
              <span className="font-semibold">
                View Details
              </span>
              <FaArrowRight className="group-hover/button:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : (
            <div className="flex items-center justify-center bg-gray-100 text-gray-500 px-5 py-4 rounded-lg">
              <span className="font-semibold">
                Details Coming Soon
              </span>
            </div>
          )}

          <Link
            to="/donate"
            className="flex items-center justify-center gap-2 rounded-lg border border-primary/15 px-5 py-4 font-semibold text-primary transition-all duration-300 hover:border-gold hover:bg-gold/10"
          >
            <FaHandsHelping />
            Sponsor
          </Link>
        </div>

      </div>
    </motion.div>
  )
}

export default ProgramCard
