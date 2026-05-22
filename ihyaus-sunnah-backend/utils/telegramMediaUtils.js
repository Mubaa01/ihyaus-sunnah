const ALLOWED_TYPES = ["video", "audio", "short", "student"];
const ALLOWED_VISIBILITY = ["public", "private"];

export const parseTelegramCaption = (caption = "") => {
  const metadata = {};

  caption
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const match = line.match(/^([A-Za-z ]+):\s*(.*)$/);
      if (!match) return;

      const key = match[1].trim().toLowerCase().replace(/\s+/g, "");
      metadata[key] = match[2].trim();
    });

  const type = metadata.type?.toLowerCase();
  const visibility = metadata.visibility?.toLowerCase() || "public";

  return {
    title: metadata.title,
    description: metadata.description || "",
    type: ALLOWED_TYPES.includes(type) ? type : undefined,
    mediaCategory: metadata.category,
    trusteeName: metadata.trustee || metadata.staff || "",
    playlistName: metadata.playlist,
    visibility: ALLOWED_VISIBILITY.includes(visibility) ? visibility : "public",
    thumbnail: metadata.thumbnail || "",
    tags: metadata.tags
      ? metadata.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
  };
};

export const getTelegramMediaPayload = (message = {}) => {
  if (message.video) {
    return {
      fileId: message.video.file_id,
      fileName: message.video.file_name,
      fileSize: message.video.file_size,
      mimeType: message.video.mime_type,
      thumbnailFileId: message.video.thumbnail?.file_id,
    };
  }

  if (message.audio) {
    return {
      fileId: message.audio.file_id,
      fileName: message.audio.file_name || message.audio.title,
      fileSize: message.audio.file_size,
      mimeType: message.audio.mime_type,
      thumbnailFileId: message.audio.thumbnail?.file_id,
    };
  }

  if (message.document) {
    return {
      fileId: message.document.file_id,
      fileName: message.document.file_name,
      fileSize: message.document.file_size,
      mimeType: message.document.mime_type,
      thumbnailFileId: message.document.thumbnail?.file_id,
    };
  }

  return null;
};
