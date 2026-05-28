import { motion } from "framer-motion"

const ProgramScheduleSection = ({ program }) => {
  if (!program.schedule) {
    return null
  }

  const routine = program.schedule.dailyStructure?.filter(Boolean) || []

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primaryLight py-24 text-white">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-badge-dark">Schedule</span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Daily Routine
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            {program.schedule.days || "Scheduled"} &bull; {program.schedule.time || "Time TBA"}
          </p>
        </motion.div>

        {routine.length ? (
          <div className="mx-auto max-w-4xl space-y-6">
            {routine.map((item, index) => (
              <motion.div
                key={`${item.time || "time"}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="glass-card flex flex-col gap-4 rounded-lg border border-white/20 p-6 backdrop-blur-md transition duration-300 hover:border-secondary/50 md:flex-row md:items-center md:justify-between"
              >
                <div className="text-lg font-bold text-secondary-light">
                  {item.time || "Time TBA"}
                </div>
                <div className="text-xl font-semibold">
                  {item.activity || "Program activity"}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-lg border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md">
            <p className="text-xl font-semibold">
              Detailed daily routine will be announced by the program team.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProgramScheduleSection
