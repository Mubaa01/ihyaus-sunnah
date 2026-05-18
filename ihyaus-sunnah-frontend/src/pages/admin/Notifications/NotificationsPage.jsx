import { useMemo, useState } from "react"
import { FaBell, FaCheckCircle, FaTrashAlt, FaPlus, FaChevronLeft, FaEye, FaTimes } from "react-icons/fa"
import useNotificationsAPI from "../../../hooks/useNotificationsAPI"
import { Link } from "react-router-dom"

const typeLabel = (type) => {
  switch (type) {
    case "staff":
      return "Staff"
    case "program":
      return "Program"
    case "media":
      return "Media"
    default:
      return "General"
  }
}

const NotificationsPage = () => {
  const {
    notifications,
    createNotification,
    toggleRead,
    removeNotification,
    clearAll,
    unreadCount,
  } = useNotificationsAPI()

  const [newNotification, setNewNotification] = useState({
    type: "staff",
    title: "",
    message: "",
  })

  const sorted = useMemo(
    () => [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [notifications]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newNotification.title.trim() || !newNotification.message.trim()) return

    createNotification(newNotification)
    setNewNotification({ type: "staff", title: "", message: "" })
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Notifications</h1>
          <p className="text-gray-500 mt-2">
            Track admin alerts, staff actions, program changes and media updates.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/admin/settings" className="btn-secondary">
            Settings
          </Link>
          <Link to="/admin" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1.3fr_0.9fr] gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary">Recent Notifications</h2>
              <p className="text-sm text-gray-500">{unreadCount} unread notification{unreadCount === 1 ? "" : "s"}</p>
            </div>
            <button
              onClick={clearAll}
              className="btn-dark-outline"
            >
              Clear All
            </button>
          </div>

          {sorted.length === 0 ? (
            <div className="py-24 text-center text-gray-500">
              <FaBell className="mx-auto w-12 h-12 mb-4 text-gray-300" />
              <p className="text-lg font-semibold">No notifications yet</p>
              <p className="mt-2">Create a new item or let the system generate alerts.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sorted.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-3xl border px-5 py-4 transition-all ${notification.read ? "border-gray-200 bg-white" : "border-primary/20 bg-primary/5"}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-primary/10 text-primary">
                          <FaBell />
                        </span>
                        <div>
                          <p className="font-semibold text-primary">{notification.title}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{typeLabel(notification.type)}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{notification.message}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span>{new Date(notification.createdAt).toLocaleString()}</span>
                      <button
                        onClick={() => toggleRead(notification.id)}
                        className="text-primary hover:text-secondary"
                      >
                        {notification.read ? "Mark unread" : "Mark read"}
                      </button>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-12 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
              <FaPlus />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-primary">Create Notification</h2>
              <p className="text-sm text-gray-500">Add a custom admin alert for quick action or reminders.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-gray-600">
              Category
              <select
                value={newNotification.type}
                onChange={(e) => setNewNotification((prev) => ({ ...prev, type: e.target.value }))}
                className="input-primary mt-2 w-full"
              >
                <option value="staff">Staff</option>
                <option value="program">Program</option>
                <option value="media">Media</option>
                <option value="general">General</option>
              </select>
            </label>

            <label className="block text-sm text-gray-600">
              Title
              <input
                value={newNotification.title}
                onChange={(e) => setNewNotification((prev) => ({ ...prev, title: e.target.value }))}
                className="input-primary mt-2 w-full"
              />
            </label>

            <label className="block text-sm text-gray-600">
              Message
              <textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification((prev) => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="input-primary mt-2 w-full resize-none"
              />
            </label>

            <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
              <FaCheckCircle /> Create Notification
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
