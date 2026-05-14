// src/hooks/usePrograms.js

import { useEffect, useMemo, useState } from "react"

import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../data/mock/programsStore"
import { logActivity } from "../data/mock/activityStore"
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"

const usePrograms = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  const refreshPrograms = () => {
    try {
      const data = getPrograms()
      setPrograms(data || [])
    } catch (error) {
      console.error("Failed to load programs:", error)
      setPrograms([])
    }
  }

  useEffect(() => {
    const loadPrograms = () => {
      try {
        refreshPrograms()
      } catch (error) {
        console.error("Failed to load programs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPrograms()

    const cleanup = subscribeAdminDataUpdates(() => {
      refreshPrograms()
    })

    return cleanup
  }, [])

  const featuredPrograms = useMemo(
    () => programs.filter((program) => program.isFeatured),
    [programs]
  )

  const activePrograms = useMemo(
    () => programs.filter((program) => program.status === "active"),
    [programs]
  )

  const categories = useMemo(
    () => [
      ...new Set(
        programs.map((program) => program.category).filter(Boolean)
      ),
    ],
    [programs]
  )

  const addProgram = (data) => {
    createProgram(data)
    logActivity({
      type: "program",
      action: "Created program",
      details: `${data.title || data.name} was added to the program lineup`,
      reference: data.id || null,
    })
    setPrograms(getPrograms())
    dispatchAdminDataUpdate({ programs: true })
  }

  const editProgram = (id, data) => {
    updateProgram(id, data)
    logActivity({
      type: "program",
      action: "Updated program",
      details: `${data.title || data.name} was updated`,
      reference: id,
    })
    setPrograms(getPrograms())
    dispatchAdminDataUpdate({ programs: true })
  }

  const removeProgram = (id) => {
    const existing = getPrograms().find((item) => item.id === id)
    deleteProgram(id)
    logActivity({
      type: "program",
      action: "Removed program",
      details: `${existing?.title || "A program"} was deleted`,
      reference: id,
    })
    setPrograms(getPrograms())
    dispatchAdminDataUpdate({ programs: true })
  }

  return {
    programs,
    setPrograms,
    loading,

    featuredPrograms,
    activePrograms,
    categories,

    addProgram,
    editProgram,
    removeProgram,
  }
}

export default usePrograms