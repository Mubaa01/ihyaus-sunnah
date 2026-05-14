const STORAGE_KEY = "ihya_admin_profile"

const generateSecretKey = () => {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

const initializeProfile = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultProfile = {
      id: 1,
      name: "Admin User",
      email: "admin@ihyaus.org",
      role: "Super Administrator",
      secretKey: generateSecretKey(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfile))
  }
}

export const getAdminProfile = () => {
  initializeProfile()
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export const updateAdminProfile = (updates) => {
  const profile = getAdminProfile()
  const updated = {
    ...profile,
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const getAdminSecretKey = () => {
  const profile = getAdminProfile()
  return profile.secretKey
}

export const setAdminSecretKey = (newKey) => {
  return updateAdminProfile({ secretKey: newKey })
}

export const resetAdminSecretKey = () => {
  const newKey = generateSecretKey()
  return setAdminSecretKey(newKey)
}
