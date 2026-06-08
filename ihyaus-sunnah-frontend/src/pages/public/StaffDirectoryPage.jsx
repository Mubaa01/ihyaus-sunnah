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
  FaArrowRight,
  FaIdBadge,
  FaTimes,
} from "react-icons/fa"

import StaffHero from "../../components/staff/StaffHero"

import useStaffAPI from "../../hooks/useStaffAPI"

const normalizeStaffRole = (member) => {
  const rawRole =
    member?.role ||
    member?.category ||
    member?.staffCategory ||
    ""

  const role =
    String(rawRole)
      .toLowerCase()
      .trim()
      .replace(/[_\s]+/g, "-")

  if (role.includes("director")) return "director"
  if (role.includes("board") || role.includes("trustee")) return "board"
  if (role.includes("senior")) return "senior"
  if (role.includes("staff-iii") || role.includes("staff-3")) return "staff-iii"
  if (role.includes("staff-ii") || role.includes("staff-2")) return "staff-ii"
  if (role.includes("staff-i") || role.includes("staff-1")) return "staff-i"

  return role
}

const StaffDirectoryCard = ({ member, category, featured = false, extraBadges = [] }) => {
  const profileId =
    member._id ||
    member.id

  const sections =
    Array.isArray(member.sections)
      ? member.sections.slice(0, 2)
      : []

  return (
    <article
      className={`group relative overflow-hidden rounded-[32px] bg-primary shadow-premium transition duration-500 hover:-translate-y-2 ${
        featured
          ? "mx-auto h-[540px] w-full max-w-[420px]"
          : "h-[500px] w-full"
      }`}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-primaryLight to-brand-400 text-6xl font-semibold text-white">
          {member.name?.charAt(0) || "S"}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-primary/40 to-primary/95" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-primary/70 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white sm:p-7">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-3 py-2 text-xs font-medium backdrop-blur-md">
            <FaIdBadge />
            {category}
          </span>

          {extraBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/15 bg-white/15 px-3 py-2 text-xs font-medium backdrop-blur-md"
            >
              {badge}
            </span>
          ))}

          {member.department && (
            <span className="rounded-full border border-white/15 bg-white/15 px-3 py-2 text-xs font-medium backdrop-blur-md">
              {member.department}
            </span>
          )}
        </div>

        <h3 className={`${featured ? "text-4xl" : "text-3xl"} font-semibold leading-tight`}>
          {member.name}
        </h3>

        <p className="mt-2 text-sm font-medium text-goldSoft">
          {member.position || "Staff Member"}
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/85">
          {member.bio || "Committed to serving the institution through knowledge, discipline, and sincere community work."}
        </p>

        {sections.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {sections.map((section) => (
              <span
                key={section}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur"
              >
                {section}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/staff/profile/${profileId}`}
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-primary shadow-card transition hover:bg-brand-50"
        >
          View profile
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </article>
  )
}

const StaffEmptyCard = ({ category }) => (
  <div className="flex h-[500px] w-full flex-col justify-end overflow-hidden rounded-[32px] border border-dashed border-brand-400 bg-gradient-to-br from-brand-50 via-white to-brand-100 p-7 shadow-card">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-2xl text-primary">
      <FaUsers />
    </div>

    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-400">
      {category}
    </p>

    <h3 className="text-3xl font-semibold text-primary">
      No staff listed yet
    </h3>

    <p className="mt-4 text-sm leading-relaxed text-neutral-400">
      Staff added to this category will appear here.
    </p>
  </div>
)

const StaffSectionBlock = ({ section, members, centered = false, showDivider = false }) => (
  <div className={centered ? "space-y-10" : "space-y-8"}>
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
      className={centered ? "mx-auto max-w-3xl text-center" : "flex flex-col gap-5 md:flex-row md:items-end md:justify-between"}
    >
      <div className={centered ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        <div className={`mb-4 inline-flex items-center gap-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-400 shadow-card ${centered ? "justify-center" : ""}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-primary">
            {section.icon}
          </span>
          {section.eyebrow}
        </div>

        <h2 className={`${centered ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"} font-bold text-primary`}>
          {section.title}
        </h2>

        <p className={`mt-3 text-neutral-400 ${centered ? "mx-auto max-w-xl" : "max-w-2xl"}`}>
          {members.length} {members.length === 1 ? "member" : "members"} in this category
        </p>
      </div>
    </motion.div>

    <div className={centered ? "flex justify-center" : "grid gap-7 sm:grid-cols-2 xl:grid-cols-3"}>
      {members.length > 0 ? members.map((member, index) => (
        <motion.div
          key={member._id || member.id || `staff-member-${section.key}-${index}`}
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
          className={centered ? "w-full max-w-[420px]" : "w-full"}
        >
          <StaffDirectoryCard
            member={member}
            category={section.title}
            featured={centered}
          />
        </motion.div>
      )) : (
        <div className={centered ? "w-full max-w-[420px]" : "w-full"}>
          <StaffEmptyCard category={section.title} />
        </div>
      )}
    </div>

    {showDivider && (
      <div className="flex justify-center pt-6">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-brand-400 to-transparent" />
      </div>
    )}
  </div>
)

const isKeySeniorTrusteeRole = (member) => {
  const roleText =
    `${member?.position || ""} ${member?.department || ""}`.toLowerCase()

  return (
    roleText.includes("islamiyyah") ||
    roleText.includes("islamiyya") ||
    roleText.includes("tahfeez") ||
    roleText.includes("tahfiz")
  )
}

const uniqueMembers = (members) => {
  const seen = new Set()

  return members.filter((member) => {
    const key =
      member?._id ||
      member?.id ||
      member?.name

    if (!key || seen.has(key)) return false

    seen.add(key)
    return true
  })
}

const TrusteeLeadershipSection = ({ section, directorMembers, seniorMembers }) => {
  const keySeniorMembers =
    seniorMembers.filter(isKeySeniorTrusteeRole)

  const otherSeniorMembers =
    seniorMembers.filter((member) => !isKeySeniorTrusteeRole(member))

  const trusteeCount =
    uniqueMembers([
      ...directorMembers,
      ...seniorMembers,
    ]).length

  return (
    <div className="space-y-12 rounded-[32px] border border-brand-100 bg-white/70 p-5 shadow-soft md:p-8 lg:p-10">
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
        className="mx-auto max-w-4xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-400 shadow-card">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-primary">
            {section.icon}
          </span>
          {section.eyebrow}
        </div>

        <h2 className="text-5xl font-bold text-primary md:text-6xl">
          {section.title}
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-neutral-400">
         This section presents the five trustees according to their leadership roles: the Director stands at the top, followed by key department heads, with the remaining senior staff trustees completing the board leadership team.
        </p>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-400">
          {trusteeCount} {trusteeCount === 1 ? "trustee" : "trustees"} represented
        </p>
      </motion.div>

      <TrusteeRoleGroup
        title="Director"
        description=""
        members={directorMembers}
        badges={["Trustee", "Director"]}
        centered
        featured
      />

      <TrusteeRoleGroup
        title="Key Senior Trustee Roles"
        description="Specific senior staff trustees responsible for major departments such as Islamiyyah and Tahfeez."
        members={keySeniorMembers}
        badges={["Trustee", "Senior Staff"]}
        columns="md:grid-cols-2"
        maxWidth="max-w-4xl"
      />

      <TrusteeRoleGroup
        title="Senior Staff Trustees"
        description="Other senior staff serving within the Board of Trustees leadership structure."
        members={otherSeniorMembers}
        badges={["Trustee", "Senior Staff"]}
        columns="md:grid-cols-2"
        maxWidth="max-w-4xl"
      />
    </div>
  )
}

const TrusteeRoleGroup = ({
  title,
  description,
  members,
  badges = [],
  centered = false,
  featured = false,
  columns = "sm:grid-cols-2 xl:grid-cols-3",
  maxWidth = "max-w-6xl",
}) => (
  <div className="space-y-6">
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-400">
        {title}
      </p>

      <p className="mt-2 text-neutral-400">
        {description}
      </p>
    </div>

    <div className={centered ? "flex justify-center" : `mx-auto grid w-full ${maxWidth} gap-7 ${columns}`}>
      {members.length > 0 ? members.map((member, index) => (
        <motion.div
          key={member._id || member.id || `trustee-member-${title}-${index}`}
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
          className={centered ? "w-full max-w-[420px]" : "w-full"}
        >
          <StaffDirectoryCard
            member={member}
            category="Board of Trustees"
            featured={featured}
            extraBadges={badges}
          />
        </motion.div>
      )) : (
        <div className={centered ? "w-full max-w-[420px]" : "w-full"}>
          <StaffEmptyCard category={title} />
        </div>
      )}
    </div>
  </div>
)

const StaffDirectoryPage = () => {

  const {
    staff,
  } = useStaffAPI()

  const [search, setSearch] =
    useState("")

  const [filter, setFilter] =
    useState("all")

  const searchTerm =
    search.trim().toLowerCase()

  const matchesSearchTerm = (member) =>
    [
      member.name,
      member.position,
      member.department,
      member.category,
      member.role,
    ]
      .filter(Boolean)
      .some((value) =>
        String(value)
          .toLowerCase()
          .includes(searchTerm)
      )

  // =========================
  // FILTER STAFF
  // =========================

  const searchedStaff =
    useMemo(() => {
      if (!searchTerm) return staff

      return staff.filter(matchesSearchTerm)
    }, [
      staff,
      searchTerm,
    ])

  const filteredStaff =
    useMemo(() => {

      return searchedStaff.filter(
        (member) => {
          const matchesFilter =
            filter === "all"
              ? true
              : filter === "board"
                ? ["board", "director", "senior"].includes(normalizeStaffRole(member))
                : normalizeStaffRole(member) ===
                  filter

          return (
            matchesFilter
          )
        }
      )

    }, [
      searchedStaff,
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
      const role =
        normalizeStaffRole(member)

      if (
        grouped[
          role
        ]
      ) {

        grouped[
          role
        ].push(member)
      }
    }
  )

  // =========================
  // HIERARCHY SECTIONS
  // =========================

  const sections = [
    {
      key: "board",

      title:
        "Board of Trustees",

      icon: <FaSitemap />,

      eyebrow:
        "Governance and oversight",
    },

    {
      key: "director",

      title:
        "Director",

      icon: <FaCrown />,

      eyebrow:
        "Executive leadership",
    },

    {
      key: "senior",

      title:
        "Senior Staff",

      icon: <FaUserTie />,

      eyebrow:
        "Experienced institutional leads",
    },

    {
      key: "staff-i",

      title:
        "Staff I",

      icon: <FaUsers />,

      eyebrow:
        "Core administrative and teaching team",
    },

    {
      key: "staff-ii",

      title:
        "Staff II",

      icon: <FaUsers />,

      eyebrow:
        "Operational and academic support",
    },

    {
      key: "staff-iii",

      title:
        "Staff III",

      icon: <FaUsers />,

      eyebrow:
        "Emerging staff members",
    },
  ]

  const boardSection =
    sections.find((section) => section.key === "board")

  const operationalSections =
    sections.filter(
      (section) =>
        section.key !== "board" &&
        section.key !== "director" &&
        section.key !== "senior"
    )

  const showTrusteeSection =
    ["all", "board", "director", "senior"].includes(filter)

  const visibleOperationalSections =
    operationalSections.filter(
      (section) =>
        filter === "all" ||
        section.key === filter
    )

  const getFilterCount = (key) => {
    if (key === "all") return searchedStaff.length

    if (key === "board") {
      return uniqueMembers(
        searchedStaff.filter((member) =>
          ["board", "director", "senior"].includes(normalizeStaffRole(member))
        )
      ).length
    }

    return searchedStaff.filter((member) => normalizeStaffRole(member) === key).length
  }

  const filterOptions = [
    {
      key: "all",
      title: "All",
      icon: <FaUsers />,
    },
    ...(boardSection
      ? [
          {
            key: boardSection.key,
            title: boardSection.title,
            icon: boardSection.icon,
          },
        ]
      : []),
    ...operationalSections.map((section) => ({
      key: section.key,
      title: section.title,
      icon: section.icon,
    })),
  ]

  const hasActiveFilters =
    filter !== "all" ||
    search.length > 0

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
              Our Dedicated Team
            </span>

            <h2 className="section-title">
              Professionally Trained Staff
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed">
             Our staff are carefully developed through discipline, knowledge, mentorship, and service. Each member is guided through structured training and professional development under the supervision of senior leadership and experienced scholars of the foundation
            </p>

            <p className="text-gray-600 leading-relaxed">
             This internal system of mentorship ensures consistency in administration, Islamic education, student engagement, and community service. As the staff are products of the foundation, they are deeply familiar with its norms, values, and mission, which fosters sincerity, unity, and a strong sense of responsibility. Through this approach, the foundation continues to develop a united team committed to excellence, sincerity, professionalism, and the preservation of authentic Islamic values.
            </p>

          </motion.div>

        </div>

      </section>

      {/* FILTERS */}
      <section className="section-padding pt-0">

        <div className="container-custom space-y-16">

          {/* SEARCH + FILTER */}
          <div className="rounded-[28px] border border-brand-100 bg-white p-4 shadow-soft md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-400" />

                <input
                  type="text"
                  placeholder="Search by name, role, department..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 pl-14 pr-12 text-sm text-neutral-700 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-100 text-primary transition hover:bg-brand-50"
                    aria-label="Clear staff search"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("")
                    setFilter("all")
                  }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-5 text-sm font-medium text-primary transition hover:border-brand-400 hover:bg-brand-50"
                >
                  <FaTimes className="text-xs" />
                  Reset
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {filterOptions.map((option) => {
                const active =
                  filter === option.key

                const count =
                  getFilterCount(option.key)

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setFilter(option.key)}
                    className={`inline-flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-primary bg-primary text-white shadow-card"
                        : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-brand-400 hover:bg-white hover:text-primary"
                    }`}
                  >
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-brand-100 text-primary"
                    }`}>
                      {option.icon}
                    </span>

                    <span>{option.title}</span>

                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-white text-neutral-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 text-sm text-neutral-400">
              <p>
                Showing{" "}
                <span className="font-semibold text-primary">
                  {filteredStaff.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-primary">
                  {staff.length}
                </span>{" "}
                staff profiles
              </p>
            </div>
          </div>

          {/* STAFF HIERARCHY */}
          <div className="space-y-24">

            {boardSection && showTrusteeSection && (
              <TrusteeLeadershipSection
                section={boardSection}
                directorMembers={grouped.director}
                seniorMembers={uniqueMembers([
                  ...grouped.senior,
                  ...grouped.board,
                ])}
              />
            )}

            {visibleOperationalSections.map(
              (
                section,
                sectionIndex
              ) => {

                const members =
                  grouped[
                    section.key
                  ]

                return (
                  <StaffSectionBlock
                    key={section.key}
                    section={section}
                    members={members}
                    showDivider={sectionIndex !== visibleOperationalSections.length - 1}
                  />
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
