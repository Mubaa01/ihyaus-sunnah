// // src/components/programs/ProgramCard.jsx

// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"

// import {
//   FaClock,
//   FaMapMarkerAlt,
//   FaArrowRight,
//   FaBookOpen,
//   FaHandsHelping,
//   FaLayerGroup,
//   FaUsers,
// } from "react-icons/fa"

// const fallbackProgramImage =
//   "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop"

// const ProgramCard = ({
//   program,
//   index = 0,
//   variant = "default",
// }) => {
//   const detailId = program.slug || program._id || program.id
//   const features = program.features || []
//   const detailPath = detailId ? `/programs/${detailId}` : null
//   const title = program.title || "Educational Program"
//   const description =
//     program.shortDescription ||
//     "Structured learning, mentorship, and character development."
//   const category = program.category || "Program"
//   const status = program.status || "active"
//   const level =
//     program.ageGroup ||
//     program.level ||
//     program.targetAge ||
//     program.audience ||
//     program.categories?.[0]?.ageRange ||
//     program.categories?.[0]?.categoryType ||
//     "All learners"
//   const schedule = program.schedule
//     ? [program.schedule.days, program.schedule.time].filter(Boolean).join(" / ")
//     : ""
//   const enrolled = Number(program.stats?.totalStudents || program.enrollment?.enrolled || 0)
//   const capacity = Number(program.enrollment?.capacity || 0)
//   const enrollmentText = enrolled
//     ? `${enrolled}${capacity ? ` / ${capacity}` : ""} enrolled`
//     : "Open enrollment"
//   const enrollmentProgress =
//     enrolled && capacity ? Math.min(100, Math.round((enrolled / capacity) * 100)) : null
//   const highlights = features.length
//     ? features
//     : ["Structured learning", "Qualified mentorship", "Character growth"]
//   const updateGlowPosition = (event) => {
//     const rect = event.currentTarget.getBoundingClientRect()

//     event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`)
//     event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`)
//   }

//   if (variant === "showcase") {
//     const image = program.thumbnail || program.banner || fallbackProgramImage
//     const dayValue = program.schedule?.days || "Flexible"
//     const timeValue = program.schedule?.time || "Time TBA"
//     const studentsValue = enrolled || program.stats?.totalStudents || 0

//     return (
//       <motion.article
//         initial={{
//           opacity: 0,
//           y: 36,
//         }}
//         whileInView={{
//           opacity: 1,
//           y: 0,
//         }}
//         viewport={{ once: true }}
//         transition={{
//           duration: 0.5,
//           delay: index * 0.05,
//         }}
//         whileHover={{
//           y: -8,
//         }}
//         className="group mx-auto flex h-full w-full max-w-[430px] flex-col rounded-lg border border-gray-100 bg-white p-4 shadow-soft transition duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-premium"
//       >
//         <div className="relative overflow-hidden rounded-lg bg-neutral-100 shadow-card">
//           <img
//             src={image}
//             alt={title}
//             className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
//           />
//           <span className="absolute left-4 top-4 rounded-lg border border-white/20 bg-primary/90 px-3 py-2 text-xs font-semibold text-white shadow-card backdrop-blur">
//             {category}
//           </span>
//         </div>

//         <div className="flex flex-1 flex-col px-1 pb-1 pt-6">
//           <div className="mb-5">
//             <h2 className="text-2xl font-bold leading-tight text-primary">
//               {title}
//             </h2>
//           </div>

//           <p className="mb-6 line-clamp-4 text-base leading-7 text-muted">
//             {description}
//           </p>

//           <div className="mb-6 grid grid-cols-3 gap-3">
//             <div className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-4 text-center">
//               <p className="text-xs font-semibold text-muted">Days</p>
//               <p className="mt-2 truncate text-lg font-bold leading-none text-primary">
//                 {dayValue}
//               </p>
//             </div>

//             <div className="rounded-lg border border-gold/20 bg-goldSoft/70 px-3 py-4 text-center">
//               <p className="text-xs font-semibold text-muted">Time</p>
//               <p className="mt-2 truncate text-lg font-bold leading-none text-primary">
//                 {timeValue}
//               </p>
//             </div>

//             <div className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-4 text-center">
//               <p className="text-xs font-semibold text-muted">Students</p>
//               <p className="mt-2 truncate text-lg font-bold leading-none text-primary">
//                 {studentsValue}
//               </p>
//             </div>
//           </div>

