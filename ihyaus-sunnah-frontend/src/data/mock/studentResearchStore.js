// src/data/store/studentResearchStore.js

const STORAGE_KEY = "ihya_student_research_data"

const generateInitialResearch = () => {
  return [
    {
      id: 1,
      title: "Tajweed Mastery in Young Learners",
      author: "Aisha Bello",
      researchCategory: "Arabic Language & Literature",
      researchType: "Graduation Thesis",
      programId: 2,
      status: "published",
      summary: "A study on how tajweed training enhances Qur'anic fluency and memorization confidence in weekend Islamiyyah classes.",
      submittedAt: "2026-04-18T10:30:00.000Z",
      updatedAt: "2026-04-18T10:30:00.000Z",
      pdfUrl: "https://example.com/research/tajweed-mastery.pdf",
      pdfFileName: "tajweed-mastery.pdf",
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
      imageKey: "",
      tags: ["tajweed", "memorization", "children"],
    },
    {
      id: 2,
      title: "Hadith Interpretation for Modern Youth",
      author: "Umar Musa",
      researchCategory: "Hadith Sciences",
      researchType: "Subject Research Paper",
      programId: 3,
      status: "published",
      summary: "This research explores contemporary methods for teaching selected hadith texts to youth leadership participants.",
      submittedAt: "2026-03-10T08:15:00.000Z",
      updatedAt: "2026-03-12T14:20:00.000Z",
      pdfUrl: "https://example.com/research/hadith-interpretation.pdf",
      pdfFileName: "hadith-interpretation.pdf",
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583f20270319?q=80&w=600&auto=format&fit=crop",
      imageKey: "",
      tags: ["hadith", "education", "youth"],
    },
    {
      id: 3,
      title: "Community Service and Islamic Character",
      author: "Safiyya Umar",
      researchCategory: "Education Methodology",
      researchType: "Group Project",
      programId: 3,
      status: "draft",
      summary: "An analytical report on how community service activities strengthen Islamic character among program participants.",
      submittedAt: "2026-05-02T13:45:00.000Z",
      updatedAt: "2026-05-04T09:00:00.000Z",
      pdfUrl: "",
      pdfFileName: "",
      imageUrl: "",
      imageKey: "",
      tags: ["service", "character", "community"],
    },
  ]
}

export const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generateInitialResearch()))
  }
}

export const getResearchItems = (filters = {}) => {
  initializeStorage()
  
  let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  
  if (filters.category) {
    items = items.filter((item) => item.researchCategory === filters.category)
  }
  
  if (filters.type) {
    items = items.filter((item) => item.researchType === filters.type)
  }
  
  if (filters.programId) {
    items = items.filter((item) => item.programId === filters.programId)
  }
  
  if (filters.status) {
    items = items.filter((item) => item.status === filters.status)
  }
  
  if (filters.search) {
    const normalizedSearch = filters.search.toLowerCase()
    items = items.filter((item) => {
      return (
        item.title?.toLowerCase().includes(normalizedSearch) ||
        item.author?.toLowerCase().includes(normalizedSearch) ||
        item.summary?.toLowerCase().includes(normalizedSearch) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch))
      )
    })
  }
  
  return items
}

export const getResearchById = (id) => {
  initializeStorage()
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  
  return items.find((item) => item.id === Number(id))
}

export const getResearchCategories = () => {
  return [
    "Aqeedah Studies",
    "Fiqh & Legal Theory",
    "Hadith Sciences",
    "Tafseer & Quranic Studies",
    "Arabic Language & Literature",
    "Islamic History",
    "Contemporary Issues",
    "Education Methodology"
  ]
}

export const getResearchTypes = () => {
  return [
    "Graduation Thesis",
    "Subject Research Paper",
    "Group Project",
    "Competition Entry"
  ]
}

export const createResearch = (researchData) => {
  initializeStorage()
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  
  const safeData = { ...researchData }
  delete safeData.pdfFile
  if (safeData.pdfUrl?.startsWith("data:")) {
    delete safeData.pdfUrl
  }

  const newResearch = {
    ...safeData,
    id: Date.now(),
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: safeData.status || "published",
  }
  
  const updated = [...items, newResearch]
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return newResearch
}

export const updateResearch = (id, data) => {
  initializeStorage()
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  
  const safeData = { ...data }
  delete safeData.pdfFile
  if (safeData.pdfUrl?.startsWith("data:")) {
    delete safeData.pdfUrl
  }

  const updated = items.map((item) =>
    item.id === Number(id)
      ? { ...item, ...safeData, updatedAt: new Date().toISOString() }
      : item
  )
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}

export const deleteResearch = (id) => {
  initializeStorage()
  const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  
  const updated = items.filter((item) => item.id !== Number(id))
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  return updated
}