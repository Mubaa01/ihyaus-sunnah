// Majlis Schedule Store - All sessions are FREE

export const defaultMajlis = [
  // PUBLIC MAJLIS
  {
    id: "pub-majlis-1",
    title: "Fajr Reminder Circle",
    day: "Daily (Mon-Thu)",
    time: "06:00 AM",
    endTime: "06:45 AM",
    book: "Selected Ahadith",
    bookImage: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200&h=280&fit=crop",
    tutor: "Ustadh Ahmad Tijani",
    tutorImage: "https://images.unsplash.com/photo-1583195764036-6dc248ac07b9?w=150&h=150&fit=crop",
    tutorRole: "Senior Islamic Scholar",
    description: "Morning reminder circle with Qur'an recitation and selected Ahadith for spiritual development.",
    type: "public", // "public" | "private"
    format: "In-Person & Online", // "In-Person" | "Online" | "In-Person & Online"
    capacity: 50,
    enrolled: 38,
    level: "All Levels",
    intensity: "Light",
    requirements: "None",
  },
  {
    id: "pub-majlis-2",
    title: "Weekly Tafsir Session",
    day: "Saturday",
    time: "10:00 AM",
    endTime: "12:00 PM",
    book: "Tafsir Ibn Kathir",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Dr. Umar Farooq",
    tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    tutorRole: "Professor of Qur'anic Studies",
    description: "Detailed explanation of Qur'anic verses with practical lessons and reflections.",
    type: "public",
    format: "In-Person & Online",
    capacity: 60,
    enrolled: 52,
    level: "All Levels",
    intensity: "Moderate",
    requirements: "None",
  },
  {
    id: "pub-majlis-3",
    title: "Seerah Study Circle",
    day: "Sunday",
    time: "04:00 PM",
    endTime: "06:00 PM",
    book: "Ar-Raheeq Al-Makhtum",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Sheikh Abdulrazzak",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Hadith Specialist",
    description: "Exploring the life of the Prophet ﷺ and extracting timeless guidance.",
    type: "public",
    format: "In-Person & Online",
    capacity: 70,
    enrolled: 65,
    level: "All Levels",
    intensity: "Moderate",
    requirements: "None",
  },
  {
    id: "pub-majlis-4",
    title: "Evening Dhikr Gathering",
    day: "Daily",
    time: "07:00 PM",
    endTime: "07:45 PM",
    book: "Qur'an & Adhkar",
    bookImage: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=200&h=280&fit=crop",
    tutor: "Hafiz Musa Ibrahim",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Qur'an Memorization Coach",
    description: "A peaceful gathering for Qur'an recitation, adhkar and reminders.",
    type: "public",
    format: "In-Person & Online",
    capacity: 100,
    enrolled: 87,
    level: "All Levels",
    intensity: "Light",
    requirements: "None",
  },
  {
    id: "pub-majlis-5",
    title: "Women's Weekly Circle",
    day: "Wednesday",
    time: "03:00 PM",
    endTime: "05:00 PM",
    book: "Riyad-us-Saliheen",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Ustadha Fatima",
    tutorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    tutorRole: "Women's Education Director",
    description: "Dedicated weekly learning session for sisters focused on purification and character.",
    type: "public",
    format: "In-Person",
    capacity: 40,
    enrolled: 35,
    level: "All Levels",
    intensity: "Moderate",
    requirements: "Women Only",
  },

  // PRIVATE MAJLIS (For Serious Students)
  {
    id: "priv-majlis-1",
    title: "Advanced Arabic Grammar (Intensive)",
    day: "Mon & Wed",
    time: "06:00 PM",
    endTime: "07:30 PM",
    book: "Al-Ajurrumiyyah",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Ustadh Ahmad Tijani",
    tutorImage: "https://images.unsplash.com/photo-1583195764036-6dc248ac07b9?w=150&h=150&fit=crop",
    tutorRole: "Arabic Language Expert",
    description: "In-depth Arabic grammar for serious students committed to excellence.",
    type: "private",
    format: "In-Person",
    capacity: 15,
    enrolled: 12,
    level: "Intermediate-Advanced",
    intensity: "High",
    requirements: "Arabic Basics Required. Commitment to weekly homework and assessments.",
  },
  {
    id: "priv-majlis-2",
    title: "Qur'an Tahfeez (Hifz Program)",
    day: "Daily (Sat-Thu)",
    time: "05:00 AM",
    endTime: "07:00 AM",
    book: "Qur'an Al-Kareem",
    bookImage: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=200&h=280&fit=crop",
    tutor: "Hafiz Musa Ibrahim",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Certified Hifz Teacher",
    description: "Structured Qur'an memorization program for dedicated students. Daily practice required.",
    type: "private",
    format: "In-Person",
    capacity: 10,
    enrolled: 8,
    level: "All Levels",
    intensity: "Very High",
    requirements: "Daily commitment. 2+ hours per week minimum. Ijaza pathway available.",
  },
  {
    id: "priv-majlis-3",
    title: "Hadith Sciences (Research Level)",
    day: "Tuesday & Thursday",
    time: "07:00 PM",
    endTime: "09:00 PM",
    book: "Al-Arba'un Nawawiyyah",
    bookImage: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200&h=280&fit=crop",
    tutor: "Dr. Umar Farooq",
    tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    tutorRole: "Hadith Sciences Professor",
    description: "Advanced hadith sciences with research methodology and authentication techniques.",
    type: "private",
    format: "In-Person",
    capacity: 12,
    enrolled: 10,
    level: "Advanced",
    intensity: "High",
    requirements: "Arabic proficiency. Previous Islamic studies background recommended.",
  },
  {
    id: "priv-majlis-4",
    title: "Islamic Fiqh Masterclass",
    day: "Thursday & Saturday",
    time: "06:00 PM",
    endTime: "08:00 PM",
    book: "Fiqh As-Sunnah",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Sheikh Abdulrazzak",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Fiqh Consultant",
    description: "Comprehensive fiqh studies across all schools of Islamic law for committed learners.",
    type: "private",
    format: "In-Person",
    capacity: 20,
    enrolled: 15,
    level: "Intermediate-Advanced",
    intensity: "High",
    requirements: "Basic Islamic knowledge required.",
  },
  {
    id: "priv-majlis-5",
    title: "Tajweed & Qur'an Recitation",
    day: "Fri & Sat",
    time: "09:00 AM",
    endTime: "11:00 AM",
    book: "Tuhfat Al-Atfal",
    bookImage: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=200&h=280&fit=crop",
    tutor: "Hafiz Musa Ibrahim",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Tajweed Certified Instructor",
    description: "Professional tajweed training with certification pathway for serious students.",
    type: "private",
    format: "In-Person",
    capacity: 8,
    enrolled: 6,
    level: "All Levels",
    intensity: "High",
    requirements: "Qur'an fluency helpful but not required.",
  },
  {
    id: "priv-majlis-6",
    title: "Islamic Studies Intensive Diploma",
    day: "Sunday",
    time: "10:00 AM",
    endTime: "02:00 PM",
    book: "Multiple Core Texts",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Dr. Umar Farooq",
    tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    tutorRole: "Islamic Studies Program Director",
    description: "Comprehensive 12-week intensive diploma program. Certificate upon completion.",
    type: "private",
    format: "In-Person",
    capacity: 25,
    enrolled: 20,
    level: "Diploma Level",
    intensity: "Very High",
    requirements: "Full commitment to all 12 weeks. Quizzes and final exam required.",
  },
];

