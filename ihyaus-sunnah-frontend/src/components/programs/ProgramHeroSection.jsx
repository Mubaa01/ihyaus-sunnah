import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaBookOpen,
  FaChalkboardTeacher,
  FaClock,
  FaCalendarAlt
} from 'react-icons/fa'
import QuranVersePanel from '../common/QuranVersePanel'

const fallbackHeroImage =
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop'

const defaultProgramVerse = {
  arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
  translation: 'Read in the name of your Lord who created.',
  reference: 'Surah Al-Alaq 96:1',
}

const ProgramHeroSection = ({ program }) => {
  const title = program.title || 'Educational Program'
  const programSummary =
    program.tagline ||
    program.shortDescription ||
    'Structured learning, mentorship, and character development.'
  const enrollSubject = encodeURIComponent(`Program enquiry: ${title}`)
  const sourceVerse = program.verse || defaultProgramVerse
  const verse = {
    ...sourceVerse,
    reference: sourceVerse.reference?.includes('Surah')
      ? sourceVerse.reference
      : sourceVerse.reference
        ? `Qur'an ${sourceVerse.reference}`
        : defaultProgramVerse.reference,
  }

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${program.banner || program.thumbnail || program.heroImage || fallbackHeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40"></div>

      <div className="container-custom relative z-10 text-white py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary-light transition duration-300"
          >
            <FaArrowLeft />
            Back to Programs
          </Link>
        </motion.div>

        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-semibold text-secondary-light mb-8"
          >
            <FaBookOpen size={16} />
            IHYAUS SUNNAH FOUNDATION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl text-gray-200 leading-relaxed mb-12 max-w-3xl"
          >
            {programSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-wrap gap-6 mb-12"
          >
            <div className="glass-card px-6 py-4 rounded-lg backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-3">
                <FaChalkboardTeacher className="text-secondary text-2xl" />
                <div>
                  <p className="text-2xl font-bold">{program.instructor || "Instructor"}</p>
                  <p className="text-sm text-gray-300">Instructor</p>
                </div>
              </div>
            </div>

            <div className="glass-card px-6 py-4 rounded-lg backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-3">
                <FaClock className="text-secondary text-2xl" />
                <div>
                  <p className="text-2xl font-bold">{program.duration || "Ongoing"}</p>
                  <p className="text-sm text-gray-300">Duration</p>
                </div>
              </div>
            </div>

            <div className="glass-card px-6 py-4 rounded-lg backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-3">
                <FaBookOpen className="text-secondary text-2xl" />
                <div>
                  <p className="text-2xl font-bold">{program.location || "Location"}</p>
                  <p className="text-sm text-gray-300">Location</p>
                </div>
              </div>
            </div>

            {program.schedule && (
              <div className="glass-card px-6 py-4 rounded-lg backdrop-blur-md border border-white/20">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-secondary text-2xl" />
                  <div>
                    <p className="text-lg font-bold">
                      {program.schedule.days || 'Scheduled'} • {program.schedule.time || 'Time TBA'}
                    </p>
                    <p className="text-sm text-gray-300">Schedule</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          <QuranVersePanel {...verse} className="mb-12 max-w-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass-card p-6 rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-sm text-gray-300 uppercase tracking-[0.25em] mb-3">Students enrolled</p>
              <p className="text-4xl font-bold text-white">{program.stats?.totalStudents || 0}</p>
            </div>
            <div className="glass-card p-6 rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-sm text-gray-300 uppercase tracking-[0.25em] mb-3">Dedicated staff</p>
              <p className="text-4xl font-bold text-white">{program.stats?.totalStaff || 0}</p>
            </div>
            <div className="glass-card p-6 rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-sm text-gray-300 uppercase tracking-[0.25em] mb-3">Years running</p>
              <p className="text-4xl font-bold text-white">{program.stats?.yearsRunning || 0}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap gap-5"
          >
            <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
              <button className="btn-primary text-lg px-8 py-4">
                Enroll / Register
              </button>
            </a>

            <Link to="/donate">
              <button className="btn-secondary text-lg px-8 py-4">
                Sponsor This Program
              </button>
            </Link>

            <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
              <button className="btn-outline text-lg px-8 py-4">
                Contact Admin
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProgramHeroSection
