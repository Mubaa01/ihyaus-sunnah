import { motion } from "framer-motion"
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa"

const statusLabels = {
  active: "Active",
  upcoming: "Upcoming",
  completed: "Completed",
}

const formatDate = (value) => {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const ProgramAtGlanceSection = ({ program }) => {
  const startDate = formatDate(program.startDate)
  const endDate = formatDate(program.endDate)
  const dateRange = [startDate, endDate].filter(Boolean).join(" - ") || "Dates TBA"

  const items = [
    {
      icon: <FaCalendarAlt />,
      label: "Days",
      value: program.schedule?.days || "Flexible",
    },
    {
      icon: <FaClock />,
      label: "Time",
      value: program.schedule?.time || "Time TBA",
    },
    {
      icon: <FaUsers />,
      label: "Students",
      value: program.stats?.totalStudents || 0,
    },
    {
      icon: <FaBookOpen />,
      label: "Category",
      value: program.category || "Program",
    },
    {
      icon: <FaCheckCircle />,
      label: "Status",
      value: statusLabels[program.status] || "Open",
    },
    {
      icon: <FaCalendarAlt />,
      label: "Program Dates",
      value: dateRange,
    },
  ]

  return (
    <section className="relative z-20 -mt-16 pb-10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="grid gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-premium md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-lg border border-gray-100 bg-cream px-4 py-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {item.label}
                </p>
                <p className="mt-1 truncate font-bold text-primary">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProgramAtGlanceSection
