import { motion } from 'framer-motion'
import { FaUserTie } from 'react-icons/fa'

const ProgramStaffSection = ({ program }) => {
  if (!program.staffHighlights || program.staffHighlights.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-subtitle">Program Team</span>
          <h2 className="section-title">Staff Highlights</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {program.staffHighlights.map((highlight, index) => {
            const staff = highlight.staffId && typeof highlight.staffId === 'object'
              ? highlight.staffId
              : null

            return (
              <motion.div
                key={staff?._id || `${highlight.role}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-cream rounded-xl border border-gray-100 shadow-soft overflow-hidden"
              >
                <div className="h-72 bg-primary/10 overflow-hidden">
                  {staff?.image ? (
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-6xl">
                      <FaUserTie />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold text-primary">
                    {staff?.name || 'Program Staff'}
                  </h3>
                  <p className="text-gold font-semibold">
                    {highlight.role || staff?.position || 'Staff Member'}
                  </p>
                  {highlight.categoryFocus && (
                    <p className="text-gray-600">
                      {highlight.categoryFocus}
                    </p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProgramStaffSection
