import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "Admin User"
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // hide password by default
    },

    role: {
      type: String,
      enum: ["director", "admin", "staff"],
      default: "admin"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,

    lastLoginAt: Date
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
