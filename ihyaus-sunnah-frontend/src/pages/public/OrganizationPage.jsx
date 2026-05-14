// src/pages/public/OrganizationPage.jsx

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import {
  FaCrown,
  FaUsers,
  FaUserTie,
  FaSitemap,
} from "react-icons/fa"

import useStaff from "../../hooks/useStaff"

const OrganizationPage = () => {
  const { staff } = useStaff()

  const directors = staff.filter(
    (item) => item.role === "director"
  )

  const board = staff.filter(
    (item) => item.role === "board"
  )

  const senior = staff.filter(
    (item) => item.role === "senior"
  )

  const staffOne = staff.filter(
    (item) => item.role === "staff-i"
  )

  const staffTwo = staff.filter(
    (item) => item.role === "staff-ii"
  )

  const staffThree = staff.filter(
    (item) => item.role === "staff-iii"
  )

  const sections = [
    {
      title: "Leadership Directorate",
      icon: <FaCrown />,
      data: directors,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Board of Trustees",
      icon: <FaSitemap />,
      data: board,
      color: "from-primary to-primaryLight",
    },

    {
      title: "Senior Staff",
      icon: <FaUserTie />,
      data: senior,
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "Staff I",
      icon: <FaUsers />,
      data: staffOne,
      color: "from-emerald-500 to-green-600",
    },

    {
      title: "Staff II",
      icon: <FaUsers />,
      data: staffTwo,
      color: "from-violet-500 to-purple-600",
    },

    {
      title: "Staff III",
      icon: <FaUsers />,
      data: staffThree,
      color: "from-rose-500 to-pink-600",
    },
  ]

  const hierarchy = [
    {
      title: "Board of Trustees",
      positions: [
        "Chairman",
        "Vice Chairman",
        "Secretary",
        "Treasurer",
        "Members",
      ],
    },

    {
      title: "Senior Staff",
      positions: [
        "Directors",
        "Administrators",
        "Coordinators",
      ],
    },

    {
      title: "School Heads",
      positions: [
        "Head Teacher",
        "Assistant Head",
      ],
    },

    {
      title: "Teaching Staff",
      positions: [
        "Qur'an Teachers",
        "Islamic Studies Teachers",
      ],
    },

    {
      title: "Support Staff",
      positions: [
        "Office Staff",
        "Maintenance",
        "Security",
      ],
    },
  ]

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
      },
    }),
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-black/60" />

        <div className="relative container-custom py-32 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl"
          >
            <span className="inline-block bg-gold/20 border border-gold/30 text-gold px-5 py-2 rounded-full text-sm tracking-widest uppercase mb-8">
              Organizational Structure
            </span>

            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-white mb-8">
              A Structured Foundation Built Upon

              <span className="block text-gold mt-3">
                Knowledge & Service
              </span>
            </h1>

            <p
              className="font-arabic text-3xl md:text-5xl text-gold mb-5"
              dir="rtl"
            >
              وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
            </p>

            <p className="text-gray-200 text-xl leading-relaxed max-w-3xl mb-10">
              Building a disciplined institution dedicated to Islamic
              education, Qur'an memorization, community development and
              authentic Sunnah-based learning.
            </p>

            <div className="flex flex-wrap gap-5">
              <Link to="/staff">
                <button className="btn-primary">
                  Meet Our Team
                </button>
              </Link>

              <Link to="/about">
                <button className="btn-outline">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOUNDATION STRUCTURE */}
      <section className="section-padding bg-cream">
        <div className="container-custom">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <span className="section-subtitle">
              Foundation Hierarchy
            </span>

            <h2 className="section-title">
              Organizational Structure
            </h2>

            <p className="section-description max-w-3xl mx-auto">
              A clearly structured leadership system ensuring excellence,
              accountability and effective administration.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-10">
            {hierarchy.map((section, index) => (
              <motion.div
                key={section.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative"
              >
                <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8">
                  
                  {/* TITLE */}
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-heading font-bold text-primary">
                      {section.title}
                    </h3>
                  </div>

                  {/* POSITIONS */}
                  <div className="flex flex-wrap justify-center gap-3">
                    {section.positions.map((position) => (
                      <span
                        key={position}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {position}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CONNECTOR */}
                {index !== hierarchy.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-gold to-primary rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZATION MEMBERS */}
      <section className="section-padding">
        <div className="container-custom space-y-20">

          {sections.map((section) => (
            <div
              key={section.title}
              className="space-y-10"
            >

              {/* SECTION HEADER */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="flex items-center gap-5"
              >
                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${section.color} text-white flex items-center justify-center text-3xl shadow-premium`}
                >
                  {section.icon}
                </div>

                <div>
                  <h2 className="text-4xl font-bold text-primary">
                    {section.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {section.data.length} members
                  </p>
                </div>
              </motion.div>

              {/* MEMBERS GRID */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {section.data.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      y: -12,
                    }}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
                  >

                    {/* IMAGE */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* ROLE */}
                      <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm capitalize">
                        {member.role}
                      </div>

                      {/* INFO */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="text-2xl font-bold">
                          {member.name}
                        </h3>

                        <p className="text-gold mt-1">
                          {member.position}
                        </p>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 space-y-5">

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-2">
                        {member.sections?.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* BIO */}
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  )
}

export default OrganizationPage