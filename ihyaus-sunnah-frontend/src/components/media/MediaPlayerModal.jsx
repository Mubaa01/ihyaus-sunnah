import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiDownload, FiShare2, FiPlay, FiPause } from 'react-icons/fi'

const MediaPlayerModal = ({ media, isOpen, onClose }) => {
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

  if (!media) return null

  const isVideo = media.type === 'video' || media.type === 'short'
  const isAudio = media.type === 'audio'
  const isStudent = media.type === 'student'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary mb-2">{media.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="uppercase tracking-[0.1em] px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {media.type}
                  </span>
                  <span>{media.mediaCategory}</span>
                  <span>Uploaded {new Date(media.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Media Player */}
            <div className="relative bg-black">
              {isVideo && (
                <video
                  controls
                  className="w-full aspect-video"
                  poster={media.thumbnail}
                >
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {isAudio && (
                <div className="p-8">
                  <div className="flex items-center gap-6">
                    <img
                      src={media.thumbnail}
                      alt={media.title}
                      className="w-32 h-32 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{media.title}</h3>
                      <audio controls className="w-full">
                        <source src={media.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              )}

              {isStudent && (
                <video
                  controls
                  className="w-full aspect-video"
                  poster={media.thumbnail}
                >
                  <source src={media.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-[1fr_300px] gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{media.description}</p>

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
                  <div className="bg-gray-50 rounded-2xl p-4">
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
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors">
                      <FiDownload className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors">
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