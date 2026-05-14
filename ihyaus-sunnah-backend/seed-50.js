import mongoose from "mongoose";
import dotenv from "dotenv";
import { Staff } from "./models/Staff.js";

dotenv.config();

const firstNames = [
  "Ahmad", "Mohammed", "Hassan", "Omar", "Ali", "Ibrahim", "Fatima", "Aisha", "Layla", "Zainab",
  "Sarah", "Mariam", "Hana", "Noor", "Dina", "Reem", "Leila", "Jasmine", "Sophia", "Emma",
  "David", "James", "Michael", "Robert", "William", "Edward", "Thomas", "Charles", "Joseph", "Richard",
  "Ahmed", "Khalid", "Tariq", "Rashid", "Karim", "Samir", "Adel", "Walid", "Nabil", "Jamal"
];

const lastNames = [
  "Hassan", "Ali", "Ahmed", "Khan", "Ibrahim", "Mohamed", "Abdullah", "Rahman", "Malik", "Hussain",
  "Al-Rashid", "Al-Mansouri", "Al-Karim", "Al-Noor", "Al-Amin", "Smith", "Johnson", "Williams", "Brown", "Jones"
];

const roles = [
  "Principal", "Vice Principal", "Head of Department", "Senior Teacher", "Teacher", "Assistant Teacher",
  "Quran Teacher", "Islamic Studies Teacher", "Arabic Teacher", "Mathematics Teacher",
  "English Teacher", "Science Teacher", "Physical Education Teacher", "Computer Teacher", "Art Teacher"
];

const academicStatuses = [
  "PhD in Education", "PhD in Islamic Studies", "Masters in Education", "Masters in Islamic Studies",
  "Masters in Arabic Language", "Masters in Mathematics", "Bachelors in Education", "Bachelors in Islamic Studies",
  "Bachelors in Arabic", "Bachelors in English", "Bachelors in Science", "Diploma in Education"
];

const occupations = [
  "Educational Administrator", "Quran Teacher", "Islamic Scholar", "Language Instructor",
  "Mathematics Educator", "Science Educator", "Curriculum Developer", "Academic Counselor",
  "Teaching Coordinator", "Educational Consultant"
];

const addresses = [
  "123 Education Street", "456 Learning Avenue", "789 Academic Road", "321 School Lane",
  "654 Faith Street", "987 Language Drive", "147 Knowledge Boulevard", "258 Wisdom Circle",
  "369 Excellence Court", "741 Achievement Plaza"
];

function generateStaffMembers(count) {
  const categories = ["Admin", "Senior Staff 1", "Senior Staff 2", "Staff"];
  const sections = ["Tahfeez", "Islamiyyah", "Arabiyyah", "School"];
  const staffMembers = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Generate 1-3 random sections
    const numSections = Math.floor(Math.random() * 3) + 1;
    const randomSections = [];
    for (let j = 0; j < numSections; j++) {
      const section = sections[Math.floor(Math.random() * sections.length)];
      if (!randomSections.includes(section)) {
        randomSections.push(section);
      }
    }

    staffMembers.push({
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@school.com`,
      phone: `+1-555-${String(1000 + i).slice(-4)}`,
      category: category,
      role: roles[Math.floor(Math.random() * roles.length)],
      sections: randomSections.length > 0 ? randomSections : ["School"],
      academicStatus: academicStatuses[Math.floor(Math.random() * academicStatuses.length)],
      occupation: occupations[Math.floor(Math.random() * occupations.length)],
      address: addresses[Math.floor(Math.random() * addresses.length)]
    });
  }

  return staffMembers;
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Staff.deleteMany({});
    console.log("Cleared existing staff data");

    // Generate and insert 50 staff members
    const staffData = generateStaffMembers(50);
    const result = await Staff.insertMany(staffData);
    
    console.log(`✅ Successfully added ${result.length} staff members to the database`);

    // Display summary by category
    const categories = ["Admin", "Senior Staff 1", "Senior Staff 2", "Staff"];
    console.log("\nStaff Distribution by Category:");
    for (const category of categories) {
      const count = result.filter(s => s.category === category).length;
      console.log(`  ${category}: ${count} staff members`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();
