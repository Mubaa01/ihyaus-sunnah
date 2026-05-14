import { useEffect, useState, useMemo } from "react"
import { getActivities, logActivity, clearActivities } from "../data/mock/activityStore"
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"

const useActivities = () => {
  const [activities, setActivities] = useState([])

  const refreshActivities = () => {
    setActivities(getActivities())
  }

  useEffect(() => {
    refreshActivities()

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshActivities()
    })

    return cleanup
  }, [])

  const addActivity = (entry) => {
    logActivity(entry)
    refreshActivities()
    dispatchAdminDataUpdate({ activities: true })
  }

  const resetActivities = () => {
    clearActivities()
    refreshActivities()
    dispatchAdminDataUpdate({ activities: true })
  }

  // Memoize activities for better performance and reactivity
  const memoizedActivities = useMemo(() => activities, [activities])

  return {
    activities: memoizedActivities,
    addActivity,
    resetActivities,
    refreshActivities,
  }
}

export default useActivities
