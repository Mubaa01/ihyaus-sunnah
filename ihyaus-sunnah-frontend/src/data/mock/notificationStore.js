const STORAGE_KEY = "ihya_admin_notifications"

const generateInitialNotifications = () => [
  {
    id: Date.now(),
    type: "staff",
    title: "New staff approval needed",
    message: "Review the recently submitted staff application from Ali.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: Date.now() + 1,
    type: "program",
    title: "Program schedule updated",
    message: "The Tahfeez program timetable has been modified.",
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    read: false,
  },
  {
    id: Date.now() + 2,
    type: "media",
    title: "New lecture uploaded",
    message: "A new video lecture is ready for review.",
    createdAt: new Date(Date.now() - 7200 * 1000).toISOString(),
    read: true,
  },
]

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generateInitialNotifications()))
  }
}

export const getNotifications = () => {
  initializeStorage()
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export const addNotification = ({ type, title, message }) => {
  const items = getNotifications()
  const newNotification = {
    id: Date.now(),
    type,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  }

  const updated = [newNotification, ...items]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const markNotificationAsRead = (id) => {
  const items = getNotifications()
  const updated = items.map((item) =>
    item.id === Number(id) ? { ...item, read: true } : item
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const toggleNotificationRead = (id) => {
  const items = getNotifications()
  const updated = items.map((item) =>
    item.id === Number(id) ? { ...item, read: !item.read } : item
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const deleteNotification = (id) => {
  const items = getNotifications()
  const updated = items.filter((item) => item.id !== Number(id))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const clearNotifications = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  return []
}
