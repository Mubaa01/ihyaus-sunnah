import { motion } from 'framer-motion'

const fallbackBenefits = [
  {
    title: 'Holistic Learning',
    description:
      'Students benefit from a balanced curriculum, character building, mentorship, and community engagement.',
  },
  {
    title: 'Trusted Mentors',
    description:
      'Instructors guide learners with care, spiritual direction, and strong educational standards.',
  },
  {
    title: 'Real Results',
    description:
      'Students grow in confidence, discipline, beneficial knowledge, and practical commitment.',
  },
]

const ProgramBenefitsSection = ({ program }) => {
  const dynamicBenefits = program?.features?.filter(Boolean).slice(0, 3).map((feature) => ({
    title: feature,
    description:
      'A focused part of this program designed to strengthen learning, discipline, and beneficial growth.',
  }))

  const benefits = dynamicBenefits?.length ? dynamicBenefits : fallbackBenefits

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
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-xl shadow-soft border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProgramBenefitsSection
