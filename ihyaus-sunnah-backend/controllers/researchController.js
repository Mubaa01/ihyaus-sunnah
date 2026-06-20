import mongoose from "mongoose";
import { Research, researchCategories, researchTypes } from "../models/Research.js";
import { saveTelegramMessageAsResearch } from "../services/telegramResearchService.js";

const buildResearchFilter = ({ category, type, programId, status, search }) => {
  const filter = {};

  if (category) filter.researchCategory = category;
  if (type) filter.researchType = type;
  if (programId) filter.programId = programId;
  if (status) filter.status = status;
  if (search) {
    const regex = { $regex: search, $options: "i" };
    filter.$or = [
      { title: regex },
      { summary: regex },
      { author: regex },
      { tags: regex },
    ];
  }

  return filter;
};

export const createResearch = async (req, res) => {
  try {
    const research = await Research.create(req.body);
    res.status(201).json({ success: true, message: "Research created successfully", data: research });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllResearch = async (req, res) => {
  try {
    const filter = buildResearchFilter(req.query);

    const research = await Research.find(filter)
      .populate("staffId", "name image position role sections")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: research,
      meta: {
        total: research.length,
        categories: researchCategories,
        types: researchTypes,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getResearchById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const research = await Research.findById(id).populate("staffId", "name image position role sections");
    if (!research) {
      return res.status(404).json({ success: false, message: "Research not found" });
    }

    res.json({ success: true, data: research });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTelegramResearchUrl = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const research = await Research.findById(id);
    if (!research) {
      return res.status(404).json({ success: false, message: "Research not found" });
    }

    const hasTelegramSource = research.provider === "telegram" || Boolean(research.telegramFileId);

    if (!hasTelegramSource) {
      return res.json({
        success: true,
        data: {
          url: research.pdfUrl || null,
          provider: research.provider || "local",
        },
      });
    }

    if (research.pdfUrl && /^(https?:)?\/\//i.test(research.pdfUrl)) {
      return res.json({
        success: true,
        data: {
          url: research.pdfUrl,
          provider: research.provider || "local",
        },
      });
    }

    if (!process.env.TELEGRAM_BOT_TOKEN) {
      return res.status(500).json({ success: false, message: "Telegram bot token is not configured" });
    }

    if (!research.telegramFileId) {
      return res.status(404).json({ success: false, message: "Telegram file reference is missing" });
    }

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${encodeURIComponent(research.telegramFileId)}`
    );
    const payload = await response.json();

    if (!payload.ok || !payload.result?.file_path) {
      return res.status(502).json({
        success: false,
        message: payload.description || "Unable to get Telegram file URL",
      });
    }

    const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${payload.result.file_path}`;

    if (req.query.redirect === "1") {
      return res.redirect(url);
    }

    res.json({
      success: true,
      data: {
        url,
        provider: "telegram",
        expiresInHint: "Telegram file URLs are temporary. Request a fresh URL before download.",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const ingestTelegramResearch = async (req, res) => {
  try {
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const receivedSecret = req.headers["x-telegram-bot-api-secret-token"];

    if (expectedSecret && receivedSecret !== expectedSecret) {
      return res.status(401).json({ success: false, message: "Invalid Telegram webhook secret" });
    }

    const message = req.body.channel_post || req.body.message;
    if (!message) {
      return res.json({ success: true, message: "No Telegram message to process" });
    }

    const result = await saveTelegramMessageAsResearch(message);
    if (result.skipped) {
      return res.json({ success: true, message: result.message });
    }

    res.status(201).json({
      success: true,
      message: "Telegram research saved successfully",
      data: result.research,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

export const updateResearch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const updated = await Research.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("staffId", "name image position role sections");
    if (!updated) return res.status(404).json({ success: false, message: "Research not found" });
    res.json({ success: true, message: "Research updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteResearch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid research ID" });
    }

    const deleted = await Research.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Research not found" });
    res.json({ success: true, message: "Research deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
