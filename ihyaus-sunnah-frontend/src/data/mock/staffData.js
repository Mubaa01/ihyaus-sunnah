// src/data/mock/staffData.js

export const staffData = [
  /* ======================================================
     BOARD OF TRUSTEES (3)
  ====================================================== */

  {
    id: 1,
    name: "Dr. Abdulrahman Musa",
    category: "Board of Trustees",
    categoryOrder: 1,
    role: "Director",
    sections: ["Islamiyyah", "Tahfeez"],
    maritalStatus: "Married",
    email: "abdulrahman@ihyaussunnah.org",
    phone: "+2348011111111",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Founder and Director of Ihyaus Sunnah Foundation with years of experience in Islamic education and community leadership.",
  },

  {
    id: 2,
    name: "Ustadh Ibrahim Sani",
    category: "Board of Trustees",
    categoryOrder: 1,
    role: "Head of Islamiyyah",
    sections: ["Islamiyyah"],
    maritalStatus: "Married",
    email: "ibrahim@ihyaussunnah.org",
    phone: "+2348022222222",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Senior Islamic instructor specializing in Aqeedah and Fiqh studies.",
  },

  {
    id: 3,
    name: "Ustadh Abdullah Yusuf",
    category: "Board of Trustees",
    categoryOrder: 1,
    role: "Head of Tahfeez",
    sections: ["Tahfeez"],
    maritalStatus: "Married",
    email: "abdullah@ihyaussunnah.org",
    phone: "+2348033333333",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Experienced Hafidh and supervisor of Qur'an memorization programs.",
  },

  /* ======================================================
     SENIOR STAFF (2)
  ====================================================== */

  {
    id: 4,
    name: "Ustadh Ahmad Haruna",
    category: "Senior Staff",
    categoryOrder: 2,
    role: "Senior Program Coordinator",
    sections: ["Arabic Studies", "Islamiyyah"],
    maritalStatus: "Married",
    email: "ahmad@ihyaussunnah.org",
    phone: "+2348044444444",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Senior staff member overseeing curriculum coordination and staff development.",
  },

  {
    id: 5,
    name: "Mrs. Fatima Bello",
    category: "Senior Staff",
    categoryOrder: 2,
    role: "Senior Records Officer",
    sections: ["Western Education", "Tahfeez"],
    maritalStatus: "Married",
    email: "fatima@ihyaussunnah.org",
    phone: "+2348055555555",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Senior administrative staff managing academic records and program operations.",
  },

  /* ======================================================
     STAFF I (10)
  ====================================================== */

  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 6,
    name: `Staff I Member ${i + 1}`,
    category: "Staff I",
    categoryOrder: 3,
    role:
      i % 3 === 0
        ? "Exam Officer (Western Education)"
        : i % 3 === 1
        ? "Assistant Instructor (Islamiyyah)"
        : "Administrative Assistant",
    sections:
      i % 3 === 0
        ? ["Western Education"]
        : i % 3 === 1
        ? ["Islamiyyah"]
        : ["Arabic Studies"],
    maritalStatus: i % 2 === 0 ? "Married" : "Single",
    email: `staff1_${i + 1}@ihyaussunnah.org`,
    phone: `+23481111111${i}`,
    image:
      i % 2 === 0
        ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Committed educator contributing to student development and institutional growth.",
  })),

  /* ======================================================
     STAFF II (10)
  ====================================================== */

  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 16,
    name: `Staff II Member ${i + 1}`,
    category: "Staff II",
    categoryOrder: 4,
    role:
      i % 3 === 0
        ? "Exam Officer (Islamiyyah)"
        : i % 3 === 1
        ? "Exam Officer (Tahfeez)"
        : "Support Instructor",
    sections:
      i % 3 === 0
        ? ["Islamiyyah"]
        : i % 3 === 1
        ? ["Tahfeez"]
        : ["Arabic Studies"],
    maritalStatus: i % 2 === 0 ? "Married" : "Single",
    email: `staff2_${i + 1}@ihyaussunnah.org`,
    phone: `+23482222222${i}`,
    image:
      i % 2 === 0
        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Dedicated teaching staff focused on student mentorship and academic discipline.",
  })),

  /* ======================================================
     STAFF III (10)
  ====================================================== */

  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 26,
    name: `Staff III Member ${i + 1}`,
    category: "Staff III",
    categoryOrder: 5,
    role:
      i % 2 === 0
        ? "Junior Instructor"
        : "Support Officer",
    sections:
      i % 4 === 0
        ? ["Western Education"]
        : i % 4 === 1
        ? ["Islamiyyah"]
        : i % 4 === 2
        ? ["Tahfeez"]
        : ["Arabic Studies"],
    maritalStatus: i % 3 === 0 ? "Married" : "Single",
    email: `staff3_${i + 1}@ihyaussunnah.org`,
    phone: `+23483333333${i}`,
    image:
      i % 2 === 0
        ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    bio:
      "Support staff member assisting in teaching, supervision, and institutional operations.",
  })),
]
