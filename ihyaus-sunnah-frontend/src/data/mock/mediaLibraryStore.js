// src/data/store/mediaLibraryStore.js

const STORAGE_KEY = "ihya_media_library_data"
const PLAYLISTS_KEY = "ihya_media_playlists_data"

const generateInitialPlaylists = () => {
  return [
    // Trustee 1 Playlists
    { id: 1, trusteeId: 1, mediaType: "video", playlistName: "Leadership Lectures", createdAt: "2026-04-01T00:00:00.000Z" },
    { id: 2, trusteeId: 1, mediaType: "audio", playlistName: "Islamic Finance Talks", createdAt: "2026-04-05T00:00:00.000Z" },
    { id: 3, trusteeId: 1, mediaType: "short", playlistName: "Quick Tips", createdAt: "2026-04-10T00:00:00.000Z" },
    
    // Trustee 2 Playlists
    { id: 4, trusteeId: 2, mediaType: "video", playlistName: "Aqeedah Series", createdAt: "2026-04-02T00:00:00.000Z" },
    { id: 5, trusteeId: 2, mediaType: "audio", playlistName: "Tafseer Sessions", createdAt: "2026-04-06T00:00:00.000Z" },
    { id: 6, trusteeId: 2, mediaType: "short", playlistName: "Daily Reminders", createdAt: "2026-04-11T00:00:00.000Z" },
    
    // Trustee 3 Playlists
    { id: 7, trusteeId: 3, mediaType: "video", playlistName: "Tahfeez Methodology", createdAt: "2026-04-03T00:00:00.000Z" },
    { id: 8, trusteeId: 3, mediaType: "audio", playlistName: "Quranic Recitations", createdAt: "2026-04-07T00:00:00.000Z" },
    { id: 9, trusteeId: 3, mediaType: "short", playlistName: "Memorization Tips", createdAt: "2026-04-12T00:00:00.000Z" },
    
    // Trustee 4 Playlists
    { id: 10, trusteeId: 4, mediaType: "video", playlistName: "Educational Strategy", createdAt: "2026-04-04T00:00:00.000Z" },
    { id: 11, trusteeId: 4, mediaType: "audio", playlistName: "Scholarly Discussions", createdAt: "2026-04-08T00:00:00.000Z" },
    { id: 12, trusteeId: 4, mediaType: "short", playlistName: "Wisdom Nuggets", createdAt: "2026-04-13T00:00:00.000Z" },
    
    // Student Library Playlists (shared across trustees)
    { id: 13, trusteeId: null, mediaType: "student", playlistName: "Student Projects", createdAt: "2026-04-15T00:00:00.000Z" },
    { id: 14, trusteeId: null, mediaType: "student", playlistName: "Youth Creations", createdAt: "2026-04-16T00:00:00.000Z" },
  ]
}