//           {detailPath ? (
//             <Link
//               to={detailPath}
//               className="mt-auto inline-flex h-14 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primaryLight"
//             >
//               View Program
//             </Link>
//           ) : (
//             <div className="mt-auto inline-flex h-14 items-center justify-center rounded-lg bg-neutral-200 px-5 text-sm font-semibold text-neutral-500">
//               Details Coming Soon
//             </div>
//           )}
//         </div>
//       </motion.article>
//     )
//   }

//   const getStatusStyle = (
//     status
//   ) => {
//     switch (status) {
//       case "active":
//         return "bg-green-500/90 text-white"

//       case "upcoming":
//         return "bg-yellow-500/90 text-white"

//       case "completed":
//         return "bg-gray-700/90 text-white"

//       default:
//         return "bg-primary/90 text-white"
//     }
//   }

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 40,
//       }}
//       whileInView={{
//         opacity: 1,
//         y: 0,
//       }}
//       viewport={{ once: true }}
//       transition={{
//         duration: 0.5,
//         delay: index * 0.05,
//       }}
//       whileHover={{
//         y: -10,
//       }}
//       onMouseMove={updateGlowPosition}
//       data-program-glow
//       className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-premium"
//     >

//       {/* IMAGE */}
//       <div className="relative h-64 overflow-hidden bg-primary/10">

//         <img
//           src={program.thumbnail || program.banner || fallbackProgramImage}
//           alt={title}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

//         {/* CATEGORY */}
//         <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
//           <FaBookOpen className="text-gold" />
//           {category}
//         </div>

//         {/* STATUS */}
//         <div
//           className={`absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusStyle(
//             status
//           )}`}
//         >
//           {status}
//         </div>

//         {/* CONTENT */}
//         <div className="absolute bottom-5 left-5 right-5 text-white">

//           <h2 className="mb-3 text-2xl md:text-3xl font-bold leading-tight">
//             {title}
//           </h2>

//           <p className="text-gray-200 line-clamp-2 leading-relaxed">
//             {description}
//           </p>

//         </div>

//       </div>

//       {/* BODY */}
//       <div className="flex flex-1 flex-col p-6 md:p-7">

//         {/* META */}
//         <div className="grid gap-4 sm:grid-cols-2">

//           {/* DURATION */}
//           <div className="flex items-start gap-3">

//             <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
//               <FaClock />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Duration
//               </p>

//               <p className="font-semibold text-primary">
//                 {program.duration || "Ongoing"}
//               </p>
//             </div>

//           </div>

//           {/* LOCATION */}
//           <div className="flex items-start gap-3">

//             <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
//               <FaMapMarkerAlt />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Location
//               </p>

//               <p className="font-semibold text-primary line-clamp-1">
//                 {program.location || "Foundation Campus"}
//               </p>
//             </div>

//           </div>

//         </div>

//         <div className="mt-5 grid gap-4 sm:grid-cols-2">
//           <div className="flex items-start gap-3">
//             <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
//               <FaLayerGroup />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Age / Level
//               </p>
//               <p className="font-semibold text-primary line-clamp-1">
//                 {level}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-3">
//             <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
//               <FaUsers />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Enrollment
//               </p>
//               <p className="font-semibold text-primary line-clamp-1">
//                 {enrollmentText}
//               </p>
//             </div>
//           </div>
//         </div>

//         {schedule && (
//           <div className="mt-5 rounded-lg border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
//             {schedule}
//           </div>
//         )}

//         {enrollmentProgress !== null && (
//           <div className="mt-5">
//             <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
//               <span>Enrollment</span>
//               <span>{enrollmentProgress}%</span>
//             </div>
//             <div className="h-2 overflow-hidden rounded-full bg-gray-100">
//               <div
//                 className="h-full rounded-full bg-gold"
//                 style={{ width: `${enrollmentProgress}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* FEATURES */}
//         <div className="mt-6">

//           <p className="text-sm font-semibold text-gray-500 mb-3">
//             Program Highlights
//           </p>

//           <div className="flex flex-wrap gap-2">

//             {highlights
//               .slice(0, 3)
//               .map((feature) => (
//                 <span
//                   key={feature}
//                   className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
//                 >
//                   {feature}
//                 </span>
//               ))}

//           </div>

//         </div>

//         {/* CTA */}
//         <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-[1fr_auto]">
//           {detailPath ? (
//             <Link
//               to={detailPath}
//               className="group/button flex items-center justify-center gap-3 bg-primary text-white px-5 py-4 rounded-lg hover:bg-primaryLight transition-all duration-300"
//             >
//               <span className="font-semibold">
//                 View Details
//               </span>
//               <FaArrowRight className="group-hover/button:translate-x-1 transition-transform duration-300" />
//             </Link>
//           ) : (
//             <div className="flex items-center justify-center bg-gray-100 text-gray-500 px-5 py-4 rounded-lg">
//               <span className="font-semibold">
//                 Details Coming Soon
//               </span>
//             </div>
//           )}

