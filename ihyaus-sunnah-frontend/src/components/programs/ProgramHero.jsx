// src/components/programs/ProgramHero.jsx

import { motion } from "framer-motion"

import {
  FaBookOpen,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa"

const ProgramHero = ({
  totalPrograms = 0,
  activePrograms = 0,
  featuredPrograms = 0,
}) => {
  return (
    <section className="relative overflow-hidden bg-primary text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=1600&auto=format&fit=crop"
          alt="Programs"
          className="w-full h-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />

      </div>

      {/* DECORATION */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-3xl" />

      {/* CONTENT */}
      <div className="relative container-custom py-28 lg:py-36">

        <div className="max-w-4xl">

          {/* LABEL */}
          <motion.span
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="inline-block bg-white/10 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-8"
          >
            Educational Programs
          </motion.span>

          {/* TITLE */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-8"
          >
            Transforming Lives Through
            <span className="block text-gold">
              Islamic Education
            </span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="text-xl text-gray-200 leading-relaxed max-w-3xl"
          >
            Explore our structured educational programs designed to nurture
            Qur'anic excellence, Islamic understanding, leadership development,
            and community transformation through authentic knowledge and mentorship.
          </motion.p>

        </div>

        {/* STATS */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >

          {/* TOTAL */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8">

            <div className="w-16 h-16 rounded-3xl bg-gold/20 flex items-center justify-center text-gold text-2xl mb-6">
              <FaBookOpen />
            </div>

            <h3 className="text-5xl font-bold mb-3">
              {totalPrograms}
            </h3>

            <p className="text-gray-200 text-lg">
              Total Programs
            </p>

          </div>

          {/* ACTIVE */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8">

            <div className="w-16 h-16 rounded-3xl bg-green-500/20 flex items-center justify-center text-green-300 text-2xl mb-6">
              <FaGraduationCap />
            </div>

            <h3 className="text-5xl font-bold mb-3">
              {activePrograms}
            </h3>

            <p className="text-gray-200 text-lg">
              Active Programs
            </p>

          </div>

          {/* FEATURED */}
          <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-[32px] p-8">

            <div className="w-16 h-16 rounded-3xl bg-secondary/20 flex items-center justify-center text-secondary-light text-2xl mb-6">
              <FaUsers />
            </div>

            <h3 className="text-5xl font-bold mb-3">
              {featuredPrograms}
            </h3>

            <p className="text-gray-200 text-lg">
              Featured Programs
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default ProgramHero