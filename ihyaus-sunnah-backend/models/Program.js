import mongoose from "mongoose";

const dailyStructureSchema = new mongoose.Schema(
  {
    time: String,
    activity: String,
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema(
  {
    days: String,
    time: String,
    dailyStructure: [dailyStructureSchema],
  },
  { _id: false }
);

const previewVideoSchema = new mongoose.Schema(
  {
    thumbnail: String,
    title: String,
    duration: String,
    provider: {
      type: String,
      enum: ["external", "telegram"],
      default: "external",
    },
    url: String,
    mediaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    telegramFileId: String,
    telegramMessageId: String,
    telegramChatId: String,
    telegramThumbnailFileId: String,
  },
  { _id: false }
);

// ================= CATEGORY =================
const categorySchema = new mongoose.Schema(
  {
    // ✅ Removed enum — form allows free-text titles like "Basic Level", "Intermediate Level", etc.
    title: {
      type: String,
      required: true,
    },
    titleArabic: String,
    ageRange: String,
    categoryType: String,
    totalClasses: Number,
    description: String,
    prerequisites: String,

    // ✅ Fixed: max 3 videos to match the form UI limit
    previewVideos: {
      type: [previewVideoSchema],
      validate: [(v) => v.length <= 3, "Max 3 preview videos allowed"],
    },

    outcomes: [String],
  },
  { _id: false }
);

const staffHighlightSchema = new mongoose.Schema(
  {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    role: String,
    categoryFocus: String,
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    name: String,
    quote: String,
  },
  { _id: false }
);

const verseSchema = new mongoose.Schema(
  {
    arabic: String,
    translation: String,
    reference: String,
  },
  { _id: false }
);

// ================= PROGRAM =================
const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    category: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "upcoming", "completed"],
      default: "active",
    },

    thumbnail: String,
    banner: String,
    heroImage: String,
    overviewImage: String,

    tagline: String,
    shortDescription: String,
    fullDescription: [String],

    instructor: String,
    duration: String,
    location: String,

    schedule: scheduleSchema,

    sections: [String],
    features: [String],
    objectives: [String],

    stats: {
      totalStudents: { type: Number, default: 0 },
      totalStaff: { type: Number, default: 0 },
      yearsRunning: { type: Number, default: 0 },
    },

    categories: [categorySchema],

    staffHighlights: [staffHighlightSchema],
    testimonials: [testimonialSchema],
    verse: verseSchema,

    gallery: [String],

    startDate: Date,
    endDate: Date,

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Program = mongoose.model("Program", programSchema);