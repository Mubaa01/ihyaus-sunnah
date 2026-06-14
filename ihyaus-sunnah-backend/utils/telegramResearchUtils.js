export const parseTelegramResearchCaption = (caption = "") => {
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

  return {
    title: metadata.title,
    author: metadata.author,
    researchCategory: metadata.category,
    researchType: metadata.type,
    status: metadata.status,
    summary: metadata.summary,
    tags: metadata.tags
      ? metadata.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    staffName: metadata.staff || metadata.trustee || "",
    programName: metadata.program || "",
  };
};

export const getTelegramResearchPayload = (message = {}) => {
  if (message.document) {
    return {
      fileId: message.document.file_id,
      fileName: message.document.file_name,
      fileSize: message.document.file_size,
      mimeType: message.document.mime_type,
    };
  }

  return null;
};
