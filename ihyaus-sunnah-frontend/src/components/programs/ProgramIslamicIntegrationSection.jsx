import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'

const ProgramIslamicIntegrationSection = ({ program }) => {
  if (!program.islamicIntegration) {
    return null
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge">Islamic Integration</span>
          <h2 className="section-title mt-4">Faith-Based Learning Environment</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {program.islamicIntegration.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-soft border border-gray-100 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                <FaBookOpen />
              </div>
              <p className="text-gray-700 font-medium">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramIslamicIntegrationSection
