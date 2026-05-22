import { useCallback, useEffect, useMemo, useState } from "react"
import { researchAPI } from "../services/api"
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"

const normalizeResearch = (item) => ({
  ...item,
  id: item._id || item.id,
  tags: Array.isArray(item.tags) ? item.tags : [],
})

const useStudentResearchAPI = (initialFilters = {}) => {
  const [research, setResearch] = useState([])
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshResearch = useCallback(async (filters = initialFilters) => {
    try {
      setLoading(true)
      const response = await researchAPI.getAll(filters)
      setResearch((response.data || []).map(normalizeResearch))
      setMeta(response.meta || {})
      setError(null)
      return response
    } catch (err) {
      setError(err.message || "Failed to load research")
      setResearch([])
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshResearch().catch(() => {})

    const cleanup = subscribeAdminDataUpdates((payload) => {
      if (!payload || payload.research) {
        refreshResearch().catch(() => {})
      }
    })

    return cleanup
  }, [refreshResearch])

  const getResearchById = async (id) => {
    const response = await researchAPI.getById(id)
    return normalizeResearch(response.data)
  }

  const addResearch = async (data, secretKey) => {
    const response = await researchAPI.create(data, secretKey)
    await refreshResearch()
    dispatchAdminDataUpdate({ research: true })
    return response
  }

  const editResearch = async (id, data, secretKey) => {
    const response = await researchAPI.update(id, data, secretKey)
    await refreshResearch()
    dispatchAdminDataUpdate({ research: true })
    return response
  }

  const removeResearch = async (id, secretKey) => {
    await researchAPI.delete(id, secretKey)
    await refreshResearch()
    dispatchAdminDataUpdate({ research: true })
  }

  const publishedResearch = useMemo(
    () => research.filter((item) => item.status === "published"),
    [research]
  )

  return {
    research,
    researchItems: research,
    publishedResearch,
    meta,
    loading,
    error,
    refreshResearch,
    getResearchById,
    addResearch,
    editResearch,
    removeResearch,
  }
}

export default useStudentResearchAPI
