// src/pages/public/StaffProfilePage.jsx

import { useParams, Link } from "react-router-dom"
import useStaff from "../../hooks/useStaff"

import {
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaArrowLeft,
  FaUsers,
  FaAward,
} from "react-icons/fa"

const StaffProfilePage = () => {
  const { staff } = useStaff()

  const { id } = useParams()

  const member = staff.find(
    (item) => item.id === Number(id)
  )

  const getHierarchyLabel = (
    role
  ) => {
    switch (role) {
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

  const getFallback = (
    value,
    fallback = "Not specified"
  ) => {
    return value || fallback
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-5">
            Staff Not Found
          </h2>

          <Link
            to="/staff"
            className="btn-primary"
          >
            Back To Staff Directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen overflow-hidden">

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[85vh] bg-primary text-white">

        {/* BG IMAGE */}
        <div className="absolute inset-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
        </div>

        {/* CONTENT */}
        <div className="relative container-custom py-24">

          {/* BACK */}
          <Link
            to="/staff"
            className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all duration-300 mb-12"
          >
            <FaArrowLeft />
            Back To Staff Directory
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>

              {/* CATEGORY */}
              <span className="inline-block bg-gold/20 border border-gold/30 text-gold px-5 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
                {getHierarchyLabel(
                  member.role
                )}
              </span>

              {/* NAME */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
                {member.name}
              </h1>

              {/* POSITION */}
              <p className="text-2xl md:text-3xl text-gold font-semibold mb-8">
                {member.position}
              </p>

              {/* BIO */}
              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mb-10">
                {member.bio}
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
                      className="bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm backdrop-blur-sm"
                    >
                      {section}
                    </span>
                  )
                )}
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex justify-center lg:justify-end">

              <div className="relative">

                <div className="absolute -inset-6 bg-gold/20 rounded-[40px] blur-3xl" />

                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-[360px] h-[450px] object-cover rounded-[40px] border border-white/10 shadow-2xl"
                />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section-padding">

        <div className="container-custom">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2 space-y-8">

              {/* ABOUT */}
              <div className="bg-white rounded-[32px] p-10 shadow-soft border border-gray-100">

                <span className="section-subtitle">
                  Biography
                </span>

                <h2 className="text-4xl font-bold text-primary mb-6">
                  About{" "}
                  {member.name}
                </h2>

                <div className="space-y-5 text-gray-700 leading-relaxed text-lg">

                  <p>
                    {
                      member.name
                    }{" "}
                    serves as{" "}
                    <span className="font-semibold text-primary">
                      {
                        member.position
                      }
                    </span>{" "}
                    under the{" "}
                    <span className="font-semibold text-primary">
                      {getHierarchyLabel(
                        member.role
                      )}
                    </span>{" "}
                    of Ihyaus Sunnah Foundation.
                  </p>

                  <p>
                    {
                      member.bio
                    }
                  </p>

                  <p>
                    As part of the institution’s structured internal development system, staff members are continuously trained and mentored under experienced senior scholars and administrators to maintain excellence in education, discipline, and community service.
                  </p>

                </div>

              </div>

              {/* RESPONSIBILITIES */}
              <div className="bg-white rounded-[32px] p-10 shadow-soft border border-gray-100">

                <h2 className="text-3xl font-bold text-primary mb-8">
                  Departments & Responsibilities
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  {member.sections?.map(
                    (
                      section,
                      index
                    ) => (
                      <div
                        key={index}
                        className="bg-cream rounded-2xl p-6 border border-gray-100 hover:shadow-soft transition"
                      >

                        <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-xl mb-5">
                          <FaAward />
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-3">
                          {section}
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                          Active contribution and responsibility within the{" "}
                          {section} department of the foundation.
                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* QUOTE */}
              <div className="relative overflow-hidden rounded-[32px] bg-primary p-10 text-white">

                <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 blur-3xl rounded-full" />

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

              </div>

            </div>

            {/* SIDEBAR */}
            <div className="space-y-8">

              {/* INFO CARD */}
              <div className="bg-white rounded-[32px] p-8 shadow-soft border border-gray-100">

                <h3 className="text-2xl font-bold text-primary mb-8">
                  Staff Information
                </h3>

                <div className="space-y-6">

                  {/* POSITION */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <FaBriefcase />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Position
                      </p>

                      <p className="font-semibold text-primary">
                        {
                          member.position
                        }
                      </p>
                    </div>

                  </div>

                  {/* CATEGORY */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                      <FaUsers />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Staff Category
                      </p>

                      <p className="font-semibold text-primary">
                        {getHierarchyLabel(
                          member.role
                        )}
                      </p>
                    </div>

                  </div>

                  {/* QUALIFICATION */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <FaGraduationCap />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Qualification
                      </p>

                      <p className="font-semibold text-primary">
                        {getFallback(
                          member.qualification
                        )}
                      </p>
                    </div>

                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                      <FaEnvelope />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Email
                      </p>

                      <p className="font-semibold text-primary break-all">
                        {getFallback(
                          member.email,
                          "info@ihyaussunnah.org"
                        )}
                      </p>
                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <FaPhone />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Phone
                      </p>

                      <p className="font-semibold text-primary">
                        {getFallback(
                          member.phone
                        )}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-[32px] bg-primary p-8 text-white">

                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />

                <div className="relative">

                  <h3 className="text-2xl font-bold mb-4">
                    Support Our Mission
                  </h3>

                  <p className="text-gray-200 mb-8 leading-relaxed">
                    Help us continue building authentic Islamic education, community development, and student mentorship programs.
                  </p>

                  <Link
                    to="/donate"
                    className="btn-primary inline-block"
                  >
                    Support Foundation
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default StaffProfilePage