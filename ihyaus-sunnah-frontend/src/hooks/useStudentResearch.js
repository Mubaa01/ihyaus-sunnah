import { useEffect, useMemo, useState } from 'react'
import {
  getResearchItems,
  getResearchCategories,
  getResearchTypes,
  createResearch,
  updateResearch,
  deleteResearch,
} from '../data/mock/studentResearchStore'
import { logActivity } from '../data/mock/activityStore'
import {
  dispatchAdminDataUpdate,
  subscribeAdminDataUpdates,
} from '../utils/adminDataSync'
import {
  saveResearchPdf,
  deleteResearchPdf,
  saveResearchImage,
  deleteResearchImage,
} from '../utils/researchPdfStorage'

const useStudentResearch = ({ category = '', type = '', status = '', search = '' } = {}) => {
  const [researchItems, setResearchItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const categories = useMemo(() => getResearchCategories(), [])
  const types = useMemo(() => getResearchTypes(), [])

  const refreshResearch = () => {
    try {
      const items = getResearchItems({ category, type, status, search })
      console.log('Refreshing research items:', items.length)
      setResearchItems(items)
    } catch (err) {
      console.error('Failed to load research items:', err)
      setError(err?.message || 'Unable to load research items')
      setResearchItems([])
    }
  }

  useEffect(() => {
    setLoading(true)
    refreshResearch()
    setLoading(false)

    const cleanup = subscribeAdminDataUpdates((payload) => {
      console.log('Research update received:', payload)
      refreshResearch()
    })

    return cleanup
  }, [category, type, status, search])

  const addResearch = async (researchData) => {
    const file = researchData.pdfFile
    const imageFile = researchData.imageFile
    const payload = { ...researchData }
    delete payload.pdfFile
    delete payload.imageFile

    if (payload.pdfUrl?.startsWith('data:')) {
      delete payload.pdfUrl
    }
    if (payload.imageUrl?.startsWith('data:')) {
      delete payload.imageUrl
    }

    const newResearch = createResearch(payload)
    if (file) {
      await saveResearchPdf(newResearch.id, file)
      updateResearch(newResearch.id, { pdfKey: newResearch.id })
    }
    if (imageFile) {
      await saveResearchImage(newResearch.id, imageFile)
      updateResearch(newResearch.id, { imageKey: newResearch.id })
    }

    logActivity({
      type: 'research',
      action: 'Added research',
      details: `${researchData.title || 'Research item'} was created`,
      reference: newResearch.id,
    })
    refreshResearch()
    console.log('Dispatching research update after add')
    dispatchAdminDataUpdate({ research: true })
    return newResearch
  }

  const editResearch = async (id, data) => {
    const file = data.pdfFile
    const imageFile = data.imageFile
    const payload = { ...data }
    delete payload.pdfFile
    delete payload.imageFile

    if (payload.pdfUrl?.startsWith('data:')) {
      delete payload.pdfUrl
    }
    if (payload.imageUrl?.startsWith('data:')) {
      delete payload.imageUrl
    }

    const updated = updateResearch(id, payload)

    if (file) {
      await saveResearchPdf(id, file)
      updateResearch(id, { pdfKey: id })
    }
    if (imageFile) {
      await saveResearchImage(id, imageFile)
      updateResearch(id, { imageKey: id })
    }

    logActivity({
      type: 'research',
      action: 'Updated research',
      details: `${data.title || 'Research item'} was updated`,
      reference: id,
    })
    refreshResearch()
    console.log('Dispatching research update after edit')
    dispatchAdminDataUpdate({ research: true })
    return updated
  }

  const removeResearch = (id) => {
    const items = getResearchItems()
    const current = items.find((item) => item.id === Number(id))
    if (current?.pdfKey) {
      deleteResearchPdf(current.pdfKey)
    }
    if (current?.imageKey) {
      deleteResearchImage(current.imageKey)
    }
    deleteResearch(id)
    logActivity({
      type: 'research',
      action: 'Removed research',
      details: `${current?.title || 'Research item'} was deleted`,
      reference: id,
    })
    refreshResearch()
    console.log('Dispatching research update after remove')
    dispatchAdminDataUpdate({ research: true })
  }

  return {
    researchItems,
    categories,
    types,
    loading,
    error,
    addResearch,
    editResearch,
    removeResearch,
  }
}

export default useStudentResearch
