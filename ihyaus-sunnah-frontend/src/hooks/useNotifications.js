import { useEffect, useMemo, useState } from "react"
import {
  getNotifications,
  addNotification,
  toggleNotificationRead,
  deleteNotification,
  clearNotifications,
} from "../data/mock/notificationStore"
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"

const useNotifications = () => {
  const [notifications, setNotifications] = useState([])

  const refresh = () => {
    setNotifications(getNotifications())
  }

  useEffect(() => {
    refresh()

    const cleanup = subscribeAdminDataUpdates(() => {
      refresh()
    })

    return cleanup
  }, [])

  const createNotification = (payload) => {
    addNotification(payload)
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }

  const toggleRead = (id) => {
    toggleNotificationRead(id)
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }

  const removeNotification = (id) => {
    deleteNotification(id)
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }

  const clearAll = () => {
    clearNotifications()
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  )

  return {
    notifications,
    createNotification,
    toggleRead,
    removeNotification,
    clearAll,
    refresh,
    unreadCount,
  }
}

export default useNotifications
