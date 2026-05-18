import { useState } from 'react'
import { motion } from 'framer-motion'
import useMediaLibraryAPI from '../../hooks/useMediaLibraryAPI'
import useStaffAPI from '../../hooks/useStaffAPI'
// Removed mock data imports
import MediaPlayerModal from '../../components/media/MediaPlayerModal'
import { FiSearch, FiVideo, FiMusic, FiPlay, FiUsers } from 'react-icons/fi'

const MediaLibraryPage = () => {
  const [activeTab, setActiveTab] = useState('video')
  const [selectedTrustee, setSelectedTrustee] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    visibility: '',
    search: '',
  })

  const { mediaItems, categories } = useMediaLibraryAPI(filters)
  const { groupedStaff } = useStaffAPI()
  const boardMembers = groupedStaff.board || []

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const tabs = [
    { id: 'video', label: 'Video Library', icon: FiVideo },
    { id: 'audio', label: 'Audio Library', icon: FiMusic },
    { id: 'short', label: 'Short Videos', icon: FiPlay },
    { id: 'student', label: 'Student Library', icon: FiUsers },
  ]

  const getFilteredItems = () => {
    let items = []
    if (activeTab === 'video') {
      items = mediaItems.filter(item => item.type === 'video')
    } else if (activeTab === 'audio') {
      items = mediaItems.filter(item => item.type === 'audio')
    } else if (activeTab === 'short') {
      items = mediaItems.filter(item => item.type === 'short')
    } else if (activeTab === 'student') {
      items = mediaItems.filter(item => item.type === 'student')
    }
    return items
  }

  const filteredItems = getFilteredItems()

  // TODO: Replace with real API calls for playlists and media
  const getTrusteePlaylists = (trusteeId) => [];
  const getPlaylistMedia = (playlistId) => [];

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
            alt="Board of Trustees"
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
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Board of Trustees <br /> Media Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed"
          >
            Explore curated lectures, talks, and scholarly recordings from our esteemed Board of Trustees. Access video teachings, audio sessions, short inspirational content, and student creations organized by our distinguished scholars and educators.
          </motion.p>
        </div>
      </section>

      <section className="section-padding py-20 bg-white">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSelectedTrustee(null)
                  setSelectedMedia(null)
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-semibold transition-colors ${
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
            {/* Student Library - General Grid */}
            {activeTab === 'student' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream rounded-3xl border border-gray-100 p-8 shadow-soft"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Student Creations</h2>
                  <span className="text-sm text-gray-500">{filteredItems.length} items</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((media) => (
                    <motion.div
                      key={media.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => setSelectedMedia(media)}
                    >
                      <div className="aspect-video relative">
                        <img
                          src={media.thumbnail}
                          alt={media.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-3">
                            <FiUsers className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full uppercase">
                            {media.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-primary mb-2 line-clamp-2">{media.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{media.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : activeTab === 'short' ? (
              /* Short Videos - General Grid */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream rounded-3xl border border-gray-100 p-8 shadow-soft"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Short Videos</h2>
                  <span className="text-sm text-gray-500">{filteredItems.length} items</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((media) => (
                    <motion.div
                      key={media.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={() => setSelectedMedia(media)}
                    >
                      <div className="aspect-video relative">
                        <img
                          src={media.thumbnail}
                          alt={media.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-3">
                            <FiPlay className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full uppercase">
                            {media.type}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-primary mb-2 line-clamp-2">{media.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{media.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <>
                {/* Trustee Cards for Video and Audio Libraries */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  {boardMembers.map((trustee) => {
                    const trusteePlaylists = getTrusteePlaylists(trustee.id)
                    const totalItems = trusteePlaylists.reduce((sum, playlist) => 
                      sum + getPlaylistMedia(playlist.id).length, 0
                    )
                    
                    return (
                      <motion.div
                        key={trustee.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className={`bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft cursor-pointer hover:shadow-xl transition-shadow ${totalItems === 0 ? 'opacity-50' : ''}`}
                        onClick={() => totalItems > 0 && setSelectedTrustee(trustee)}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={trustee.image}
                            alt={trustee.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-lg mb-1">{trustee.name}</h3>
                            <p className="text-white/80 text-sm">{trustee.position}</p>
                            <p className="text-white/60 text-xs mt-2">{totalItems} items</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Selected Trustee Content */}
                {selectedTrustee && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cream rounded-3xl border border-gray-100 p-8 shadow-soft"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedTrustee.image}
                          alt={selectedTrustee.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-2xl font-bold text-primary">{selectedTrustee.name}</h2>
                          <p className="text-gray-600">{selectedTrustee.position}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedTrustee(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Playlists */}
                    <div className="space-y-6">
                      {getTrusteePlaylists(selectedTrustee.id).map((playlist) => {
                        const playlistMedia = getPlaylistMedia(playlist.id)
                        return (
                          <div key={playlist.id} className="border border-gray-200 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-bold text-primary">{playlist.playlistName}</h3>
                              <span className="text-sm text-gray-500">{playlistMedia.length} items</span>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {playlistMedia.map((media) => (
                                <motion.div
                                  key={media.id}
                                  whileHover={{ scale: 1.02 }}
                                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-soft cursor-pointer hover:shadow-xl transition-shadow"
                                  onClick={() => setSelectedMedia(media)}
                                >
                                  <div className="aspect-video relative">
                                    <img
                                      src={media.thumbnail}
                                      alt={media.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <div className="bg-white/90 rounded-full p-3">
                                        {activeTab === 'video' ? (
                                          <FiVideo className="w-6 h-6 text-primary" />
                                        ) : (
                                          <FiMusic className="w-6 h-6 text-primary" />
                                        )}
                                      </div>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full uppercase">
                                        {media.type}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="p-4">
                                    <h4 className="font-semibold text-primary mb-2 line-clamp-2">{media.title}</h4>
                                    <p className="text-sm text-gray-600 line-clamp-2">{media.description}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Media Player Modal */}
      <MediaPlayerModal
        media={selectedMedia}
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  )
}

export default MediaLibraryPage