export const getMajlis = () => {
  try {
    const stored = localStorage.getItem("ihyaus_majlis");
    return stored ? JSON.parse(stored) : defaultMajlis;
  } catch {
    return defaultMajlis;
  }
};

export const saveMajlis = (majlis) => {
  localStorage.setItem("ihyaus_majlis", JSON.stringify(majlis));
};

export const getMajlisByType = (type) => {
  const majlis = getMajlis();
  return majlis.filter((m) => m.type === type);
};

export const getMajlisById = (id) => {
  const majlis = getMajlis();
  return majlis.find((m) => m.id === id);
};

export const addMajlis = (newMajlis) => {
  const majlis = getMajlis();
  const withId = {
    ...newMajlis,
    id: `majlis-${Date.now()}`,
  };
  majlis.push(withId);
  saveMajlis(majlis);
  return withId;
};

export const updateMajlis = (id, updates) => {
  const majlis = getMajlis();
  const index = majlis.findIndex((m) => m.id === id);
  if (index !== -1) {
    majlis[index] = { ...majlis[index], ...updates };
    saveMajlis(majlis);
    return majlis[index];
  }
  return null;
};

export const deleteMajlis = (id) => {
  const majlis = getMajlis();
  const filtered = majlis.filter((m) => m.id !== id);
  saveMajlis(filtered);
  return filtered;
};

export const updateMajlisEnrollment = (id, delta) => {
  const majlis = getMajlis();
  const index = majlis.findIndex((m) => m.id === id);
  if (index !== -1) {
    const newEnrolled = Math.max(0, Math.min(majlis[index].capacity, majlis[index].enrolled + delta));
    majlis[index].enrolled = newEnrolled;
    saveMajlis(majlis);
    return majlis[index];
  }
  return null;
};
