import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaHandsHelping } from "react-icons/fa"

const ctaCopy = {
  active: {
    title: "Ready To Join This Program?",
    body: "Contact the program team to register, ask questions, or confirm the next available class.",
    primary: "Enroll / Register",
    secondary: "Support This Program",
  },
  upcoming: {
    title: "Interested In The Next Intake?",
    body: "Join the waitlist or contact the program team for start dates, requirements, and placement guidance.",
    primary: "Join Waitlist",
    secondary: "Support This Program",
  },
  completed: {
    title: "This Program Has Been Completed",
    body: "Contact the team for future sessions or explore other active educational programs.",
    primary: "Contact Admin",
    secondary: "View Other Programs",
  },
}

const ProgramCTASection = ({ program }) => {
  const title = program?.title || "this program"
  const subject = encodeURIComponent(`Program enquiry: ${title}`)
  const copy = ctaCopy[program?.status] || ctaCopy.active

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-r from-primary via-primary to-primaryLight py-24 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
          alt="Community Support"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="container-custom relative z-10 text-center"
      >
        <FaHandsHelping className="mx-auto mb-8 text-6xl text-secondary" />
        <h2 className="mb-8 text-5xl font-bold leading-tight md:text-6xl">
          {copy.title}
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-xl font-light leading-relaxed text-white/90 md:text-2xl">
          {copy.body}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href={`mailto:info@ihyaussunnah.org?subject=${subject}`}>
            <button className="btn-primary px-10 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              {copy.primary}
            </button>
          </a>

          {program?.status === "completed" ? (
            <Link to="/programs">
              <button className="btn-secondary px-10 py-4 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                {copy.secondary}
              </button>
            </Link>
          ) : (
            <Link to="/donate">
              <button className="btn-secondary px-10 py-4 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                {copy.secondary}
              </button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ProgramCTASection
