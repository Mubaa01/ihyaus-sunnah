import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMusic, FiPlay, FiUsers, FiFolder, FiArrowLeft, FiExternalLink, FiHeadphones, FiDownload } from 'react-icons/fi'

import MediaPlayerModal from '../../components/media/MediaPlayerModal'
import useMediaLibraryAPI from '../../hooks/useMediaLibraryAPI'
import useStaffAPI from '../../hooks/useStaffAPI'
import QuranVersePanel from '../../components/common/QuranVersePanel'
import { mediaAPI } from '../../services/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const mediaVerse = {
  arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ',
  translation:
    'Invite to the way of your Lord with wisdom and beautiful instruction.',
  reference: 'Surah An-Nahl 16:125',
}

const AudioListItem = ({ media, onPlay, getThumbnail, getId }) => {
  const [sourceUrl, setSourceUrl] = useState(media.provider === 'telegram' ? '' : media.url || '')
  const [sourceError, setSourceError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadSource = async () => {
      setSourceError('')

      if (media.provider !== 'telegram') {
        setSourceUrl(media.url || '')
        return
      }

      setSourceUrl('')

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
  }, [media])

  const thumbnail = getThumbnail(media)
  const uploadedDate = media.createdAt || media.uploadedAt

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-soft transition-shadow hover:shadow-lg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={media.title}
              className="h-16 w-16 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FiMusic className="h-7 w-7" />
            </div>
          )}

          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
              <FiHeadphones className="h-3.5 w-3.5" />
              Audio
              {uploadedDate && (
                <span className="normal-case tracking-normal text-gray-400">
                  {new Date(uploadedDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <h4 className="line-clamp-2 text-lg font-bold text-primary">{media.title}</h4>
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{media.description || 'No description provided.'}</p>
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:max-w-xl">
          {sourceError ? (
            <div className="rounded border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {sourceError}
            </div>
          ) : sourceUrl ? (
            <audio controls preload="none" className="w-full">
              <source src={sourceUrl} type={media.telegramMimeType || 'audio/mpeg'} />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div className="rounded border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-500">
              Loading audio...
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onPlay(media)}
            className="inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            <FiPlay className="h-4 w-4" />
            Play
          </button>
          <a
            href={sourceUrl || undefined}
            download={media.telegramFileName || `${media.title || getId(media)}.mp3`}
            className={`inline-flex items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-semibold transition-colors ${
              sourceUrl
                ? 'border-primary/20 text-primary hover:bg-primary/5'
                : 'pointer-events-none border-gray-200 text-gray-400'
            }`}
          >
            <FiDownload className="h-4 w-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  )
}

const MediaLibraryPage = () => {
  const { trusteeId } = useParams()
  const [activeTab, setActiveTab] = useState('audio')
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null)

  const { mediaItems, playlists } = useMediaLibraryAPI({ visibility: 'public' })
  const { groupedStaff } = useStaffAPI()
  const trustees = [
    ...(groupedStaff.directors || []),
    ...(groupedStaff.board || []),
    ...(groupedStaff.senior || []),
  ].filter((member, index, members) => {
    const memberId = member?._id || member?.id
    return memberId && members.findIndex((item) => (item?._id || item?.id) === memberId) === index
  })

  const tabs = [
    { id: 'audio', label: 'Trustee Audio', icon: FiHeadphones },
    { id: 'short', label: 'Short Videos', icon: FiPlay },
  ]

  const getId = (item) => item?._id || item?.id || ''
  const selectedTrustee = trustees.find((staffMember) => getId(staffMember) === trusteeId)

  useEffect(() => {
    if (!trusteeId) return
    setActiveTab('audio')
    setSelectedPlaylist(null)
    setSelectedMedia(null)
  }, [trusteeId])

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

  const getPlaylistCover = (playlist, staffMember) => {
    const firstMediaWithThumbnail = getPlaylistMedia(getId(playlist)).find((media) => getMediaThumbnail(media))
    return getMediaThumbnail(firstMediaWithThumbnail || {}) || staffMember?.image || ''
  }

  const trusteePlaylistIds = new Set(
    trustees.flatMap((staffMember) =>
      getStaffPlaylists(getId(staffMember)).map((playlist) => getId(playlist))
    )
  )

  const generalItems = activeMedia.filter((media) => (
    !normalizeId(media.staffId) ||
    !trusteePlaylistIds.has(normalizeId(media.playlistId))
  ))

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSelectedPlaylist(null)
    setSelectedMedia(null)
  }

  const isShortMedia = (media) => media.type === 'short'
  const isAudio = activeTab === 'audio'

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
        <div className={`${isAudio ? 'bg-primary/10' : 'bg-black/20 group-hover:bg-black/35'} absolute inset-0 flex items-center justify-center transition-colors`}>
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

  const renderShortLibrary = (title, icon) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-gray-100 bg-white p-5 shadow-soft md:p-8"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Media Collection</p>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
        </div>
        <span className="text-sm text-gray-500">{activeMedia.length} items</span>
      </div>
      {activeMedia.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 items-start">
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

  const renderAudioList = (audios) => (
    <div className="space-y-4">
      {audios.map((media) => (
        <AudioListItem
          key={getId(media)}
          media={media}
          onPlay={setSelectedMedia}
          getThumbnail={getMediaThumbnail}
          getId={getId}
        />
      ))}
    </div>
  )

  const renderAudioCollections = () => (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Trustee Audio Folders</p>
          <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">Listen by trustee</h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            Each trustee has a dedicated audio folder. Open a folder to browse lectures, reminders, and ongoing series.
          </p>
        </div>
        <div className="rounded bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
          {trustees.length} trustees | {activeMedia.length} audio items
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {trustees.map((staffMember) => {
          const staffId = getId(staffMember)
          const staffPlaylists = getStaffPlaylists(staffId)
          const totalItems = staffPlaylists.reduce((sum, playlist) => (
            sum + getPlaylistMedia(getId(playlist)).length
          ), 0)
          const featuredPlaylist = staffPlaylists[0]
          const coverImage = featuredPlaylist ? getPlaylistCover(featuredPlaylist, staffMember) : staffMember.image

          return (
            <motion.div
              key={staffId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-lg border border-gray-100 bg-white shadow-soft transition-shadow hover:shadow-xl"
            >
              <Link to={`/media-library/audio/${staffId}`} className="block w-full text-left">
                <div className="flex gap-4 p-5">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={featuredPlaylist?.playlistName || staffMember.name}
                      className="h-24 w-24 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FiUsers className="h-8 w-8" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 inline-flex items-center gap-2 rounded bg-gold/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                      <FiFolder className="h-3.5 w-3.5" />
                      Audio folder
                    </div>
                    <h3 className="line-clamp-2 text-xl font-bold text-primary">{staffMember.name}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-600">{staffMember.position}</p>
                    {featuredPlaylist && (
                      <p className="mt-2 line-clamp-1 text-sm font-semibold text-primary/80">
                        {featuredPlaylist.playlistName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 px-5 py-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-gray-50 px-3 py-2">
                      <p className="font-bold text-primary">{staffPlaylists.length}</p>
                      <p className="text-gray-500">Playlists</p>
                    </div>
                    <div className="rounded bg-gray-50 px-3 py-2">
                      <p className="font-bold text-primary">{totalItems}</p>
                      <p className="text-gray-500">Audios</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 text-sm font-semibold text-primary">
                  <span>Open folder</span>
                  <FiArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
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
              General Audio
            </h2>
            <span className="text-sm text-gray-500">{generalItems.length} items</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-3">
              {renderAudioList(generalItems)}
            </div>
          </div>
        </motion.div>
      )}
    </>
  )

  const renderTrusteeAudioPage = () => {
    if (!selectedTrustee) {
      return (
        <div className="rounded-lg border border-dashed border-primary/20 bg-white p-8 text-center shadow-soft">
          <p className="font-semibold text-primary">Trustee folder not found.</p>
          <Link to="/media-library" className="mt-4 inline-flex items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-white">
            <FiArrowLeft className="w-4 h-4" />
            Back to media library
          </Link>
        </div>
      )
    }

    const trusteePlaylists = getStaffPlaylists(getId(selectedTrustee))
    const playlistIds = new Set(trusteePlaylists.map((playlist) => getId(playlist)))
    const trusteeAudios = activeMedia.filter((media) => (
      normalizeId(media.staffId) === getId(selectedTrustee) ||
      playlistIds.has(normalizeId(media.playlistId))
    ))
    const displayedAudios = selectedPlaylist
      ? getPlaylistMedia(getId(selectedPlaylist))
      : trusteeAudios

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="rounded-lg border border-gray-100 bg-cream/70 p-5 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 min-w-0">
              {selectedTrustee.image ? (
                <img
                  src={selectedTrustee.image}
                  alt={selectedTrustee.name}
                  className="h-20 w-20 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiUsers className="w-8 h-8" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Trustee Audio Folder</p>
                <h2 className="mt-1 text-3xl font-bold text-primary">{selectedTrustee.name}</h2>
                <p className="mt-1 text-gray-600">{selectedTrustee.position}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                to="/media-library"
                className="inline-flex items-center justify-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-gray-700 transition-colors hover:border-primary/30 hover:text-primary"
              >
                <FiArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <Link
                to={`/staff/profile/${getId(selectedTrustee)}`}
                className="inline-flex items-center justify-center gap-2 rounded border border-primary/20 bg-white px-3 py-2 text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                View profile
                <FiExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-soft md:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Playlists</p>
              <h3 className="mt-1 text-2xl font-bold text-primary">Audio series</h3>
            </div>
            <span className="text-sm text-gray-500">{trusteePlaylists.length} playlists</span>
          </div>

          {trusteePlaylists.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <button
                type="button"
                onClick={() => setSelectedPlaylist(null)}
                className={`text-left rounded-lg border p-5 shadow-soft transition hover:shadow-xl ${
                  !selectedPlaylist ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
                }`}
              >
                <div className="mb-4 flex h-24 w-full items-center justify-center overflow-hidden rounded bg-primary/10 text-primary">
                  {selectedTrustee.image ? (
                    <img
                      src={selectedTrustee.image}
                      alt={selectedTrustee.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiHeadphones className="w-8 h-8" />
                  )}
                </div>
                <h4 className="text-xl font-bold text-primary">All audios</h4>
                <p className="mt-2 text-sm text-gray-500">{trusteeAudios.length} items</p>
              </button>

              {trusteePlaylists.map((playlist) => {
                const playlistId = getId(playlist)
                const playlistMedia = getPlaylistMedia(playlistId)
                const playlistCover = getPlaylistCover(playlist, selectedTrustee)

                return (
                  <button
                    key={playlistId}
                    type="button"
                    onClick={() => setSelectedPlaylist(playlist)}
                    className={`text-left rounded-lg border p-5 shadow-soft transition hover:shadow-xl ${
                      getId(selectedPlaylist) === playlistId ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
                    }`}
                  >
                    <div className="mb-4 overflow-hidden rounded bg-primary/10">
                      {playlistCover ? (
                        <img
                          src={playlistCover}
                          alt={playlist.playlistName}
                          className="h-28 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-28 w-full items-center justify-center text-primary">
                          <FiFolder className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="line-clamp-2 text-xl font-bold text-primary">{playlist.playlistName}</h4>
                        <p className="mt-2 text-sm text-gray-500">Audio playlist</p>
                      </div>
                      <span className="shrink-0 rounded bg-gray-50 px-2 py-1 text-sm text-gray-500">{playlistMedia.length}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-primary/20 bg-cream/50 p-8 text-center">
              <FiMusic className="mx-auto mb-3 h-8 w-8 text-primary" />
              <p className="font-semibold text-primary">No audio playlists yet.</p>
              <p className="mt-1 text-sm text-gray-600">New audio uploads assigned to this trustee will appear here.</p>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-soft md:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">Audios</p>
              <h3 className="mt-1 text-2xl font-bold text-primary">
                {selectedPlaylist ? selectedPlaylist.playlistName : 'All audio lessons'}
              </h3>
            </div>
            <span className="text-sm text-gray-500">{displayedAudios.length} items</span>
          </div>

          {displayedAudios.length > 0 ? (
            renderAudioList(displayedAudios)
          ) : (
            <div className="rounded-lg border border-dashed border-primary/20 bg-cream/50 p-8 text-center">
              <p className="font-semibold text-primary">No audio available yet.</p>
              <p className="mt-1 text-sm text-gray-600">Upload audio with this trustee name to fill this folder.</p>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop"
            alt="Senior staff media library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-primary/70" />
        </div>

        <div className="container-custom relative z-10 py-20 lg:py-28 text-white">
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
            className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-8"
          >
            Browse trustee audio collections organized into clear folders, then switch to short videos for quick reminders and highlights.
          </motion.p>

          <QuranVersePanel {...mediaVerse} className="max-w-3xl" />
        </div>
      </section>

      <section className="section-padding py-20 bg-white">
        <div className="container-custom">
          {!trusteeId && (
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
          )}

          <div className="py-16">
            {trusteeId ? (
              renderTrusteeAudioPage()
            ) : activeTab === 'short' ? (
              renderShortLibrary('Short Videos', <FiPlay className="w-6 h-6 text-primary" />)
            ) : (
              renderAudioCollections()
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
