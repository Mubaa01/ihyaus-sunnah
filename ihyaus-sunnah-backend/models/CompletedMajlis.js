// models/CompletedMajlis.js

import mongoose from "mongoose";

const completedMajlisSchema = new mongoose.Schema(
  {
    // =========================
    // BOOK INFO
    // =========================
    book: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      arabicName: String,

      image: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        enum: [
          "القرآن الكريم",
          "علوم القرآن",
          "الحديث",
          "علوم الحديث",
          "العقيدة",
          "السيرة",
          "اللغة",
          "الفقه",
          "قواعد الفقه",
          "أصول الفقه",
        ],
        required: true,
      },

      description: {
        type: String,
        trim: true,
      },

      highlights: [String],
    },

    // =========================
    // TUTOR INFO
    // =========================
    tutor: {
      name: {
        type: String,
        required: true,
      },

      image: String,

      role: String,
    },

    // =========================
    // COMPLETION DETAILS
    // =========================
    studyPeriod: {
      startDate: {
        type: Date,
        required: true,
      },

      completionDate: {
        type: Date,
        required: true,
      },

      durationText: String,
    },

    // =========================
    // BOOK DETAILS
    // =========================
    totalVolumes: {
      type: Number,
      default: 1,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    // =========================
    // DISPLAY SETTINGS
    // =========================
    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    // =========================
    // OPTIONAL LINKS
    // =========================
    resources: {
      summaryPdf: String,

      youtubePlaylist: String,

      telegramChannel: String,
    },
  },
  {
    timestamps: true,
  }
);

export const CompletedMajlis = mongoose.model(
  "CompletedMajlis",
  completedMajlisSchema
);