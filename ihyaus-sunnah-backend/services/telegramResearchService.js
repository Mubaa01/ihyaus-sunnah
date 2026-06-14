import { Research } from "../models/Research.js";
import { Staff } from "../models/Staff.js";
import { Program } from "../models/Program.js";
import {
  getTelegramResearchPayload,
  parseTelegramResearchCaption,
} from "../utils/telegramResearchUtils.js";

const REQUIRED_FIELDS = ["title", "author", "researchCategory", "researchType", "summary"];
const validStatus = ["published", "draft", "under-review"];

export const saveTelegramMessageAsResearch = async (message = {}) => {
  const telegramPayload = getTelegramResearchPayload(message);
  if (!telegramPayload) {
    return {
      skipped: true,
      message: "Telegram message does not contain a supported research document",
    };
  }

  const metadata = parseTelegramResearchCaption(message.caption || "");
  const missingFields = REQUIRED_FIELDS.filter((field) => !metadata[field]);

  if (missingFields.length > 0) {
    const error = new Error(`Telegram caption is missing: ${missingFields.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }

  let staff = null;
  if (metadata.staffName) {
    staff = await Staff.findOne({
      name: { $regex: `^${escapeRegExp(metadata.staffName)}$`, $options: "i" },
    });
  }

  let program = null;
  if (metadata.programName) {
    program = await Program.findOne({
      title: { $regex: `^${escapeRegExp(metadata.programName)}$`, $options: "i" },
    });
  }

  const status = validStatus.includes(metadata.status?.toLowerCase())
    ? metadata.status.toLowerCase()
    : "published";

  const research = await Research.findOneAndUpdate(
    {
      provider: "telegram",
      telegramFileId: telegramPayload.fileId,
    },
    {
      $set: {
        title: metadata.title,
        author: metadata.author,
        researchCategory: metadata.researchCategory,
        researchType: metadata.researchType,
        status,
        summary: metadata.summary,
        tags: metadata.tags,
        staffId: staff?._id || null,
        programId: program?._id || null,
        provider: "telegram",
        telegramFileId: telegramPayload.fileId,
        telegramMessageId: message.message_id,
        telegramChatId: String(message.chat?.id || ""),
        telegramMimeType: telegramPayload.mimeType,
        telegramFileName: telegramPayload.fileName,
        telegramFileSize: telegramPayload.fileSize,
        pdfFileName: telegramPayload.fileName,
      },
    },
    { new: true, upsert: true, runValidators: true }
  );

  if (research && !research.pdfUrl) {
    research.pdfUrl = `/api/research/${research._id}/telegram-url`;
    await research.save();
  }

  return {
    skipped: false,
    research,
  };
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
