import { motion } from "framer-motion"
import { FaCheckCircle } from "react-icons/fa"

const ProgramObjectivesSection = ({ program }) => {
  const objectives = program.objectives?.filter(Boolean) || []

  if (!objectives.length) return null

  return (
    <section className="section-padding bg-white py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="section-badge mb-4 inline-flex">Learning Objectives</span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">
            What Students Will Gain
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Clear outcomes help students, parents, and supporters understand the expected growth from this program.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {objectives.map((objective, index) => (
            <motion.div
              key={`${objective}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              viewport={{ once: true }}
              className="flex gap-4 rounded-lg border border-gray-100 bg-cream p-5 shadow-soft"
            >
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <FaCheckCircle />
              </span>
              <p className="leading-relaxed text-gray-700">{objective}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramObjectivesSection
