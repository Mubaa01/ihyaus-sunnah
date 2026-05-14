import mongoose from "mongoose";

const dailyStructureSchema = new mongoose.Schema({
  time: String,
  activity: String
}, { _id: false });

const scheduleSchema = new mongoose.Schema({
  days: String,
  time: String,
  dailyStructure: [dailyStructureSchema]
}, { _id: false });

const categorySchema = new mongoose.Schema({
  title: String,
  titleArabic: String,
  ageRange: String,
  categoryType: String,
  totalClasses: Number,
  description: String,
  prerequisites: String,
  previewVideos: [{
    thumbnail: String,
    title: String,
    duration: String,
    url: String
  }],
  outcomes: [String]
});

const staffHighlightSchema = new mongoose.Schema({
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  role: String,
  categoryFocus: String
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
  name: String,
  quote: String
}, { _id: false });

const verseSchema = new mongoose.Schema({
  arabic: String,
  translation: String,
  reference: String
}, { _id: false });

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  status: { type: String, enum: ["active", "upcoming", "completed"], default: "active" },
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
    yearsRunning: { type: Number, default: 0 }
  },
  categories: [categorySchema],
  staffHighlights: [staffHighlightSchema],
  testimonials: [testimonialSchema],
  verse: verseSchema,
  gallery: [String],
  startDate: Date,
  endDate: Date,
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export const Program = mongoose.model("Program", programSchema);
