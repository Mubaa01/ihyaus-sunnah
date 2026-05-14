import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'

const ProgramTestimonialsSection = ({ program }) => {
  if (!program.testimonials || program.testimonials.length === 0) {
    return null
  }

  return (
    <section className="section-padding py-24 bg-cream relative">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Student Testimonials</span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">What People Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {program.testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-cream p-10 rounded-3xl shadow-soft border border-gray-100 hover:shadow-soft hover:-translate-y-1 transition duration-500"
            >
              <FaQuoteLeft className="text-secondary text-4xl mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "{item.quote}"
              </p>
              <h4 className="font-bold text-primary">{item.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramTestimonialsSection
