import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiVideo, FiMusic, FiPlay, FiUsers, FiFolder, FiArrowLeft } from 'react-icons/fi'

import MediaPlayerModal from '../../components/media/MediaPlayerModal'
import useMediaLibraryAPI from '../../hooks/useMediaLibraryAPI'
import useStaffAPI from '../../hooks/useStaffAPI'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const MediaLibraryPage = () => {
  const [activeTab, setActiveTab] = useState('video')
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null)

  const { mediaItems, playlists } = useMediaLibraryAPI({ visibility: 'public' })
  const { groupedStaff } = useStaffAPI()
  const seniorStaff = groupedStaff.senior || []

  const tabs = [
    { id: 'video', label: 'Senior Staff Videos', icon: FiVideo },
    { id: 'audio', label: 'Senior Staff Audio', icon: FiMusic },
    { id: 'short', label: 'Short Videos', icon: FiPlay },
    { id: 'student', label: 'Student Library', icon: FiUsers },
  ]

  const getId = (item) => item?._id || item?.id || ''

  const normalizeId = (value) => {
    if (!value) return ''
    if (typeof value === 'object') return value._id || value.id || ''
    return value
  }

  const getMediaThumbnail = (media) => {
    if (media.thumbnail) return media.thumbnail
    if (media.telegramThumbnailFileId) {
      return `${API_BASE_URL}/media/${getId(media)}/telegram-thumbnail`
    }
    return ''
  }

  const renderMediaThumbnail = (media, icon) => {
    const thumbnail = getMediaThumbnail(media)

    if (thumbnail) {
      return (
        <img
          src={thumbnail}
          alt={media.title}
          className="w-full h-full object-cover"
        />
      )
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-primary">
        {icon}
      </div>
    )
  }

  const visibleMedia = mediaItems.filter((item) => item.visibility !== 'private')
  const activeMedia = visibleMedia.filter((item) => item.type === activeTab)

  const getStaffPlaylists = (staffId) => playlists.filter((playlist) => (
    playlist.mediaType === activeTab &&
    normalizeId(playlist.trusteeId) === staffId
  ))

  const getPlaylistMedia = (playlistId) => activeMedia.filter((media) => (
    normalizeId(media.playlistId) === playlistId
  ))

  const seniorPlaylistIds = new Set(
    seniorStaff.flatMap((staffMember) =>
      getStaffPlaylists(getId(staffMember)).map((playlist) => getId(playlist))
    )
  )

  const generalItems = activeMedia.filter((media) => (
    !normalizeId(media.staffId) ||
    !seniorPlaylistIds.has(normalizeId(media.playlistId))
  ))

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSelectedStaff(null)
    setSelectedPlaylist(null)
    setSelectedMedia(null)
  }

  const isShortMedia = (media) => media.type === 'short'

  const renderMediaCard = (media, icon) => (
    <motion.div
      key={getId(media)}
      whileHover={{ y: -4 }}
      className={`group bg-white border border-gray-100 overflow-hidden shadow-soft cursor-pointer hover:shadow-xl transition-all duration-300 rounded-lg ${
        isShortMedia(media) ? 'max-w-[270px] w-full mx-auto' : ''
      }`}
      onClick={() => setSelectedMedia(media)}
    >
      <div className={`${isShortMedia(media) ? 'aspect-[9/16]' : 'aspect-video'} relative bg-gray-100 overflow-hidden`}>
        {renderMediaThumbnail(media, icon)}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/35 transition-colors">
          <div className="bg-white/95 rounded-full p-3 shadow-lg scale-95 group-hover:scale-100 transition-transform">
            {icon}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white text-[11px] px-2 py-1 rounded uppercase shadow backdrop-blur">
            {isShortMedia(media) ? '9:16 short' : media.type}
          </span>
        </div>
      </div>
      <div className={`${isShortMedia(media) ? 'p-3' : 'p-4'}`}>
        <h4 className="font-semibold text-primary mb-2 line-clamp-2">{media.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{media.description}</p>
      </div>
    </motion.div>
  )

  const renderOpenLibrary = (title, icon) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cream/70 border border-gray-100 p-5 md:p-8 shadow-soft rounded-lg"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Media Collection</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
        </div>
        <span className="text-sm text-gray-500">{activeMedia.length} items</span>
      </div>
      {activeMedia.length > 0 ? (
        <div className={`${activeTab === 'short' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 items-start' : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
          {activeMedia.map((media) => renderMediaCard(media, icon))}
        </div>
      ) : (
        <div className="border border-dashed border-primary/20 bg-white/80 p-8 text-center rounded-lg">
          <p className="font-semibold text-primary">No media available yet.</p>
          <p className="text-sm text-gray-600 mt-1">New uploads will appear here automatically.</p>
        </div>
      )}
    </motion.div>
  )

  const renderStaffCollections = () => (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {seniorStaff.map((staffMember) => {
          const staffId = getId(staffMember)
          const staffPlaylists = getStaffPlaylists(staffId)
          const totalItems = staffPlaylists.reduce((sum, playlist) => (
            sum + getPlaylistMedia(getId(playlist)).length
          ), 0)

          return (
            <motion.div
              key={staffId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-lg border border-gray-100 overflow-hidden shadow-soft cursor-pointer hover:shadow-xl transition-shadow ${totalItems === 0 ? 'opacity-50' : ''}`}
              onClick={() => {
                if (totalItems <= 0) return
                setSelectedStaff(staffMember)
                setSelectedPlaylist(null)
              }}
            >
              <div className="aspect-square relative bg-gray-100">
                {staffMember.image ? (
                  <img
                    src={staffMember.image}
                    alt={staffMember.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary">
                    <FiUsers className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/95 text-primary text-xs font-semibold px-2.5 py-1 rounded shadow">
                  {totalItems} items
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white drop-shadow font-bold text-lg mb-1">{staffMember.name}</h3>
                  <p className="text-white/90 drop-shadow text-sm">{staffMember.position}</p>
                  <p className="text-white/80 drop-shadow text-xs mt-2">
                    {staffPlaylists.length} folders | {totalItems} items
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {generalItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cream/70 rounded-lg border border-gray-100 p-5 md:p-8 shadow-soft mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">
              Unassigned {activeTab === 'video' ? 'Videos' : 'Audio'}
            </h2>
            <span className="text-sm text-gray-500">{generalItems.length} items</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalItems.map((media) => renderMediaCard(
              media,
              activeTab === 'video' ? <FiVideo className="w-6 h-6 text-primary" /> : <FiMusic className="w-6 h-6 text-primary" />
            ))}
          </div>
        </motion.div>
      )}

      {selectedStaff && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cream/70 rounded-lg border border-gray-100 p-5 md:p-8 shadow-soft"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center gap-4 min-w-0">
              {selectedStaff.image ? (
                <img
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  className="w-16 h-16 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiUsers className="w-7 h-7" />
                </div>
              )}
              <div className="min-w-0">
                <h2 className="text-2xl font-bold text-primary">{selectedStaff.name}</h2>
                <p className="text-gray-600">{selectedStaff.position}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStaff(null)
                setSelectedPlaylist(null)
              }}
              className="inline-flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 bg-white text-gray-600 hover:text-primary hover:border-primary/30 rounded transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {getStaffPlaylists(getId(selectedStaff)).map((playlist) => {
              const playlistId = getId(playlist)
              const playlistMedia = getPlaylistMedia(playlistId)

              return (
                <button
                  key={playlistId}
                  type="button"
                  onClick={() => setSelectedPlaylist(playlist)}
                  className={`text-left bg-white border rounded-lg p-5 shadow-soft hover:shadow-xl transition ${
                    getId(selectedPlaylist) === playlistId ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded bg-primary/10 text-primary flex items-center justify-center">
                      <FiFolder className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-gray-500">{playlistMedia.length} items</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary line-clamp-2">{playlist.playlistName}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {activeTab === 'video' ? 'Video folder' : 'Audio folder'}
                  </p>
                </button>
              )
            })}
          </div>

          {selectedPlaylist && (
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-primary">{selectedPlaylist.playlistName}</h3>
                <span className="text-sm text-gray-500">
                  {getPlaylistMedia(getId(selectedPlaylist)).length} items
                </span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {getPlaylistMedia(getId(selectedPlaylist)).map((media) => renderMediaCard(
                  media,
                  activeTab === 'video' ? <FiVideo className="w-6 h-6 text-primary" /> : <FiMusic className="w-6 h-6 text-primary" />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  )

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-[86vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
            alt="Senior staff media library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-primary/70" />
        </div>

        <div className="container-custom relative z-10 py-32 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block uppercase tracking-[0.3em] text-goldSoft font-semibold mb-6"
          >
            Media Library
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            Senior Staff <br /> Media Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed"
          >
            Browse senior staff video and audio collections organized into folders such as Tafseer, Seerah, reminders, and lectures. Short videos and student media remain open for quick access.
          </motion.p>
        </div>
      </section>

      <section className="section-padding py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-t font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-16">
            {activeTab === 'student' ? (
              renderOpenLibrary('Student Library', <FiUsers className="w-6 h-6 text-primary" />)
            ) : activeTab === 'short' ? (
              renderOpenLibrary('Short Videos', <FiPlay className="w-6 h-6 text-primary" />)
            ) : (
              renderStaffCollections()
            )}
          </div>
        </div>
      </section>

      <MediaPlayerModal
        media={selectedMedia}
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  )
}

export default MediaLibraryPage
