import mongoose from "mongoose";
import dotenv from "dotenv";
import { Staff } from "./models/Staff.js";

dotenv.config();

const seedData = [
  {
    name: "Dr. Ahmad Hassan",
    email: "ahmad.hassan@school.com",
    phone: "+1-555-0101",
    category: "Admin",
    role: "Principal",
    sections: ["School"],
    academicStatus: "PhD in Education",
    occupation: "Educational Administrator",
    address: "123 Education Street"
  },
  {
    name: "Fatima Al-Rashid",
    email: "fatima.rashid@school.com",
    phone: "+1-555-0102",
    category: "Senior Staff 1",
    role: "Head of Tahfeez",
    sections: ["Tahfeez"],
    academicStatus: "Masters in Islamic Studies",
    occupation: "Quran Teacher",
    address: "456 Learning Avenue"
  },
  {
    name: "Mohammed Ibrahim",
    email: "mohammed.ibrahim@school.com",
    phone: "+1-555-0103",
    category: "Senior Staff 2",
    role: "Head of Arabic",
    sections: ["Arabiyyah"],
    academicStatus: "Masters in Arabic Language",
    occupation: "Arabic Instructor",
    address: "789 Academic Road"
  },
  {
    name: "Sarah Khan",
    email: "sarah.khan@school.com",
    phone: "+1-555-0104",
    category: "Staff",
    role: "Mathematics Teacher",
    sections: ["School"],
    academicStatus: "Bachelors in Mathematics",
    occupation: "Teacher",
    address: "321 School Lane"
  },
  {
    name: "Hassan Ali",
    email: "hassan.ali@school.com",
    phone: "+1-555-0105",
    category: "Staff",
    role: "Islamic Studies Teacher",
    sections: ["Islamiyyah", "School"],
    academicStatus: "Bachelors in Islamic Studies",
    occupation: "Teacher",
    address: "654 Faith Street"
  },
  {
    name: "Aisha Mohamed",
    email: "aisha.mohamed@school.com",
    phone: "+1-555-0106",
    category: "Staff",
    role: "English Teacher",
    sections: ["School"],
    academicStatus: "Bachelors in English",
    occupation: "Teacher",
    address: "987 Language Drive"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Staff.deleteMany({});
    console.log("Cleared existing staff data");

    // Insert seed data
    const result = await Staff.insertMany(seedData);
    console.log(`✅ Successfully seeded ${result.length} staff members`);

    // Display created records
    console.log("\nCreated Staff Members:");
    result.forEach((staff, index) => {
      console.log(`${index + 1}. ${staff.name} - ${staff.category}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
