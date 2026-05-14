import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  FaUsers,
  FaBookOpen,
  FaImages,
  FaDonate,
  FaClock,
  FaTrashAlt,
} from "react-icons/fa"

import useActivities from "../../../hooks/useActivities"

const typeIcon = (type) => {
  switch (type) {
    case "staff":
      return <FaUsers />
    case "program":
      return <FaBookOpen />
    case "media":
      return <FaImages />
    case "donation":
      return <FaDonate />
    default:
      return <FaClock />
  }
}

const getTimeAgo = (dateString) => {
  const delta = Math.floor((new Date() - new Date(dateString)) / 1000)
  if (delta < 60) return `${delta}s ago`
  if (delta < 3600) return `${Math.floor(delta / 60)}m ago`
  if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`
  return `${Math.floor(delta / 86400)}d ago`
}

const ActivitiesPage = () => {
  const { activities, resetActivities } = useActivities()

  const sortedActivities = useMemo(
    () => [...activities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [activities]
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Activity Feed</h1>
          <p className="text-gray-500 mt-2">
            Review recent admin actions and audit history for staff, programs, and media.
          </p>
        </div>

        <button
          onClick={resetActivities}
          className="btn-secondary"
        >
          <FaTrashAlt className="mr-2" /> Clear Activity Log
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
        <div className="grid gap-6">
          {sortedActivities.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl font-semibold text-gray-700">No activity recorded yet.</p>
              <p className="text-gray-500 mt-3">Perform an admin action to populate the activity feed.</p>
            </div>
          ) : (
            sortedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex items-start gap-5 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                  {typeIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-primary">{activity.action}</h2>
                      <p className="text-sm text-gray-500 mt-2">{activity.details}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {getTimeAgo(activity.createdAt)}
                    </span>
                  </div>

                  {activity.reference && (
                    <div className="mt-4 text-sm text-gray-500">
                      Reference: <span className="text-gray-700">{activity.reference}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivitiesPage
