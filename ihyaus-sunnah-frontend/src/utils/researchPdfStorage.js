const DB_NAME = "ihyaus_student_research_pdfs"
const STORE_NAME = "pdfs"
const IMAGES_STORE = "images"
const DB_VERSION = 2

const openDb = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not available"))
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const performTransaction = (storeName, mode, callback) => {
  return openDb().then((db) => {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode)
      const store = tx.objectStore(storeName)
      const request = callback(store)

      tx.oncomplete = () => resolve(request.result)
      tx.onerror = () => reject(tx.error)
      request.onerror = () => reject(request.error)
    })
  })
}

export const saveResearchPdf = (key, file) => {
  if (!key || !file) return Promise.resolve(null)
  return performTransaction(STORE_NAME, "readwrite", (store) => store.put(file, key))
}

export const getResearchPdfBlob = (key) => {
  if (!key) return Promise.resolve(null)
  return performTransaction(STORE_NAME, "readonly", (store) => store.get(key))
}

export const deleteResearchPdf = (key) => {
  if (!key) return Promise.resolve(null)
  return performTransaction(STORE_NAME, "readwrite", (store) => store.delete(key))
}

export const getResearchPdfUrl = async (key) => {
  const blob = await getResearchPdfBlob(key)
  if (!blob) return null
  return URL.createObjectURL(blob)
}

export const saveResearchImage = (key, file) => {
  if (!key || !file) return Promise.resolve(null)
  return performTransaction(IMAGES_STORE, "readwrite", (store) => store.put(file, key))
}

export const getResearchImageBlob = (key) => {
  if (!key) return Promise.resolve(null)
  return performTransaction(IMAGES_STORE, "readonly", (store) => store.get(key))
}

export const deleteResearchImage = (key) => {
  if (!key) return Promise.resolve(null)
  return performTransaction(IMAGES_STORE, "readwrite", (store) => store.delete(key))
}

export const getResearchImageUrl = async (key) => {
  const blob = await getResearchImageBlob(key)
  if (!blob) return null
  return URL.createObjectURL(blob)
}
