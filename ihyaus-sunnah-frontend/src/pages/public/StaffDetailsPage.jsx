// src/pages/public/StaffDetailsPage.jsx

import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom"

import {
  motion,
} from "framer-motion"

import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiUsers,
  FiBriefcase,
  FiAward,
  FiLayers,
  FiUserCheck,
} from "react-icons/fi"


import useStaffAPI from "../../hooks/useStaffAPI"

const StaffDetailsPage = () => {

  const { staff } =
    useStaffAPI()

  const { id } =
    useParams()

  const location =
    useLocation()

  const member =
    staff.find(
      (item) =>
        item._id?.toString() === id
    )

  // =========================
  // ROUTING
  // =========================

  const isAdminPath =
    location.pathname.startsWith(
      "/admin"
    )

  const backUrl =
    isAdminPath
      ? "/admin/staff"
      : "/staff"

  const backLabel =
    isAdminPath
      ? "Back to Staff Management"
      : "Back to Staff Directory"

  // =========================
  // HELPERS
  // =========================

  const getHierarchyLabel =
    (member) => {

      if (
        member.category
      ) {
        return member.category
      }

      switch (
        member.role
      ) {

        case "director":
          return "Leadership Directorate"

        case "board":
          return "Board of Trustees"

        case "senior":
          return "Senior Staff"

        case "staff-i":
          return "Staff I"

        case "staff-ii":
          return "Staff II"

        case "staff-iii":
          return "Staff III"

        default:
          return "Staff Member"
      }
    }

  const getPositionLabel =
    (member) => {

      return (
        member.position ||
        member.occupation ||
        "Staff Member"
      )
    }

  const getFallback =
    (value) => {
      return (
        value ||
        "Not specified"
      )
    }

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

  // =========================
  // NOT FOUND
  // =========================

  if (!member) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-cream">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-primary mb-4">
            Staff Not Found
          </h2>

          <Link
            to={backUrl}
            className="text-secondary font-semibold hover:underline"
          >
            {backLabel}
          </Link>

        </div>

      </div>
    )
  }

  return (

    <div className="bg-cream min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">

        {/* IMAGE */}
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

        {/* CONTENT */}
        <div className="relative z-10 container-custom py-20 w-full">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-5xl text-white"
          >

            {/* BACK */}
            <Link
              to={backUrl}
              className="inline-flex items-center gap-3 text-gray-200 hover:text-white transition-all mb-10"
            >

              <FiArrowLeft />

              {backLabel}

            </Link>

            {/* CATEGORY */}
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/80 backdrop-blur-md border border-white/10 text-sm font-semibold mb-6">

              <FiLayers />

              {getHierarchyLabel(
                member
              )}

            </span>

            {/* NAME */}
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-5">
              {member.name}
            </h1>

            {/* POSITION */}
            <p className="text-2xl md:text-3xl text-gold font-semibold mb-8">
              {getPositionLabel(
                member
              )}
            </p>

            {/* BIO */}
            <p className="max-w-3xl text-lg leading-relaxed text-gray-200 mb-10">
              {
                member.bio
              }
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3">

              {member.sections?.map(
                (
                  section,
                  index
                ) => (

                  <span
                    key={index}
                    className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm"
                  >
                    {section}
                  </span>
                )
              )}

            </div>

          </motion.div>

        </div>

      </section>

      {/* MAIN CONTENT */}
      <section className="section-padding">

        <div className="container-custom">

          <div className="grid lg:grid-cols-3 gap-10">

            {/* SIDEBAR */}
            <div className="space-y-8">

              {/* CONTACT */}
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

                className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100"
              >

                <h3 className="text-2xl font-bold text-primary mb-8">
                  Contact Information
                </h3>

                <div className="space-y-6">

                  {/* EMAIL */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FiMail />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Email
                      </p>

                      <p className="font-medium text-gray-700 break-all">
                        {getFallback(
                          member.email
                        )}
                      </p>

                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FiPhone />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Phone
                      </p>

                      <p className="font-medium text-gray-700">
                        {getFallback(
                          member.phone
                        )}
                      </p>

                    </div>

                  </div>

                  {/* ADDRESS */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FiMapPin />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Address
                      </p>

                      <p className="font-medium text-gray-700">
                        {getFallback(
                          member.address
                        )}
                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

              {/* PROFESSIONAL */}
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

                transition={{
                  delay: 0.1,
                }}

                className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100"
              >

                <h3 className="text-2xl font-bold text-primary mb-8">
                  Academic & Professional
                </h3>

                <div className="space-y-6">

                  {/* STATUS */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
                      <FiBookOpen />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Academic Status
                      </p>

                      <p className="font-medium text-gray-700">
                        {getFallback(
                          member.academicStatus
                        )}
                      </p>

                    </div>

                  </div>

                  {/* OCCUPATION */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
                      <FiBriefcase />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Occupation
                      </p>

                      <p className="font-medium text-gray-700">
                        {getFallback(
                          member.occupation ||
                            member.position
                        )}
                      </p>

                    </div>

                  </div>

                  {/* STATUS */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
                      <FiUsers />
                    </div>

                    <div>

                      <p className="text-sm text-gray-500 mb-1">
                        Marital Status
                      </p>

                      <p className="font-medium text-gray-700">
                        {getFallback(
                          member.maritalStatus
                        )}
                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

            </div>

            {/* MAIN */}
            <div className="lg:col-span-2 space-y-16">

              {/* ABOUT */}
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

                className="bg-white rounded-[2rem] p-10 shadow-soft border border-gray-100"
              >

                <span className="section-subtitle">
                  Staff Biography
                </span>

                <h2 className="text-4xl font-bold text-primary mb-8">
                  About {member.name}
                </h2>

                <div className="space-y-6 text-gray-700 leading-relaxed text-lg">

                  <p>
                    {member.name} serves within the{" "}
                    <span className="font-semibold text-primary">
                      {getHierarchyLabel(
                        member
                      )}
                    </span>{" "}
                    of Ihyaus Sunnah Foundation, contributing actively toward the institution’s educational, administrative, and community development objectives.
                  </p>

                  <p>
                    Through structured mentorship and continuous internal development under senior scholars and administrators, the staff body remains aligned with the foundation’s principles of authentic Islamic learning, professionalism, discipline, and sincere service.
                  </p>

                  <p>
                    Staff members are entrusted with responsibilities that strengthen the institution’s mission of nurturing beneficial knowledge, moral excellence, and community impact across all departments and educational programs.
                  </p>

                </div>

              </motion.div>

              {/* SECTIONS */}
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

                transition={{
                  delay: 0.1,
                }}
              >

                <div className="flex items-center gap-4 mb-10">

                  <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center text-2xl">
                    <FiUserCheck />
                  </div>

                  <div>

                    <h3 className="text-3xl font-bold text-primary">
                      Departments & Sections
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Active institutional responsibilities and contributions
                    </p>

                  </div>

                </div>

                <div className="grid sm:grid-cols-2 gap-6">

                  {member.sections?.map(
                    (
                      section,
                      index
                    ) => (

                      <motion.div
                        key={index}

                        initial={{
                          opacity: 0,
                          y: 20,
                        }}

                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}

                        viewport={{
                          once: true,
                        }}

                        transition={{
                          delay:
                            index * 0.08,
                        }}

                        whileHover={{
                          y: -6,
                        }}

                        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
                      >

                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5">
                          <FiAward />
                        </div>

                        <h4 className="text-xl font-bold text-primary mb-3">
                          {section}
                        </h4>

                        <p className="text-gray-600 leading-relaxed">
                          Active contribution and institutional responsibility within the{" "}
                          {section}{" "}
                          department and related activities of the foundation.
                        </p>

                      </motion.div>
                    )
                  )}

                </div>

              </motion.div>

              {/* QUOTE */}
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

                className="relative bg-primary rounded-[2rem] p-10 overflow-hidden text-white"
              >

                <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/10 blur-3xl rounded-full" />

                <div className="relative z-10">

                  <p
                    className="font-arabic text-3xl md:text-4xl text-gold mb-6 leading-loose"
                    dir="rtl"
                  >
                    عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
                  </p>

                  <p className="text-xl text-gray-200 leading-relaxed mb-4">
                    “Teach freely as you were taught freely.”
                  </p>

                  <p className="text-gold font-semibold">
                    Motto of Ihyaus Sunnah Foundation
                  </p>

                </div>

              </motion.div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default StaffDetailsPage