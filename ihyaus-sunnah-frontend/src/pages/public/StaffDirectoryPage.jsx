// src/pages/public/StaffDirectoryPage.jsx

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import {
  FaSearch,
  FaUsers,
  FaCrown,
  FaUserTie,
  FaSitemap,
} from "react-icons/fa"

import StaffHero from "../../components/staff/StaffHero"

import useStaffAPI from "../../hooks/useStaffAPI"

const StaffDirectoryPage = () => {

  const {
    staff,
    groupedStaff,
  } = useStaffAPI()

  const [search, setSearch] =
    useState("")

  const [filter, setFilter] =
    useState("all")

  // =========================
  // FILTER STAFF
  // =========================

  const filteredStaff =
    useMemo(() => {

      return staff.filter(
        (member) => {

          const matchesSearch =
            member.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesFilter =
            filter === "all"
              ? true
              : member.role ===
                filter

          return (
            matchesSearch &&
            matchesFilter
          )
        }
      )

    }, [
      staff,
      search,
      filter,
    ])

  // =========================
  // FILTERED GROUPING
  // =========================

  const grouped = {
    director: [],
    board: [],
    senior: [],
    "staff-i": [],
    "staff-ii": [],
    "staff-iii": [],
  }

  filteredStaff.forEach(
    (member) => {

      if (
        grouped[
          member.role
        ]
      ) {

        grouped[
          member.role
        ].push(member)
      }
    }
  )

  // =========================
  // HIERARCHY SECTIONS
  // =========================

  const sections = [
    {
      key: "director",

      title:
        "Leadership Directorate",

      icon: <FaCrown />,

      color:
        "from-yellow-500 to-orange-500",
    },

    {
      key: "board",

      title:
        "Board of Trustees",

      icon: <FaSitemap />,

      color:
        "from-primary to-primaryLight",
    },

    {
      key: "senior",

      title:
        "Senior Staff",

      icon: <FaUserTie />,

      color:
        "from-blue-500 to-cyan-500",
    },

    {
      key: "staff-i",

      title:
        "Staff I",

      icon: <FaUsers />,

      color:
        "from-emerald-500 to-green-600",
    },

    {
      key: "staff-ii",

      title:
        "Staff II",

      icon: <FaUsers />,

      color:
        "from-violet-500 to-purple-600",
    },

    {
      key: "staff-iii",

      title:
        "Staff III",

      icon: <FaUsers />,

      color:
        "from-rose-500 to-pink-600",
    },
  ]

  // =========================
  // ANIMATION
  // =========================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: (
      i = 1
    ) => ({
      opacity: 1,
      y: 0,

      transition: {
        delay:
          i * 0.08,

        duration: 0.6,
      },
    }),
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* HERO */}
      <StaffHero />

      {/* INTRO */}
      <section className="section-padding bg-cream">

        <div className="container-custom">

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

            className="max-w-5xl mx-auto text-center space-y-6"
          >

            <span className="section-subtitle">
              Our Workforce
            </span>

            <h2 className="section-title">
              Dedicated & Professionally Trained Staff
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
              The staff of the institution represent a carefully developed workforce built upon discipline, knowledge, mentorship, and service. Every member of staff is nurtured through structured guidance and professional development under the supervision of the senior leadership and experienced scholars of the foundation.
            </p>

            <p className="text-gray-600 leading-relaxed">
              This internal system of mentorship ensures consistency in administration, Islamic education, student engagement, and community service. Through this approach, the institution continues to cultivate a united team committed to excellence, sincerity, professionalism, and the preservation of authentic Islamic values.
            </p>

          </motion.div>

        </div>

      </section>

      {/* FILTERS */}
      <section className="section-padding pt-0">

        <div className="container-custom space-y-16">

          {/* SEARCH + FILTER */}
          <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 grid md:grid-cols-2 gap-4">

            {/* SEARCH */}
            <div className="relative">

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"

                placeholder="Search staff..."

                value={search}

                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }

                className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* FILTER */}
            <select
              value={filter}

              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }

              className="input-primary"
            >

              <option value="all">
                All Roles
              </option>

              {sections.map(
                (section) => (

                  <option
                    key={
                      section.key
                    }

                    value={
                      section.key
                    }
                  >
                    {
                      section.title
                    }
                  </option>
                )
              )}

            </select>

          </div>

          {/* STAFF HIERARCHY */}
          <div className="space-y-24">

            {sections.map(
              (
                section,
                sectionIndex
              ) => {

                const members =
                  grouped[
                    section.key
                  ]

                if (
                  !members.length
                ) return null

                return (

                  <div
                    key={
                      section.key
                    }

                    className="space-y-12"
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

                      className="flex flex-col items-center text-center"
                    >

                      <div
                        className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${section.color} text-white flex items-center justify-center text-4xl shadow-premium mb-6`}
                      >
                        {
                          section.icon
                        }
                      </div>

                      <h2 className="text-4xl font-bold text-primary">
                        {
                          section.title
                        }
                      </h2>

                      <p className="text-gray-500 mt-3 text-lg">
                        {
                          members.length
                        }{" "}
                        members
                      </p>

                    </motion.div>

                    {/* GRID */}
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                      {members.map(
                        (
                          member,
                          index
                        ) => (

                          <motion.div
                            key={
                              member.id
                            }

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

                              delay:
                                index *
                                0.05,
                            }}

                            whileHover={{
                              y: -10,
                            }}

                            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
                          >

                            {/* IMAGE */}
                            <div className="relative h-80 overflow-hidden">

                              <img
                                src={
                                  member.image
                                }

                                alt={
                                  member.name
                                }

                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                              {/* ROLE */}
                              <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm capitalize">
                                {
                                  member.position
                                }
                              </div>

                              {/* INFO */}
                              <div className="absolute bottom-6 left-6 right-6 text-white">

                                <h2 className="text-2xl font-bold">
                                  {
                                    member.name
                                  }
                                </h2>

                                <p className="text-gold mt-1">
                                  {
                                    member.department
                                  }
                                </p>

                              </div>

                            </div>

                            {/* CONTENT */}
                            <div className="p-6 space-y-5">

                              {/* TAGS */}
                              <div className="flex flex-wrap gap-2">

                                {member.sections?.map(
                                  (
                                    section
                                  ) => (

                                    <span
                                      key={
                                        section
                                      }

                                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                                    >
                                      {
                                        section
                                      }
                                    </span>
                                  )
                                )}

                              </div>

                              {/* BIO */}
                              <p className="text-gray-600 leading-relaxed line-clamp-3">
                                {
                                  member.bio
                                }
                              </p>

                              {/* BUTTON */}
                              <Link
                                to={`/staff/profile/${member.id}`}

                                className="btn-primary w-full block text-center"
                              >
                                View Profile
                              </Link>

                            </div>

                          </motion.div>
                        )
                      )}

                    </div>

                    {/* DIVIDER */}
                    {sectionIndex !==
                      sections.length - 1 && (

                      <div className="flex justify-center pt-8">

                        <div className="w-1 h-16 bg-gradient-to-b from-gold to-primary rounded-full" />

                      </div>
                    )}

                  </div>
                )
              }
            )}

          </div>

        </div>

      </section>

    </div>
  )
}

export default StaffDirectoryPage