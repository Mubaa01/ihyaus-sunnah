// models/Majlis.js

import mongoose from "mongoose";

const majlisSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFO
    // =========================
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "paused"],
      default: "ongoing",
    },

    // =========================
    // SCHEDULE
    // =========================
    schedule: {
      day: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        required: true,
      },

      endTime: {
        type: String,
        required: true,
      },

      timezone: {
        type: String,
        default: "Africa/Lagos",
      },
    },

    // =========================
    // BOOK DETAILS
    // =========================
    book: {
      name: {
        type: String,
        required: true,
      },

      arabicName: String,

      image: String,

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
      },

      description: String,

      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },

      currentChapter: String,
    },

    // =========================
    // INSTRUCTOR
    // =========================
    instructor: {
      name: {
        type: String,
        required: true,
      },

      image: String,

      role: String,

      bio: String,
    },

    // =========================
    // ACCESS
    // =========================
    access: {
      telegramLink: String,

      youtubeLink: String,

      meetingLink: String,

      materials: [String],
    },

    // =========================
    // STUDENT INFO
    // =========================
    enrollment: {
      enrolled: {
        type: Number,
        default: 0,
      },

      capacity: {
        type: Number,
        default: 0,
      },
    },

    // =========================
    // PRIVATE CLASS INFO
    // =========================
    requirements: String,

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    // =========================
    // UI SETTINGS
    // =========================
    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Majlis = mongoose.model("Majlis", majlisSchema);