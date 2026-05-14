import { AnimatePresence, motion } from 'framer-motion'
import {
  FaTimes,
  FaPlay,
  FaImage,
  FaVideo,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa'

const ProgramGalleryModal = ({
  galleryModal,
  galleryIndex,
  onClose,
  onNext,
  onPrev,
  onSelectIndex
}) => {
  return (
    <AnimatePresence>
      {galleryModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
            >
              <FaTimes />
            </button>

            {/* Gallery Content */}
            {galleryModal.items.length > 0 ? (
              <div className="relative">
                {/* Media Display */}
                <div className="h-[70vh] flex items-center justify-center bg-black">
                  {galleryModal.items[galleryIndex].type === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <FaPlay className="text-white text-6xl absolute z-10" />
                      <img
                        src={galleryModal.items[galleryIndex].thumbnail}
                        alt={galleryModal.items[galleryIndex].caption}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <img
                      src={galleryModal.items[galleryIndex].url}
                      alt={galleryModal.items[galleryIndex].caption}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Caption */}
                {galleryModal.items[galleryIndex].caption && (
                  <div className="p-4 text-center">
                    <p className="text-gray-700">{galleryModal.items[galleryIndex].caption}</p>
                    {galleryModal.items[galleryIndex].duration && (
                      <p className="text-sm text-muted mt-1">
                        Duration: {galleryModal.items[galleryIndex].duration}
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation */}
                {galleryModal.items.length > 1 && (
                  <>
                    {galleryIndex > 0 && (
                      <button
                        onClick={onPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 text-primary rounded-full flex items-center justify-center hover:bg-white transition"
                      >
                        <FaChevronLeft />
                      </button>
                    )}
                    {galleryIndex < galleryModal.items.length - 1 && (
                      <button
                        onClick={onNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 text-primary rounded-full flex items-center justify-center hover:bg-white transition"
                      >
                        <FaChevronRight />
                      </button>
                    )}
                  </>
                )}

                {/* Counter */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm">
                  {galleryIndex + 1} / {galleryModal.items.length}
                </div>
              </div>
            ) : (
              <div className="h-[70vh] flex flex-col items-center justify-center text-gray-500">
                <FaImage className="text-6xl mb-4" />
                <p className="text-xl">No media available for this category yet.</p>
              </div>
            )}

            {/* Thumbnail Strip */}
            {galleryModal.items.length > 0 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {galleryModal.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectIndex(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      i === galleryIndex ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                        <FaVideo className="absolute inset-0 m-auto text-white text-sm" />
                      </div>
                    ) : (
                      <img src={item.url} alt="" className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProgramGalleryModal
