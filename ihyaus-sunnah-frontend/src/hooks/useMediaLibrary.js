import { useEffect, useMemo, useState } from 'react'
import {
  getMediaItems,
  getMediaCategories,
} from '../data/mock/mediaLibraryStore'
import {
  subscribeAdminDataUpdates,
} from '../utils/adminDataSync'

const useMediaLibrary = ({ category, type, visibility, search }) => {
  const [mediaItems, setMediaItems] = useState(() => getMediaItems({ category, type, visibility, search }))

  const categories = useMemo(() => getMediaCategories(), [])

  const refreshMediaItems = () => {
    setMediaItems(getMediaItems({ category, type, visibility, search }))
  }

  useEffect(() => {
    refreshMediaItems()
  }, [category, type, visibility, search])

  useEffect(() => {
    const cleanup = subscribeAdminDataUpdates(() => {
      refreshMediaItems()
    })

    return cleanup
  }, [category, type, visibility, search])

  return {
    mediaItems,
    categories,
  }
}

export default useMediaLibrary
