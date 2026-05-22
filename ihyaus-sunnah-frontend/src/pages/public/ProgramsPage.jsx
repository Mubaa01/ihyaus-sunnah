// src/pages/public/ProgramsPage.jsx

import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FiArrowRight,
  FiCheckCircle,
  FiBookOpen,
  FiUsers,
  FiAward,
  FiHeart,
} from "react-icons/fi"

import useProgramsAPI from "../../hooks/useProgramsAPI"
import ProgramCard from "../../components/programs/ProgramCard"

const ProgramsPage = () => {
  const { programs, loading } = useProgramsAPI()

  const floatingAnimation = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const stats = [
    {
      icon: <FiBookOpen />,
      value: "6+",
      label: "Structured Programs",
    },
    {
      icon: <FiUsers />,
      value: "500+",
      label: "Students & Beneficiaries",
    },
    {
      icon: <FiAward />,
      value: "Qualified",
      label: "Mentorship System",
    },
    {
      icon: <FiHeart />,
      value: "Community",
      label: "Development Focus",
    },
  ]

  return (
    <div className="overflow-hidden bg-white">

      {/* ====================================================== */}
      {/* HERO SECTION */}
      {/* ====================================================== */}

      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"
            alt="Programs"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-primary/70" />

        </div>

        {/* DECOR */}
        <div className="absolute top-24 right-16 w-[400px] h-[400px] bg-gold/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />

        {/* FLOATING CARDS */}
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute top-32 right-16 hidden xl:block z-20"
        >

          <div className="glass-card p-7 rounded-[2rem] border border-white/10 backdrop-blur-xl">

            <div className="text-5xl mb-4">
              📚
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">
              6+ Programs
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Comprehensive Islamic & Academic Development
            </p>

          </div>

        </motion.div>

        <motion.div
          variants={floatingAnimation}
          animate="animate"
          className="absolute bottom-28 left-16 hidden xl:block z-20"
        >

          <div className="glass-card p-7 rounded-[2rem] border border-white/10 backdrop-blur-xl">

            <div className="text-5xl mb-4">
              🤝
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">
              Community Impact
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Education, Welfare & Public Enlightenment
            </p>

          </div>

        </motion.div>

        {/* CONTENT */}
        <div className="relative z-10 container-custom py-32">

          <div className="max-w-5xl">

            {/* LABEL */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.3em] text-goldSoft font-semibold mb-7"
            >
              Educational Programs & Community Development
            </motion.p>

            {/* TITLE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl xl:text-8xl font-heading font-bold text-white leading-[1.1] mb-8"
            >
              Programs That Build
              <span className="block text-gold mt-2">
                Knowledge & Society
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-4xl mb-12"
            >
              Our programs are carefully structured to nurture authentic
              Islamic knowledge, academic excellence, leadership,
              discipline, community service, and moral development
              through education rooted in sincerity and purpose.
            </motion.p>

            {/* VERSE CARD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 mb-12 max-w-4xl"
            >

              <p
                className="font-arabic text-3xl md:text-5xl leading-loose text-goldSoft mb-7 text-center"
                dir="rtl"
              >
                لَا خَيْرَ فِي كَثِيرٍ مِّن نَّجْوَاهُمْ إِلَّا مَنْ أَمَرَ
                بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ
              </p>

              <p className="text-gray-200 text-lg leading-relaxed italic text-center">
                “There is no خير in much of their private conversation,
                except for those who encourage charity, goodness,
                or reconciliation between people.”
              </p>

              <p className="text-gold mt-5 font-semibold text-center">
                — Surah An-Nisa 4:114
              </p>

            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-wrap gap-5"
            >

              <Link to="/donate">
                <button className="btn-primary flex items-center gap-3">
                  Support Our Programs
                  <FiArrowRight />
                </button>
              </Link>

              <Link to="/about">
                <button className="btn-outline-light">
                  Learn More
                </button>
              </Link>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* STATS SECTION */}
      {/* ====================================================== */}

      <section className="relative -mt-20 z-20 pb-10">

        <div className="container-custom">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 shadow-soft border border-gray-100 text-center"
              >

                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 text-2xl">
                  {item.icon}
                </div>

                <h3 className="text-3xl font-bold text-primary mb-2">
                  {item.value}
                </h3>

                <p className="text-gray-500">
                  {item.label}
                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* PROGRAMS GRID */}
      {/* ====================================================== */}

      <section className="py-28 bg-cream relative overflow-hidden">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold/10 blur-3xl rounded-full" />

        <div className="container-custom relative z-10">

          {/* HEADER */}
          <div className="max-w-4xl mx-auto text-center mb-20">

            <p className="uppercase tracking-[0.25em] text-gold font-semibold mb-4">
              Our Educational Structure
            </p>

            <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary leading-tight mb-7">
              Programs Designed for
              <span className="block text-gold mt-2">
                Holistic Development
              </span>
            </h2>

            <p className="text-lg text-muted leading-relaxed">
              We combine Islamic education, academic learning,
              leadership development, public enlightenment,
              and social responsibility into one integrated mission.
            </p>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-24 text-primary font-semibold">
                Loading programs...
              </div>
            ) : (
              programs.map((program) => (
                <ProgramCard key={program._id || program.id || program.slug} program={program} />
              ))
            )}
          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FEATURED SECTION */}
      {/* ====================================================== */}

      <section className="py-32 bg-white overflow-hidden">

        <div className="container-custom">

          <div className="grid lg:grid-cols-2 gap-24 items-center">

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >

              <img
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1600&auto=format&fit=crop"
                alt="Tahfeez Program"
                className="rounded-[2.5rem] shadow-premium object-cover"
              />

              <div className="absolute -bottom-10 -right-10 bg-white rounded-[2rem] shadow-premium p-8 max-w-sm border border-gray-100">

                <h3 className="text-3xl font-heading font-bold text-primary mb-4">
                  Tahfeez Program
                </h3>

                <p className="text-muted leading-relaxed">
                  Structured Qur’an memorization, revision,
                  discipline, sincerity, and spiritual growth
                  through consistent mentorship.
                </p>

              </div>

            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >

              <p className="uppercase tracking-[0.25em] text-gold font-semibold mb-4">
                Featured Program
              </p>

              <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary leading-tight mb-8">
                Nurturing Future Huffaz
                <span className="block text-gold mt-2">
                  with Excellence
                </span>
              </h2>

              <p className="text-lg text-muted leading-relaxed mb-10">
                Our Tahfeez program focuses on developing strong
                Qur’anic memorization, discipline, leadership,
                moral refinement, and proper understanding
                of Islamic teachings.
              </p>

              {/* FEATURES */}
              <div className="space-y-5 mb-12">

                {[
                  "Structured memorization system",
                  "Qualified teachers and mentors",
                  "Daily revision and supervision",
                  "Character and moral development",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4"
                  >

                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FiCheckCircle />
                    </div>

                    <p className="text-lg text-gray-700">
                      {item}
                    </p>

                  </div>
                ))}

              </div>

              <Link to="/donate">
                <button className="btn-primary">
                  Support Students
                </button>
              </Link>

            </motion.div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* COMMUNITY IMPACT */}
      {/* ====================================================== */}

      <section className="relative py-32 overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
            alt="Community Development"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-primary/90" />

        </div>

        {/* CONTENT */}
        <div className="relative z-10 container-custom text-center">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >

            <p className="uppercase tracking-[0.25em] text-goldSoft font-semibold mb-4">
              Community Development
            </p>

            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white leading-tight mb-8">
              Education Beyond
              <span className="block text-gold mt-2">
                The Classroom
              </span>
            </h2>

            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-12">
              Through donations and community support,
              we assist orphans and vulnerable families,
              organize public lectures, and provide meaningful
              educational opportunities that transform society.
            </p>

            <Link to="/donate">
              <button className="btn-primary">
                Donate & Support
              </button>
            </Link>

          </motion.div>

        </div>

      </section>

    </div>
  )
}

export default ProgramsPage
