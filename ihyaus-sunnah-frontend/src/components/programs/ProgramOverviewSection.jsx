import { motion } from 'framer-motion'
import { FaBookOpen } from 'react-icons/fa'

const ProgramOverviewSection = ({ program }) => {
  return (
    <section className="section-padding py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="section-badge mb-4 inline-block">About This Program</span>
            <h2 className="section-title mt-4 mb-10 text-4xl md:text-5xl leading-tight">
              Building Knowledge, Character & Excellence
            </h2>
            <div className="space-y-8 text-gray-700 leading-relaxed text-lg font-light">
              {(Array.isArray(program.fullDescription)
                ? program.fullDescription
                : [program.fullDescription]
              ).map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {(program.features || []).slice(0, 4).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-cream p-5 rounded-3xl border border-gray-100 shadow-sm"
                >
                  <p className="text-base text-secondary font-semibold">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <img
                src={program.overviewImage || program.banner}
                alt={`${program.title} overview`}
                className="rounded-3xl w-full h-64 object-cover shadow-2xl"
              />
              <img
                src={program.thumbnail || program.banner}
                alt={`${program.title} classroom`}
                className="rounded-3xl w-full h-64 object-cover shadow-2xl"
              />
            </div>

            {program.verse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-3xl shadow-2xl max-w-sm"
              >
                <FaBookOpen className="text-secondary text-4xl mb-4" />
                <p className="font-arabic text-2xl leading-loose mb-4" dir="rtl">
                  {program.verse.arabic}
                </p>
                <p className="text-gray-200 italic mb-2">
                  "{program.verse.translation}"
                </p>
                <p className="text-secondary-light text-sm">
                  {program.verse.reference}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProgramOverviewSection
