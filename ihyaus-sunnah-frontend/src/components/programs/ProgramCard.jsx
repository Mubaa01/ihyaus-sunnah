// src/components/programs/ProgramCard.jsx

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import {
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa"

const ProgramCard = ({
  program,
  index = 0,
}) => {
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
      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
    >

      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">

        <img
          src={
            program.thumbnail
          }
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* CATEGORY */}
        <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
          {program.category}
        </div>

        {/* STATUS */}
        <div
          className={`absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusStyle(
            program.status
          )}`}
        >
          {program.status}
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-6 left-6 right-6 text-white">

          <h2 className="text-3xl font-bold leading-tight mb-3">
            {program.title}
          </h2>

          <p className="text-gray-200 line-clamp-2 leading-relaxed">
            {
              program.shortDescription
            }
          </p>

        </div>

      </div>

      {/* BODY */}
      <div className="p-7 space-y-6">

        {/* META */}
        <div className="grid sm:grid-cols-2 gap-4">

          {/* DURATION */}
          <div className="flex items-start gap-3">

            <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <FaClock />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Duration
              </p>

              <p className="font-semibold text-primary">
                {program.duration}
              </p>
            </div>

          </div>

          {/* LOCATION */}
          <div className="flex items-start gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Location
              </p>

              <p className="font-semibold text-primary line-clamp-1">
                {program.location}
              </p>
            </div>

          </div>

        </div>

        {/* FEATURES */}
        <div>

          <p className="text-sm font-semibold text-gray-500 mb-3">
            Program Highlights
          </p>

          <div className="flex flex-wrap gap-2">

            {program.features
              ?.slice(0, 3)
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
        <Link
          to={`/programs/${program.slug}`}
          className="group/button flex items-center justify-between bg-primary text-white px-6 py-4 rounded-2xl hover:bg-primary-dark transition-all duration-300"
        >

          <span className="font-semibold">
            View Program
          </span>

          <FaArrowRight className="group-hover/button:translate-x-1 transition-transform duration-300" />

        </Link>

      </div>
    </motion.div>
  )
}

export default ProgramCard