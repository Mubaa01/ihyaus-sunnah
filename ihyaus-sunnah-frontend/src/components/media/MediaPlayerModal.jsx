import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiShare2 } from 'react-icons/fi'
import { mediaAPI } from '../../services/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const MediaPlayerModal = ({ media, isOpen, onClose }) => {
  const [sourceUrl, setSourceUrl] = useState('')
  const [sourceError, setSourceError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    let isMounted = true

    const loadSource = async () => {
      if (!media || !isOpen) return

      setSourceError('')
      setSourceUrl(media.provider === 'telegram' ? '' : media.url)

      if (media.provider !== 'telegram') return

      try {
        const response = await mediaAPI.getTelegramUrl(media._id || media.id)
        if (isMounted) {
          setSourceUrl(response.data?.url || '')
        }
      } catch (error) {
        if (isMounted) {
          setSourceError(error.message)
        }
      }
    }

    loadSource()

    return () => {
      isMounted = false
    }
  }, [media, isOpen])

  if (!media) return null

  const isVideo = media.type === 'video' || media.type === 'short'
  const isAudio = media.type === 'audio'
  const isStudent = media.type === 'student'
  const isShort = media.type === 'short'
  const uploadedDate = media.createdAt || media.uploadedAt
  const mediaId = media._id || media.id
  const thumbnail = media.thumbnail || (
    media.telegramThumbnailFileId ? `${API_BASE_URL}/media/${mediaId}/telegram-thumbnail` : ''
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full max-h-[92vh] bg-white rounded-lg overflow-hidden shadow-2xl ${
              isShort ? 'max-w-4xl md:grid md:grid-cols-[minmax(280px,420px)_1fr]' : 'max-w-5xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`${isShort ? 'md:col-start-2 md:row-start-1' : ''} flex items-start justify-between gap-4 p-4 md:p-6 border-b border-gray-200`}>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 leading-tight">{media.title}</h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span className="uppercase tracking-[0.1em] px-2.5 py-1 bg-primary/10 text-primary rounded">
                    {isShort ? '9:16 short' : media.type}
                  </span>
                  {media.mediaCategory && <span>{media.mediaCategory}</span>}
                  {uploadedDate && <span>{new Date(uploadedDate).toLocaleDateString()}</span>}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded transition-colors shrink-0"
                aria-label="Close media player"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Media Player */}
            <div className={`relative bg-black ${isShort ? 'md:row-span-2 flex justify-center items-center min-h-[56vh] md:min-h-0' : ''}`}>
              {sourceError && (
                <div className="p-8 text-white">
                  {sourceError}
                </div>
              )}

              {!sourceError && !sourceUrl && (
                <div className={`${isShort ? 'aspect-[9/16] min-h-[56vh]' : 'aspect-video'} p-8 text-white flex items-center justify-center`}>
                  Loading media...
                </div>
              )}

              {!sourceError && sourceUrl && isVideo && (
                <video
                  controls
                  className={isShort ? 'w-full max-w-[420px] max-h-[92vh] aspect-[9/16] bg-black object-contain' : 'w-full aspect-video bg-black object-contain'}
                  poster={thumbnail}
                >
                  <source src={sourceUrl} type={media.telegramMimeType || 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
              )}

              {!sourceError && sourceUrl && isAudio && (
                <div className="p-8">
                  <div className="flex items-center gap-6">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={media.title}
                        className="w-32 h-32 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-xl bg-white/10 text-white flex items-center justify-center">
                        Audio
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{media.title}</h3>
                      <audio controls className="w-full">
                        <source src={sourceUrl} type={media.telegramMimeType || 'audio/mpeg'} />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              )}

              {!sourceError && sourceUrl && isStudent && (
                <video
                  controls
                  className="w-full aspect-video bg-black"
                  poster={thumbnail}
                >
                  <source src={sourceUrl} type={media.telegramMimeType || 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Content */}
            <div className={`${isShort ? 'md:col-start-2 md:row-start-2' : ''} p-4 md:p-6 overflow-y-auto max-h-[40vh] md:max-h-[58vh]`}>
              <div className={`grid gap-6 ${isShort ? 'grid-cols-1' : 'md:grid-cols-[1fr_300px]'}`}>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{media.description || 'No description provided.'}</p>

                  {media.tags && media.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {media.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="font-semibold">{media.views || 0}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Downloads</span>
                      <span className="font-semibold">{media.downloads || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Visibility</span>
                      <span className={`px-2 py-1 rounded-full text-xs uppercase tracking-[0.1em] ${
                        media.visibility === 'public'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {media.visibility}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded hover:bg-primary/90 transition-colors">
                      <FiDownload className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                      <FiShare2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MediaPlayerModal
