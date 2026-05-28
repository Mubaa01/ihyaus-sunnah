import { useEffect, useState, useMemo } from "react"

import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"
import { activitiesAPI } from "../services/api"

const useActivities = () => {
  const [activities, setActivities] = useState([])


  const refreshActivities = async () => {
    try {
      const response = await activitiesAPI.getAll()
      setActivities(Array.isArray(response) ? response : response.data || [])
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
    await refreshActivities()
    dispatchAdminDataUpdate({ activities: true })
  }


  const resetActivities = async () => {
    await activitiesAPI.deleteAll()
    await refreshActivities()
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
