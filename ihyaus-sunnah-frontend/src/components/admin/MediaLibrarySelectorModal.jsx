import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaCheckCircle, FaImage, FaPlay } from "react-icons/fa";
import { mediaAPI } from "../../services/api";

const MediaLibrarySelectorModal = ({ isOpen, onClose, onSelect, maxSelection = 3 }) => {
  const [mediaList, setMediaList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch media library on modal open
  useEffect(() => {
    if (!isOpen) return;

    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await mediaAPI.getAll();
        setMediaList(response.data || []);
      } catch (err) {
        setError("Failed to load media library");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [isOpen]);

  const toggleSelection = (media) => {
    setSelectedMedia((prev) => {
      const isSelected = prev.some((m) => m._id === media._id);
      if (isSelected) {
        return prev.filter((m) => m._id !== media._id);
      } else if (prev.length < maxSelection) {
        return [...prev, media];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    const formattedVideos = selectedMedia.map((media) => ({
      title: media.title || media.fileName,
      duration: media.duration || "0:00",
      thumbnail: media.thumbnail || media.thumbnailUrl || "",
      provider: media.source === "telegram" ? "telegram" : "external",
      mediaId: media._id,
      url: media.source === "telegram" ? "" : media.url,
      telegramFileId: media.source === "telegram" ? media.telegramFileId : undefined,
      telegramMessageId: media.source === "telegram" ? media.telegramMessageId : undefined,
      telegramChatId: media.source === "telegram" ? media.telegramChatId : undefined,
      telegramThumbnailFileId: media.source === "telegram" ? media.telegramThumbnailFileId : undefined,
    }));

    onSelect(formattedVideos);
    setSelectedMedia([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-bold text-primary">Select Videos</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-gold border-t-primary rounded-full" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">{error}</div>
          ) : mediaList.length === 0 ? (
            <div className="text-center text-muted py-12">No media found in library</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaList.map((media) => {
                const isSelected = selectedMedia.some((m) => m._id === media._id);
                const isDisabled = !isSelected && selectedMedia.length >= maxSelection;

                return (
                  <motion.div
                    key={media._id}
                    whileHover={{ y: -4 }}
                    onClick={() => !isDisabled && toggleSelection(media)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    } ${isSelected ? "ring-2 ring-gold ring-offset-2" : "hover:shadow-lg"}`}
                  >
                    {/* THUMBNAIL */}
                    <div className="relative w-full aspect-video bg-neutral-200 overflow-hidden">
                      {media.thumbnail || media.thumbnailUrl ? (
                        <img
                          src={media.thumbnail || media.thumbnailUrl}
                          alt={media.title || media.fileName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-300">
                          <FaImage size={32} className="text-neutral-400" />
                        </div>
                      )}

                      {/* PLAY ICON OVERLAY */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <FaPlay size={40} className="text-white" />
                      </div>

                      {/* PROVIDER BADGE */}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            media.source === "telegram"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-700 text-white"
                          }`}
                        >
                          {media.source === "telegram" ? "📱 Telegram" : "🔗 External"}
                        </span>
                      </div>

                      {/* CHECK MARK */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                          <FaCheckCircle size={48} className="text-gold" />
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="p-3 bg-white">
                      <p className="font-semibold text-sm line-clamp-2">
                        {media.title || media.fileName}
                      </p>
                      <p className="text-xs text-muted mt-1">{media.duration || "0:00"}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-sm text-muted">
            Selected: {selectedMedia.length}/{maxSelection}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedMedia.length === 0}
              className="px-4 py-2 rounded-lg bg-gold text-white hover:bg-gold/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm ({selectedMedia.length})
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaLibrarySelectorModal;
