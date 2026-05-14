import { motion } from 'framer-motion'

const ProgramBenefitsSection = () => {
  return (
    <section className="section-padding py-24 bg-cream relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4 inline-block">Program Benefits</span>
          <h2 className="section-title mt-4 text-4xl md:text-5xl">
            Why This Program Stands Out
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mx-auto mt-6">
            Each program is designed to produce confident learners, strong memorization habits, and a deep understanding of Islamic knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Holistic Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Students benefit from a balanced curriculum of memorization, tajweed, Islamic sciences, character building, and community engagement.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Trusted Mentors</h3>
            <p className="text-gray-600 leading-relaxed">
              Our instructors are experienced teachers who deliver lessons with care, spiritual guidance, and the highest standards of Islamic etiquette.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-soft border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Real Results</h3>
            <p className="text-gray-600 leading-relaxed">
              Graduates leave with strong Quranic fluency, deeper understanding of Islamic science, and the confidence to lead with sincerity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProgramBenefitsSection
