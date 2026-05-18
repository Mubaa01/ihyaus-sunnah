import { useEffect, useState, useMemo } from "react"
// TODO: Replace all activities mock logic with real API

import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"
import { activitiesAPI } from "../services/api"

const useActivities = () => {
  const [activities, setActivities] = useState([])


  const refreshActivities = async () => {
    try {
      const data = await activitiesAPI.getAll()
      setActivities(data)
    } catch (err) {
      setActivities([])
    }
  }                                                                                                 


  useEffect(() => {
    refreshActivities()

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshActivities()
    })

    return cleanup
  }, [])


  const addActivity = async (entry) => {
    await activitiesAPI.create(entry)
    refreshActivities()
    dispatchAdminDataUpdate({ activities: true })
  }


  // Optionally implement resetActivities if needed
  const resetActivities = () => {
    // Not implemented: depends on backend support
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
