import { motion } from "framer-motion"
import {
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa"

const statusLabels = {
  active: "Active",
  upcoming: "Upcoming",
  completed: "Completed",
}

const ProgramAtGlanceSection = ({ program }) => {
  const items = [
    {
      icon: <FaLayerGroup />,
      label: "Category",
      value: program.category || "Program",
    },
    {
      icon: <FaUsers />,
      label: "Students",
      value: program.stats?.totalStudents
        ? `${program.stats.totalStudents}+ enrolled`
        : "Open enrollment",
    },
    {
      icon: <FaClock />,
      label: "Schedule",
      value: [program.schedule?.days, program.schedule?.time].filter(Boolean).join(" / ") || "Flexible",
    },
    {
      icon: <FaCheckCircle />,
      label: "Status",
      value: statusLabels[program.status] || "Open",
    },
  ]

  return (
    <section className="relative z-20 bg-white py-8 md:py-10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="grid gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-card sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-cream px-3 py-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {item.label}
                </p>
                <p className="mt-1 truncate text-sm font-bold text-primary">
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
