
import { useEffect, useMemo, useState } from "react"
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"
import { notificationsAPI } from "../services/api"

const useNotifications = () => {
  const [notifications, setNotifications] = useState([])


  const refresh = async () => {
    try {
      const data = await notificationsAPI.getAll()
      setNotifications(data)
    } catch (err) {
      setNotifications([])
    }
  }


  useEffect(() => {
    refresh()

    const cleanup = subscribeAdminDataUpdates(() => {
      refresh()
    })

    return cleanup
  }, [])


  const createNotification = async (payload) => {
    await notificationsAPI.create(payload)
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }


  // Optionally implement toggleRead if backend supports it
  const toggleRead = (id) => {
    // Not implemented: depends on backend support
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }


  // Optionally implement removeNotification if backend supports it
  const removeNotification = (id) => {
    // Not implemented: depends on backend support
    refresh()
    dispatchAdminDataUpdate({ notifications: true })
  }


  // Optionally implement clearAll if backend supports it
  const clearAll = () => {
    // Not implemented: depends on backend support
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