const generateInitialMedia = () => {
  return [
    {
      id: 1,
      title: "Understanding Tajweed Rules",
      description: "A recorded lecture on tajweed principles designed for beginner and intermediate students.",
      mediaCategory: "Lectures & Talks",
      type: "video",
      staffId: 2,
      playlistId: 4,
      visibility: "public",
      url: "https://example.com/tajweed-lecture.mp4",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
      tags: ["tajweed", "lecture", "quran"],
      uploadedAt: "2026-04-12T09:00:00.000Z",
      downloads: 15,
      views: 120,
    },
    {
      id: 2,
      title: "Youth Leadership Workshop Highlights",
      description: "Short highlights from the youth development and leadership program's mentoring sessions.",
      mediaCategory: "Special Events",
      type: "video",
      staffId: 1,
      playlistId: 1,
      visibility: "public",
      url: "https://example.com/leadership-highlights.mp4",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      tags: ["leadership", "workshop", "youth"],
      uploadedAt: "2026-05-01T14:15:00.000Z",
      downloads: 24,
      views: 210,
    },
    {
      id: 3,
      title: "Recorded Tafseer Session",
      description: "Audio recording of a tafseer session focusing on family values in Islam.",
      mediaCategory: "Tafseer Sessions",
      type: "audio",
      staffId: 4,
      playlistId: 11,
      visibility: "private",
      url: "https://example.com/tafseer-session.mp3",
      thumbnail: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=800&auto=format&fit=crop",
      tags: ["tafseer", "audio", "family"],
      uploadedAt: "2026-04-20T11:20:00.000Z",
      downloads: 8,
      views: 65,
    },
    {
      id: 4,
      title: "Islamic Finance Principles",
      description: "Lecture on the fundamentals of Islamic banking and finance.",
      mediaCategory: "Lectures & Talks",
      type: "video",
      staffId: 4,
      playlistId: 10,
      visibility: "public",
      url: "https://example.com/finance-lecture.mp4",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
      tags: ["finance", "islamic", "banking"],
      uploadedAt: "2026-04-25T10:00:00.000Z",
      downloads: 32,
      views: 180,
    },
    {
      id: 5,
      title: "Quranic Recitation - Juz Amma",
      description: "Beautiful recitation of the 30th Juz by our senior Hafidh.",
      mediaCategory: "Quranic Recitations",
      type: "audio",
      staffId: 3,
      playlistId: 8,
      visibility: "public",
      url: "https://example.com/juz-amma.mp3",
      thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop",
      tags: ["quran", "recitation", "juz-amma"],
      uploadedAt: "2026-05-05T08:30:00.000Z",
      downloads: 45,
      views: 300,
    },
    {
      id: 6,
      title: "Student Success Story - Tahfeez Graduate",
      description: "Inspiring story of a student who completed memorization of the entire Quran.",
      mediaCategory: "Short Videos",
      type: "short",
      staffId: 1,
      playlistId: 3,
      visibility: "public",
      url: "https://example.com/success-story.mp4",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      tags: ["success", "tahfeez", "inspiration"],
      uploadedAt: "2026-05-10T15:45:00.000Z",
      downloads: 18,
      views: 95,
    },
    {
      id: 7,
      title: "Daily Adhkar Collection",
      description: "Collection of essential daily adhkar and their benefits.",
      mediaCategory: "Islamic Resources",
      type: "audio",
      staffId: 4,
      playlistId: 11,
      visibility: "public",
      url: "https://example.com/daily-adhkar.mp3",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      tags: ["adhkar", "daily", "remembrance"],
      uploadedAt: "2026-04-30T12:00:00.000Z",
      downloads: 67,
      views: 250,
    },
    {
      id: 8,
      title: "Ramadan Preparation Tips",
      description: "Short video with essential tips for Ramadan preparation and spiritual readiness.",
      mediaCategory: "Short Videos",
      type: "short",
      staffId: 2,
      playlistId: 6,
      visibility: "public",
      url: "https://example.com/ramadan-tips.mp4",
      thumbnail: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=800&auto=format&fit=crop",
      tags: ["ramadan", "preparation", "tips"],
      uploadedAt: "2026-05-08T11:20:00.000Z",
      downloads: 22,
      views: 140,
    },
    {
      id: 9,
      title: "Student Research Presentation",
      description: "Outstanding research presentation by our advanced students on Islamic history.",
      mediaCategory: "Student Research",
      type: "student",
      staffId: null,
      playlistId: 13,
      visibility: "public",
      url: "https://example.com/student-research.mp4",
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      tags: ["research", "student", "presentation"],
      uploadedAt: "2026-05-12T10:00:00.000Z",
      downloads: 12,
      views: 85,
    },
    {
      id: 10,
      title: "Youth Poetry Recitation",
      description: "Beautiful Arabic poetry recitation by our talented youth members.",
      mediaCategory: "Student Creations",
      type: "student",
      staffId: null,
      playlistId: 14,
      visibility: "public",
      url: "https://example.com/youth-poetry.mp3",
      thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
      tags: ["poetry", "youth", "arabic"],
      uploadedAt: "2026-05-14T14:30:00.000Z",
      downloads: 28,
      views: 156,
    },
  ]
}

