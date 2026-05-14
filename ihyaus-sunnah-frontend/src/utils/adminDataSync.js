export const ADMIN_DATA_UPDATE_EVENT = "ihyaus-admin-data-update"

export const dispatchAdminDataUpdate = (payload = {}) => {
  if (typeof window === "undefined") return
  const event = new CustomEvent(ADMIN_DATA_UPDATE_EVENT, {
    detail: payload,
  })
  window.dispatchEvent(event)
}

export const subscribeAdminDataUpdates = (handler) => {
  if (typeof window === "undefined") return () => {}

  const listener = (event) => handler(event.detail)
  window.addEventListener(ADMIN_DATA_UPDATE_EVENT, listener)

  return () => {
    window.removeEventListener(ADMIN_DATA_UPDATE_EVENT, listener)
  }
}
