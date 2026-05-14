import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUsers,
  FiBookOpen,
  FiHeart,
} from "react-icons/fi";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"
          alt="Ihyaus Sunnah Foundation"
          className="w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-heroGradient"></div>
      </div>

      {/* GOLD GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 blur-3xl rounded-full animate-pulseGlow"></div>

      {/* CONTENT */}
      <div className="relative z-10 container-custom py-32">

        <div className="max-w-4xl">

          {/* SMALL LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>

            <p className="text-sm uppercase tracking-[0.2em] text-goldSoft">
              Education • Sincerity • Community
            </p>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6"
          >
            Building a Generation Rooted in
            <span className="block text-gold mt-2">
              Knowledge & Sincerity
            </span>
          </motion.h1>

          {/* ARABIC MOTTO */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-arabic text-3xl md:text-4xl text-goldSoft mb-6"
            dir="rtl"
          >
            عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mb-10"
          >
            Ihyaus Sunnah Foundation is a nonprofit Islamic educational
            institution dedicated to authentic knowledge, Qur’an memorization,
            Arabic studies, western education, public lectures, and community
            development programs supporting society and orphans.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-wrap gap-5"
          >

            <Link to="/about">
              <button className="btn-primary flex items-center gap-2">
                Explore Foundation
                <FiArrowRight />
              </button>
            </Link>

            <Link to="/programs">
              <button className="btn-outline">
                View Programs
              </button>
            </Link>

          </motion.div>

        </div>

        {/* FLOATING STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-28">

          {/* CARD 1 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-soft hover:-translate-y-2 transition duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold text-primary flex items-center justify-center mb-32">
              <FiBookOpen size={30} />
            </div>

            <h3 className="text-4xl font-bold text-white mb-2">
              5+
            </h3>

            <p className="text-goldSoft text-lg font-semibold mb-3">
              Educational Programs
            </p>

            <p className="text-gray-300 leading-relaxed">
              Islamic studies, Tahfeez, Arabic education, western education,
              and public learning programs.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-soft hover:-translate-y-2 transition duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold text-primary flex items-center justify-center mb-6">
              <FiUsers size={30} />
            </div>

            <h3 className="text-4xl font-bold text-white mb-2">
              1000+
            </h3>

            <p className="text-goldSoft text-lg font-semibold mb-3">
              Students & Community
            </p>

            <p className="text-gray-300 leading-relaxed">
              Building a community grounded upon knowledge, discipline,
              sincerity, and Islamic values.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-soft hover:-translate-y-2 transition duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-gold text-primary flex items-center justify-center mb-6">
              <FiHeart size={30} />
            </div>

            <h3 className="text-4xl font-bold text-white mb-2">
              Nonprofit
            </h3>

            <p className="text-goldSoft text-lg font-semibold mb-3">
              Community Development
            </p>

            <p className="text-gray-300 leading-relaxed">
              Supporting orphans and vulnerable members of society through
              donations and welfare initiatives.
            </p>
          </motion.div>

        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span className="text-white/70 text-sm tracking-widest uppercase">
          Scroll
        </span>

        <div className="w-[2px] h-16 bg-white/20 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-bounce"></div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;