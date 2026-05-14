const STORAGE_KEY = "ihya_admin_activities"

const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }
}

export const getActivities = () => {
  initializeStorage()
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export const logActivity = ({ type, action, details, reference }) => {
  const activities = getActivities()
  const newActivity = {
    id: Date.now(),
    type,
    action,
    details,
    reference: reference || null,
    createdAt: new Date().toISOString(),
  }

  const updated = [newActivity, ...activities]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const clearActivities = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  return []
}
