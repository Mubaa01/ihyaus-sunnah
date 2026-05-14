// src/data/mock/programGalleryStore.js

const STORAGE_KEY = "ihya_program_gallery_data"

const generateInitialGallery = () => {
  return [
    // Tahfeez Beginner Level (programId 1, categoryId 1)
    { id: 1, programId: 1, categoryId: 1, type: "image", url: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=200&auto=format&fit=crop", caption: "Young student with Mushaf" },
    { id: 2, programId: 1, categoryId: 1, type: "image", url: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=200&auto=format&fit=crop", caption: "One-on-one recitation" },
    { id: 3, programId: 1, categoryId: 1, type: "image", url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=200&auto=format&fit=crop", caption: "Group memorization session" },
    { id: 4, programId: 1, categoryId: 1, type: "video", url: "https://example.com/video5.mp4", thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=400&auto=format&fit=crop", caption: "Young student reciting Juz Amma", duration: "30s" },

    // Tahfeez Intermediate Level (programId 1, categoryId 2)
    { id: 5, programId: 1, categoryId: 2, type: "image", url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=200&auto=format&fit=crop", caption: "Intermediate memorization session" },
    { id: 6, programId: 1, categoryId: 2, type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", caption: "Peer revision pairs" },
    { id: 7, programId: 1, categoryId: 2, type: "video", url: "https://example.com/video6.mp4", thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop", caption: "Student recitation progress", duration: "45s" },
    { id: 8, programId: 1, categoryId: 2, type: "image", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop", caption: "Qira'at instruction" },

    // Islamiyyah Beginner Level (programId 2, categoryId 3)
    { id: 9, programId: 2, categoryId: 3, type: "image", url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=200&auto=format&fit=crop", caption: "Students during morning assembly" },
    { id: 10, programId: 2, categoryId: 3, type: "image", url: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=200&auto=format&fit=crop", caption: "Quran reading practice" },
    { id: 11, programId: 2, categoryId: 3, type: "image", url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=200&auto=format&fit=crop", caption: "Group learning activity" },
    { id: 12, programId: 2, categoryId: 3, type: "video", url: "https://example.com/video1.mp4", thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=400&auto=format&fit=crop", caption: "Basic class recitation session", duration: "45s" },

    // Islamiyyah Intermediate Level (programId 2, categoryId 4)
    { id: 13, programId: 2, categoryId: 4, type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", caption: "Intermediate class discussion" },
    { id: 14, programId: 2, categoryId: 4, type: "image", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200&auto=format&fit=crop", caption: "Text analysis session" },
    { id: 15, programId: 2, categoryId: 4, type: "image", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop", caption: "Group study session" },
    { id: 16, programId: 2, categoryId: 4, type: "video", url: "https://example.com/video3.mp4", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", caption: "Student presentation", duration: "60s" },

    // Youth Leadership Training (programId 3, categoryId 5)
    { id: 17, programId: 3, categoryId: 5, type: "image", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop", caption: "Leadership workshop" },
    { id: 18, programId: 3, categoryId: 5, type: "image", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200&auto=format&fit=crop", caption: "Team coaching session" },
    { id: 19, programId: 3, categoryId: 5, type: "video", url: "https://example.com/video8.mp4", thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop", caption: "Youth mentorship session", duration: "90s" },

    // Youth Community Service (programId 3, categoryId 6)
    { id: 20, programId: 3, categoryId: 6, type: "image", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200&auto=format&fit=crop", caption: "Community service activity" },
    { id: 21, programId: 3, categoryId: 6, type: "image", url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=200&auto=format&fit=crop", caption: "Volunteer project" },
    { id: 22, programId: 3, categoryId: 6, type: "image", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", caption: "Group planning session" },
  ]
}

const isGalleryDataValid = (items) => {
  return (
    Array.isArray(items) &&
    items.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'number' &&
        typeof item.programId === 'number' &&
        typeof item.categoryId === 'number' &&
        typeof item.type === 'string'
    )
  )
}

export const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generateInitialGallery()))
    return
  }

  try {
    const parsed = JSON.parse(existing)
    if (!isGalleryDataValid(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generateInitialGallery()))
    }
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generateInitialGallery()))
  }
}

const normalizeGalleryId = (value) => Number(value)

export const getGalleryItems = (programId, categoryId) => {
  initializeStorage()
  
  const allItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  return allItems.filter(
    (item) =>
      normalizeGalleryId(item.programId) === normalizeGalleryId(programId) &&
      normalizeGalleryId(item.categoryId) === normalizeGalleryId(categoryId)
  )
}

export const getGalleryItemById = (id) => {
  const allItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  return allItems.find((item) => item.id === Number(id))
}

export const addGalleryItem = (programId, categoryId, item) => {
  const allItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const newItem = {
    ...item,
    id: Date.now(),
    programId: normalizeGalleryId(programId),
    categoryId: normalizeGalleryId(categoryId),
    uploadedAt: new Date().toISOString()
  }
  
  const updated = [...allItems, newItem]
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return newItem
}

export const updateGalleryItem = (id, data) => {
  const allItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const updated = allItems.map((item) =>
    item.id === Number(id)
      ? { ...item, ...data, updatedAt: new Date().toISOString() }
      : item
  )
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

export const deleteGalleryItem = (id) => {
  const allItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const updated = allItems.filter((item) => item.id !== Number(id))
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

export const getGalleryCount = (programId, categoryId) => {
  const items = getGalleryItems(programId, categoryId)
  
  return {
    total: items.length,
    images: items.filter((item) => item.type === "image").length,
    videos: items.filter((item) => item.type === "video").length
  }
}