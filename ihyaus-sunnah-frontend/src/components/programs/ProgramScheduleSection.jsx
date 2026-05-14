import { motion } from 'framer-motion'

const ProgramScheduleSection = ({ program }) => {
  if (!program.schedule || !program.schedule.dailyStructure) {
    return null
  }

  return (
    <section className="section-padding py-24 bg-gradient-to-br from-primary via-primary to-primary-light text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge-dark">Schedule</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Daily Routine
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            {program.schedule.days} • {program.schedule.time}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {program.schedule.dailyStructure.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 backdrop-blur-md border border-white/20 hover:border-secondary/50 transition duration-300"
            >
              <div className="text-secondary-light font-bold text-lg">
                {item.time}
              </div>
              <div className="text-xl font-semibold">
                {item.activity}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramScheduleSection
