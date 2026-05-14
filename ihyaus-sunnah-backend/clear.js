import mongoose from "mongoose";
import dotenv from "dotenv";
import { Staff } from "./models/Staff.js";

dotenv.config();

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await Staff.deleteMany({});
    console.log(`✅ Successfully deleted ${result.deletedCount} staff members`);
    console.log("Database is now empty!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to clear database:", error.message);
    process.exit(1);
  }
}

clearDatabase();
