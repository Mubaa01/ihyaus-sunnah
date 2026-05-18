import mongoose from "mongoose";
import dotenv from "dotenv";
import { Staff } from "./models/Staff.js";

dotenv.config();

const seedData = [
  {
    name: "Dr. Ahmad Hassan",
    email: "ahmad.hassan@school.com",
    phone: "+1-555-0101",
    role: "director",
    position: "Principal",
    sections: ["Administration"],
    academicStatus: "PhD in Education",
    occupation: "Educational Administrator",
    address: "123 Education Street",
    maritalStatus: "Married",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Fatima Al-Rashid",
    email: "fatima.rashid@school.com",
    phone: "+1-555-0102",
    role: "senior",
    position: "Head of Tahfeez",
    sections: ["Tahfeez"],
    academicStatus: "Masters in Islamic Studies",
    occupation: "Quran Teacher",
    address: "456 Learning Avenue",
    maritalStatus: "Married",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Mohammed Ibrahim",
    email: "mohammed.ibrahim@school.com",
    phone: "+1-555-0103",
    role: "senior",
    position: "Head of Arabic",
    sections: ["Arabiyyah"],
    academicStatus: "Masters in Arabic Language",
    occupation: "Arabic Instructor",
    address: "789 Academic Road",
    maritalStatus: "Married",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Sarah Khan",
    email: "sarah.khan@school.com",
    phone: "+1-555-0104",
    role: "staff-i",
    position: "Mathematics Teacher",
    sections: ["Western Education"],
    academicStatus: "Bachelors in Mathematics",
    occupation: "Teacher",
    address: "321 School Lane",
    maritalStatus: "Single",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Hassan Ali",
    email: "hassan.ali@school.com",
    phone: "+1-555-0105",
    role: "staff-ii",
    position: "Islamic Studies Teacher",
    sections: ["Islamiyyah", "Western Education"],
    academicStatus: "Bachelors in Islamic Studies",
    occupation: "Teacher",
    address: "654 Faith Street",
    maritalStatus: "Married",
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    name: "Aisha Mohamed",
    email: "aisha.mohamed@school.com",
    phone: "+1-555-0106",
    role: "staff-iii",
    position: "English Teacher",
    sections: ["Western Education"],
    academicStatus: "Bachelors in English",
    occupation: "Teacher",
    address: "987 Language Drive",
    maritalStatus: "Single",
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");

    await Staff.deleteMany({});
    console.log("🗑️ Old staff removed");

    const result = await Staff.insertMany(seedData);

    console.log(`\n✅ Seeded ${result.length} staff members\n`);

    result.forEach((s, i) => {
      console.log(`${i + 1}. ${s.name} - ${s.category} (${s.role})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();