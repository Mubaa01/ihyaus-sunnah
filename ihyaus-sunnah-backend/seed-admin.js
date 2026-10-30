import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

async function seedAdmin() {
  try {
    const email = (process.env.SEED_ADMIN_EMAIL || "").trim().toLowerCase();
    const password = process.env.SEED_ADMIN_PASSWORD || "";
    const role = process.env.SEED_ADMIN_ROLE || "admin";

    if (!email || !password) {
      console.error(
        "Refusing to seed admin. Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in the environment."
      );
      process.exit(1);
    }

    if (password.length < 12) {
      console.error("SEED_ADMIN_PASSWORD must be at least 12 characters.");
      process.exit(1);
    }

    if (!["admin", "director"].includes(role)) {
      console.error('SEED_ADMIN_ROLE must be "admin" or "director".');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(password, 12);
    const existing = await User.findOne({ email });

    if (existing) {
      existing.password = hashedPassword;
      existing.role = role;
      existing.isActive = true;
      await existing.save();
      console.log(`Updated existing admin account for ${email} (role: ${role}).`);
    } else {
      const admin = await User.create({
        email,
        password: hashedPassword,
        role,
        isActive: true,
      });
      console.log(`Created admin account ${email} (id: ${admin._id}, role: ${role}).`);
    }

    console.log("Password was not printed. Store it in your password manager.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

seedAdmin();
