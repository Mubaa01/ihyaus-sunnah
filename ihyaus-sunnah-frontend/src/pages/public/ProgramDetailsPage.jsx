import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaBookOpen, FaExclamationCircle } from 'react-icons/fa'
import { programsAPI } from '../../services/api'

// Import all section components
import ProgramHeroSection from '../../components/programs/ProgramHeroSection'
import ProgramAtGlanceSection from '../../components/programs/ProgramAtGlanceSection'
import ProgramOverviewSection from '../../components/programs/ProgramOverviewSection'
import ProgramBenefitsSection from '../../components/programs/ProgramBenefitsSection'
import ProgramObjectivesSection from '../../components/programs/ProgramObjectivesSection'
import ProgramCategoriesSection from '../../components/programs/ProgramCategoriesSection'
import ProgramScheduleSection from '../../components/programs/ProgramScheduleSection'
import ProgramStaffSection from '../../components/programs/ProgramStaffSection'
import ProgramTestimonialsSection from '../../components/programs/ProgramTestimonialsSection'
import ProgramIslamicIntegrationSection from '../../components/programs/ProgramIslamicIntegrationSection'
import ProgramCTASection from '../../components/programs/ProgramCTASection'

const ProgramDetailsPage = () => {
  const { slug } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setProgram(null)

    programsAPI.getBySlug(slug)
      .then((res) => {
        setProgram(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || "Failed to load program")
        setLoading(false)
      })
  }, [slug])

  useEffect(() => {
    if (!program?.title) return

    document.title = `${program.title} | Ihyaus Sunnah Programs`
  }, [program?.title])
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 text-center shadow-premium"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FaBookOpen className="text-2xl" />
          </div>
          <div className="mx-auto mb-5 h-2 w-44 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
          <h1 className="text-xl font-bold text-primary">Loading program details</h1>
          <p className="mt-2 text-sm text-muted">
            Preparing the overview, schedule, levels, and learning outcomes.
          </p>
        </motion.div>
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl rounded-lg border border-gray-100 bg-white p-8 text-center shadow-premium"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-red-50 text-gold">
            <FaExclamationCircle className="text-3xl" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
            {error || 'Program Not Found'}
          </h1>
          <p className="mx-auto mb-7 max-w-md text-muted">
            We could not open this program page. You can return to the program directory and choose another available program.
          </p>
          <Link to="/programs">
            <button className="btn-primary gap-2">
              <FaArrowLeft />
              Back to Programs
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <ProgramHeroSection program={program} />

      {/* Program At A Glance */}
      <ProgramAtGlanceSection program={program} />

      {/* Overview Section */}
      <ProgramOverviewSection program={program} />

      {/* Benefits Section */}
      <ProgramBenefitsSection program={program} />

      {/* Objectives Section */}
      <ProgramObjectivesSection program={program} />

      {/* Categories/Levels Section */}
      <ProgramCategoriesSection program={program} />

      {/* Schedule Section */}
      <ProgramScheduleSection program={program} />

      {/* Staff Highlights Section */}
      <ProgramStaffSection program={program} />

      {/* Testimonials Section */}
      <ProgramTestimonialsSection program={program} />

      {/* Islamic Integration Section */}
      <ProgramIslamicIntegrationSection program={program} />

      {/* CTA Section */}
      <ProgramCTASection program={program} />
    </div>
  )
}

export default ProgramDetailsPage