//           <Link
//             to="/donate"
//             className="flex items-center justify-center gap-2 rounded-lg border border-primary/15 px-5 py-4 font-semibold text-primary transition-all duration-300 hover:border-gold hover:bg-gold/10"
//           >
//             <FaHandsHelping />
//             Sponsor
//           </Link>
//         </div>

//       </div>
//     </motion.div>
//   )
// }

// export default ProgramCard


// src/components/programs/ProgramCard.jsx

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FaArrowRight,
  FaUsers,
} from "react-icons/fa"

const fallbackProgramImage =
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop"

const ProgramCard = ({
  program,
  index = 0,
}) => {

  const detailId =
    program.slug ||
    program._id ||
    program.id

  const detailPath = detailId
    ? `/programs/${detailId}`
    : null

  const title =
    program.title ||
    "Educational Program"

  const description =
    program.shortDescription ||
    "Structured learning, mentorship, and character development."

  const category =
    program.category ||
    "Program"

  const status =
    program.status ||
    "Active"

  const students =
    Number(
      program.stats?.totalStudents ||
      program.enrollment?.enrolled ||
      0
    )

  const image =
    program.thumbnail ||
    program.banner ||
    fallbackProgramImage

  const getStatusStyle = (status) => {

    switch (status.toLowerCase()) {

      case "active":
        return `
          bg-emerald-500/15
          text-emerald-600
          border-emerald-500/20
        `

      case "upcoming":
        return `
          bg-amber-500/15
          text-amber-600
          border-amber-500/20
        `

      case "completed":
        return `
          bg-neutral-500/15
          text-neutral-600
          border-neutral-500/20
        `

      default:
        return `
          bg-primary/10
          text-primary
          border-primary/20
        `
    }
  }

  return (

    <motion.article

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
        duration: 0.6,
        delay: index * 0.08,
        ease: "easeOut",
      }}

      whileHover={{
        y: -6,
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-black/5
        bg-white
        shadow-[0_10px_40px_rgba(0,0,0,0.04)]
        transition-all
        duration-500
        hover:border-primary/10
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >

      {/* Glow Effect */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -top-24
            right-0
            h-56
            w-56
            rounded-full
            bg-primary/10
            blur-3xl
          "
        />
      </div>

      {/* IMAGE */}

      <div className="relative overflow-hidden p-3">

        <div className="relative overflow-hidden rounded-[24px]">

          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              aspect-[4/3]
              w-full
              object-cover
              transition-all
              duration-700
              ease-out
              group-hover:scale-[1.06]
              group-hover:brightness-110
            "
          />

          {/* Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/70
              via-black/10
              to-transparent
            "
          />

          {/* Top Content */}

          <div
            className="
              absolute
              left-5
              right-5
              top-5
              flex
              items-center
              justify-between
            "
          >

            {/* Category */}

            <div
              className="
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white
                backdrop-blur-md
              "
            >
              {category}
            </div>

            {/* Status */}

            <div
              className={`
                rounded-full
                border
                px-4
                py-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                backdrop-blur-md
                ${getStatusStyle(status)}
              `}
            >
              {status}
            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="flex flex-col px-7 pb-7 pt-2">

        {/* Title */}

        <motion.h2

          layout

          className="
            text-[1.55rem]
            font-bold
            leading-tight
            tracking-[-0.03em]
            text-primary
          "
        >
          {title}
        </motion.h2>

        {/* Description */}

        <p
          className="
            mt-4
            line-clamp-3
            text-[15px]
            leading-7
            text-muted
          "
        >
          {description}
        </p>

        {/* Students */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <FaUsers />
          </div>

          <div>

            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-[0.14em]
                text-gray-400
              "
            >
              Students
            </p>

            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-primary
              "
            >
              {students}+ enrolled learners
            </p>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-8">

          {detailPath ? (

            <Link
              to={detailPath}

              className="
                group/button
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-primary
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-primaryLight
              "
            >

              <span>
                View Program
              </span>

              <FaArrowRight
                className="
                  transition-transform
                  duration-300
                  group-hover/button:translate-x-1
                "
              />

            </Link>

          ) : (

            <div
              className="
                inline-flex
                items-center
                rounded-2xl
                bg-neutral-100
                px-6
                py-4
                text-sm
                font-semibold
                text-neutral-500
              "
            >
              Details Coming Soon
            </div>

          )}

        </div>

      </div>

    </motion.article>
  )
}

export default ProgramCard