import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHandsHelping } from 'react-icons/fa'

const ProgramCTASection = ({ program }) => {
  const title = program?.title || 'this program'
  const subject = encodeURIComponent(`Program enquiry: ${title}`)

  return (
    <section className="section-padding py-24 bg-gradient-to-r from-primary via-primary to-primaryLight text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
          alt="Community Support"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container-custom relative z-10 text-center"
      >
        <FaHandsHelping className="text-secondary text-6xl mx-auto mb-8" />
        <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          Support This Program
        </h2>
        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90 leading-relaxed mb-12 font-light">
          Help us continue building beneficial knowledge,
          nurturing righteous students, and serving the Ummah.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href={`mailto:info@ihyaussunnah.org?subject=${subject}`}>
            <button className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-300">
              Enroll / Register
            </button>
          </a>
          <Link to="/donate">
            <button className="btn-secondary text-lg px-10 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Sponsor This Program
            </button>
          </Link>
          <a href={`mailto:info@ihyaussunnah.org?subject=${subject}`}>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-4 rounded-lg transition-all duration-300 font-semibold">
              Contact Admin
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ProgramCTASection
