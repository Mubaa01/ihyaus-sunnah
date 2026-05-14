import { motion } from 'framer-motion'
import { getStaffById } from '../../data/mock/staffStore'

const ProgramStaffSection = ({ program }) => {
  if (!program.staffHighlights || program.staffHighlights.length === 0) {
    return null
  }

  return (
    <section className="section-padding py-24 bg-white relative">
      <div className="absolute top-0 right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Expert Educators</span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">Meet Our Teachers</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {program.staffHighlights.map((highlight, index) => {
            const staffMember = getStaffById(highlight.staffId)
            if (!staffMember) return null

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-2 transition duration-500"
              >
                <img
                  src={staffMember.image}
                  alt={staffMember.name}
                  className="w-full h-80 object-cover hover:scale-105 transition duration-500"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {staffMember.name}
                  </h3>
                  <p className="text-secondary font-semibold mb-2">
                    {staffMember.position}
                  </p>
                  <p className="text-sm text-gold mb-4">
                    {highlight.role} • {highlight.categoryFocus}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {staffMember.bio}
                  </p>
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
