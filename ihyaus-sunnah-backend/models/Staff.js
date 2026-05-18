import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String },


    // HIERARCHY LEVEL
    role: {
      type: String,
      enum: ["director", "board", "senior", "staff-i", "staff-ii", "staff-iii"],
      required: true,
    },

    // JOB TITLE
    position: { type: String, required: true }, // e.g., "Principal", "Head of Tahfeez"

    // DEPARTMENT/SECTIONS
    sections: {
      type: [String],
      default: [],
    },



    // PROFILE INFO
    bio: { type: String },
    academicStatus: { type: String },
    occupation: { type: String },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },

    image: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Staff = mongoose.model("Staff", staffSchema);