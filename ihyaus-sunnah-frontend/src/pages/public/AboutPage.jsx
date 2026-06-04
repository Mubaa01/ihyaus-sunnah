// src/pages/public/AboutPage.jsx

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FaBookOpen,
  FaMosque,
  FaUsers,
  FaHeart,
  FaArrowRight
} from "react-icons/fa"

import {
  FiArrowRight
} from "react-icons/fi";
import QuranVersePanel from "../../components/common/QuranVersePanel"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
    },
  }),
}

const stats = [
  { number: "800+", label: "Students Educated" },
  { number: "65+", label: "Qualified Staff" },
  { number: "6", label: "Academic Programs" },
  { number: "7+", label: "Years of Service" },
]

const values = [
  {
    icon: <FaBookOpen />,
    title: "Authentic Knowledge",
    description:
      "Teaching Islam based upon the Qur'an and authentic Sunnah with correct understanding.",
  },
  {
    icon: <FaMosque />,
    title: "Spiritual Growth",
    description:
      "Building students spiritually through worship, discipline and character refinement.",
  },
  {
    icon: <FaUsers />,
    title: "Community Service",
    description:
      "Serving humanity through education, welfare and beneficial outreach programs.",
  },
  {
    icon: <FaHeart />,
    title: "Sincerity",
    description:
      "Maintaining ikhlas in teaching, leadership and community development.",
  },
]

const timeline = [
  {
    year: "2018",
    title: "Foundation Established",
    description:
      "Ihyaus Sunnah Foundation was established to revive authentic Islamic education.",
  },
  {
    year: "2019",
    title: "Tahfeez Department",
    description:
      "Launch of structured Qur'an memorization and Tajweed programs.",
  },
  {
    year: "2021",
    title: "Academic Expansion",
    description:
      "Integration of Western education alongside Islamic studies.",
  },
  {
    year: "2024",
    title: "Community Development",
    description:
      "Expansion into welfare, humanitarian and public outreach initiatives.",
  },
]

const aboutVerse = {
  arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
  translation: "And say: My Lord, increase me in knowledge.",
  reference: "Surah Taha 20:114",
}

const AboutPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-black/70" />

        <div className="relative container-custom py-20 lg:py-28 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl"
          >
            {/* <span className="inline-block bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 px-5 py-2 rounded-full text-sm tracking-widest uppercase mb-8">
              About The Foundation
            </span> */}

            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-white mb-8">
              Reviving <span className="text-yellow-400">Ummah</span> Through
              <span className="block text-soft-yellow-400 mt-2">
                Education & Sincerity
              </span>
            </h1>

            <p
              className="hidden font-arabic text-3xl md:text-5xl text-yellow-400 mb-5"
              dir="rtl"
            >
              وَقُل رَّبِّ زِدْنِي عِلْمًا
            </p>

            <p className="text-gray-200 text-xl leading-relaxed max-w-3xl mb-10">
              Ihyaus Sunnah Foundation is dedicated to nurturing students
              upon authentic Islamic knowledge, noble character and
              beneficial service to society.
            </p>

            <QuranVersePanel {...aboutVerse} className="mb-10 max-w-3xl" />

            <div className="flex flex-wrap gap-5">
              <Link to="/programs">
                <button className="btn-primary">
                  Explore Programs
                  <FiArrowRight />
                </button>
              </Link>

              <Link to="/staff">
                <button className="btn-outline">
                  Meet Our Staff
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="section-subtitle">
                Our Story
              </span>

              <h2 className="section-title">
                Building A Generation Rooted In Knowledge
              </h2>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Ihyaus Sunnah Foundation was established with the mission
                  of reviving authentic Islamic education and nurturing a
                  generation grounded upon beneficial knowledge, righteous
                  character and sincere worship.
                </p>

                <p>
                  Through structured Islamic programs, Qur'an memorization,
                  Arabic studies, modern education and community outreach,
                  the foundation strives to create balanced individuals who
                  benefit both society and the Ummah.
                </p>

                <p>
                  We believe true success lies in combining knowledge with
                  sincerity, discipline and service to humanity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1200&auto=format&fit=crop"
                alt="About"
                className="rounded-[40px] shadow-premium object-cover h-[400px] w-full"
              />

              <div className="absolute -bottom-10 -left-10 bg-white rounded-3xl shadow-premium p-8 w-72">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  20+
                </h3>

                <p className="text-gray-600">
                  Years of educational service and community development.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-[40px] p-12 shadow-soft"
            >
              <span className="section-subtitle">
                Our Mission
              </span>

              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                What Drives Us
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                To provide authentic Islamic education, cultivate noble
                character and empower communities through beneficial
                knowledge, tarbiyah and service-oriented initiatives.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-primary rounded-[40px] p-12 shadow-premium"
            >
              <span className="text-yellow-400 uppercase tracking-[0.2em] text-sm font-semibold">
                Our Vision
              </span>

              <h2 className="text-3xl font-heading font-bold text-white mb-6 mt-5">
                Future We Aim For
              </h2>

              <p className="text-lg text-gray-200 leading-relaxed">
                To become a leading Islamic educational institution that
                nurtures generations grounded upon the Qur'an and Sunnah,
                capable of positively transforming society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="section-subtitle">
              Our Core Principles
            </span>

            <h2 className="section-title">
              Values That Define Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="bg-white border border-gray-100 rounded-[32px] p-10 shadow-soft text-center"
              >
                <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8">
                  {value.icon}
                </div>

                <h3 className="text-2xl font-heading font-bold text-primary mb-5">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#3D7A6B,_transparent_45%)]" />

        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <span className="text-yellow-400 uppercase tracking-[0.25em] text-sm font-semibold">
              Foundation Journey
            </span>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-5">
              Our Timeline
            </h2>
          </div>

          <div className="max-w-lg md:max-w-xl lg:max-w-2xl mx-auto space-y-10">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="grid md:grid-cols-[180px_1fr] gap-8 items-start"
              >
                <div className="text-yellow-400 text-2xl font-bold">
                  {item.year}
                </div>

                <div className="glass-card rounded-3xl p-8">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-padding bg-white ">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                className="bg-cream rounded-[32px] p-10 text-center shadow-soft"
              >
                <h3 className="text-lg font-bold text-primary mb-4">
                  {stat.number}
                </h3>

                <p className="text-gray-600 text-lg">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primaryLight text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#3D7A6B,_transparent_45%)]" />

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-yellow-400 uppercase tracking-[0.25em] text-sm font-semibold">
              Become Part Of The Mission
            </span>

            <h2 className="text-2xl md:text-4xl font-heading font-bold leading-tight mt-6 mb-8">
              Help Us Build Future Generations Through
              <span className="text-yellow-400 block mt-2">
                Knowledge & Character
              </span>
            </h2>

            <p className="text-lg text-gray-200 leading-relaxed mb-12">
              Support our educational and community initiatives in spreading
              beneficial knowledge and uplifting society.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/donate">
                <button className="btn-primary">
                  Support The Foundation
                </button>
              </Link>

              <Link to="/programs">
                <button className="btn-outline flex items-center gap-2">
                  Explore Programs
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