export const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generateInitialMedia()))
  }

  const existingPlaylists = localStorage.getItem(PLAYLISTS_KEY)
  
  if (!existingPlaylists) {
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(generateInitialPlaylists()))
  }
}

export const getMediaItems = (filters = {}) => {
  initializeStorage()
  
  let items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  if (filters.category) {
    items = items.filter((item) => item.mediaCategory === filters.category)
  }
  
  if (filters.staffId) {
    items = items.filter((item) => item.staffId === filters.staffId)
  }
  
  if (filters.type) {
    items = items.filter((item) => item.type === filters.type)
  }
  
  if (filters.visibility) {
    items = items.filter((item) => item.visibility === filters.visibility)
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    )
  }
  
  return items
}

export const getMediaById = (id) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  return items.find((item) => item.id === Number(id))
}

export const getMediaByStaff = (staffId) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  return items.filter((item) => item.staffId === staffId)
}

export const getMediaCategories = () => {
  return [
    "Lectures & Talks",
    "Tafseer Sessions",
    "Hadith Classes",
    "Aqeedah Programs",
    "Seerah & History",
    "Questions & Answers",
    "Special Events",
    "Student Programs",
    "Quranic Recitations",
    "Islamic Resources",
    "Short Videos"
  ]
}

export const createMedia = (mediaData) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const newMedia = {
    ...mediaData,
    id: Date.now(),
    uploadedAt: new Date().toISOString(),
    downloads: 0,
    views: 0
  }
  
  const updated = [...items, newMedia]
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return newMedia
}

export const updateMedia = (id, data) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const updated = items.map((item) =>
    item.id === Number(id)
      ? { ...item, ...data, updatedAt: new Date().toISOString() }
      : item
  )
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

export const deleteMedia = (id) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const updated = items.filter((item) => item.id !== Number(id))
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

export const incrementViews = (id) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const updated = items.map((item) =>
    item.id === Number(id)
      ? { ...item, views: (item.views || 0) + 1 }
      : item
  )
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

export const incrementDownloads = (id) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  const updated = items.map((item) =>
    item.id === Number(id)
      ? { ...item, downloads: (item.downloads || 0) + 1 }
      : item
  )
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

// Playlist functions
export const getPlaylists = (filters = {}) => {
  initializeStorage()
  
  let playlists = JSON.parse(localStorage.getItem(PLAYLISTS_KEY))
  
  if (filters.trusteeId) {
    playlists = playlists.filter((playlist) => playlist.trusteeId === filters.trusteeId)
  }
  
  if (filters.mediaType) {
    playlists = playlists.filter((playlist) => playlist.mediaType === filters.mediaType)
  }
  
  return playlists
}

export const getPlaylistById = (id) => {
  const playlists = JSON.parse(localStorage.getItem(PLAYLISTS_KEY))
  
  return playlists.find((playlist) => playlist.id === Number(id))
}

export const getMediaByPlaylist = (playlistId) => {
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY))
  
  return items.filter((item) => item.playlistId === playlistId)
}

export const createPlaylist = (playlistData) => {
  const playlists = JSON.parse(localStorage.getItem(PLAYLISTS_KEY))
  
  const newPlaylist = {
    ...playlistData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }
  
  const updated = [...playlists, newPlaylist]
  
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(updated))
  
  return newPlaylist
}

export const updatePlaylist = (id, data) => {
  const playlists = JSON.parse(localStorage.getItem(PLAYLISTS_KEY))
  
  const updated = playlists.map((playlist) =>
    playlist.id === Number(id)
      ? { ...playlist, ...data }
      : playlist
  )
  
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(updated))
  
  return updated
}

export const deletePlaylist = (id) => {
  const playlists = JSON.parse(localStorage.getItem(PLAYLISTS_KEY))
  
  const updated = playlists.filter((playlist) => playlist.id !== Number(id))
  
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(updated))
  
  return updated
}