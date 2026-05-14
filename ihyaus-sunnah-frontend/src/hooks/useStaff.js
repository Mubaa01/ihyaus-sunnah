// src/hooks/useStaff.js

import { useEffect, useMemo, useState } from "react"

import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../data/mock/staffStore"
import { logActivity } from "../data/mock/activityStore"
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from "../utils/adminDataSync"

const useStaff = () => {

  const [staff, setStaff] =
    useState([])

  const refresh = () => {
    setStaff(getStaff())
  }

  useEffect(() => {
    refresh()

    const cleanup = subscribeAdminDataUpdates(() => {
      refresh()
    })

    return cleanup
  }, [])

  // =========================
  // GROUPED STAFF
  // =========================

  const groupedStaff =
    useMemo(() => {

      return {

        directors:
          staff.filter(
            (item) =>
              item.role ===
              "director"
          ),

        board:
          staff.filter(
            (item) =>
              item.role ===
              "board"
          ),

        senior:
          staff.filter(
            (item) =>
              item.role ===
              "senior"
          ),

        staffI:
          staff.filter(
            (item) =>
              item.role ===
              "staff-i"
          ),

        staffII:
          staff.filter(
            (item) =>
              item.role ===
              "staff-ii"
          ),

        staffIII:
          staff.filter(
            (item) =>
              item.role ===
              "staff-iii"
          ),
      }

    }, [staff])

  // =========================
  // CRUD OPERATIONS
  // =========================

  const addStaff = (data) => {
    createStaff(data)
    logActivity({
      type: "staff",
      action: "Added staff member",
      details: `${data.name} was added as ${data.position || data.role}`,
      reference: data.id || null,
    })
    setStaff(getStaff())
    dispatchAdminDataUpdate({ staff: true })
  }

  const editStaff = (id, data) => {
    updateStaff(id, data)
    logActivity({
      type: "staff",
      action: "Updated staff member",
      details: `${data.name} was updated`,
      reference: id,
    })
    setStaff(getStaff())
    dispatchAdminDataUpdate({ staff: true })
  }

  const removeStaff = (id) => {
    const existing = getStaff().find((item) => item.id === id)
    deleteStaff(id)
    logActivity({
      type: "staff",
      action: "Removed staff member",
      details: `${existing?.name || "A staff member"} was deleted`,
      reference: id,
    })
    setStaff(getStaff())
    dispatchAdminDataUpdate({ staff: true })
  }

  // =========================
  // RETURN
  // =========================

  return {

    // raw
    staff,

    // grouped
    groupedStaff,

    // CRUD
    addStaff,
    editStaff,
    removeStaff,
  }
}

export default useStaff