// src/context/StaffContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  getStaff,
} from "../data/mock/staffStore"

const StaffContext =
  createContext()

export const StaffProvider = ({
  children,
}) => {
  const [staff, setStaff] =
    useState([])

  useEffect(() => {
    setStaff(getStaff())
  }, [])

  return (
    <StaffContext.Provider
      value={{
        staff,
        setStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  )
}

export const useStaffContext =
  () => useContext(StaffContext)