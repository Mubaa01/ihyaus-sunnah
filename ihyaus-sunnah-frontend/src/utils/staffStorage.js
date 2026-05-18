// TODO: Remove all mock staff data logic and replace with real API

const STORAGE_KEY = "ihyau_staff_data"

/* =========================================
   GET STAFF DATA
========================================= */

export const getStaffData = () => {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (storedData) {
    return JSON.parse(storedData)
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultStaffData)
  )

  return defaultStaffData
}

/* =========================================
   SAVE STAFF DATA
========================================= */

export const saveStaffData = (data) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  )
}

/* =========================================
   CREATE STAFF
========================================= */

export const createStaff = (newStaff) => {
  const staff = getStaffData()

  const updatedStaff = [
    ...staff,
    {
      ...newStaff,
      id: Date.now().toString(),
    },
  ]

  saveStaffData(updatedStaff)

  return updatedStaff
}

/* =========================================
   UPDATE STAFF
========================================= */

export const updateStaff = (id, updatedData) => {
  const staff = getStaffData()

  const updatedStaff = staff.map((member) =>
    member.id === id
      ? {
          ...member,
          ...updatedData,
        }
      : member
  )

  saveStaffData(updatedStaff)

  return updatedStaff
}

/* =========================================
   DELETE STAFF
========================================= */

export const deleteStaff = (id) => {
  const staff = getStaffData()

  const updatedStaff = staff.filter(
    (member) => member.id !== id
  )

  saveStaffData(updatedStaff)

  return updatedStaff
}

/* =========================================
   GET SINGLE STAFF
========================================= */

export const getSingleStaff = (id) => {
  const staff = getStaffData()

  return staff.find(
    (member) => member.id === id
  )
}