import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js";
import { BCRYPT_SALT_ROUNDS } from "./utils/tokenUtils.js";

dotenv.config();

async function seedAdmin() {
  try {
    const password = process.env.SEED_ADMIN_PASSWORD || "";
    const role = process.env.SEED_ADMIN_ROLE || "admin";
    const name = process.env.SEED_ADMIN_NAME || (role === "director" ? "Director" : "Admin");

    if (!password) {
      console.error(
        "Refusing to seed admin. Set SEED_ADMIN_PASSWORD in the environment."
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

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const existing = await User.findOne({ role, name });

    if (existing) {
      existing.password = hashedPassword;
      existing.role = role;
      existing.name = name;
      existing.isActive = true;
      await existing.save();
      console.log(`Updated existing ${role} account (name: ${name}).`);
    } else {
      const admin = await User.create({
        name,
        password: hashedPassword,
        role,
        isActive: true,
      });
      console.log(`Created ${role} account (name: ${name}, id: ${admin._id}).`);
    }

    console.log("Password was not printed. Store it in your password manager.");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

seedAdmin();
