import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String },

    role: {
      type: String,
      enum: ["director", "board", "senior", "staff-i", "staff-ii", "staff-iii"],
      required: true
    },
    position: { type: String },
    department: { type: String },
    sections: {
      type: [String],
      default: []
    },
    bio: { type: String },
    academicStatus: { type: String },
    occupation: { type: String },
    maritalStatus: {
      type: String
    },

    image: { type: String },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Staff = mongoose.model("Staff", staffSchema);