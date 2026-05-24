import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { programsAPI } from '../../services/api'

// Import all section components
import ProgramHeroSection from '../../components/programs/ProgramHeroSection'
import ProgramOverviewSection from '../../components/programs/ProgramOverviewSection'
import ProgramBenefitsSection from '../../components/programs/ProgramBenefitsSection'
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


  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   setProgram(null);
  //   programsAPI.getBySlug(slug)
  //     .then((res) => {
  //       setProgram(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message || 'Failed to load program');
  //       setLoading(false);
  //     });
  // }, [slug]);



  useEffect(() => {
    setLoading(true);
    setError(null);
    setProgram(null);

    programsAPI.getBySlug(slug)
      .then((res) => {
        // Always use res.data for program object
        setProgram(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load program");
        setLoading(false);
      });
  }, [slug]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            {error || 'Program Not Found'}
          </h1>
          <Link to="/programs">
            <button className="btn-primary">
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

      {/* Overview Section */}
      <ProgramOverviewSection program={program} />

      {/* Benefits Section */}
      <ProgramBenefitsSection />

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
