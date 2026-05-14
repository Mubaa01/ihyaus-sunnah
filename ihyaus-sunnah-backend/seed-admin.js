import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin user
    const admin = new User({
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
      isActive: true
    });

    const saved = await admin.save();
    console.log("✅ Admin user created:");
    console.log(`   Email: admin@test.com`);
    console.log(`   Password: admin123`);
    console.log(`   Role: admin`);
    console.log(`   ID: ${saved._id}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seedAdmin();
