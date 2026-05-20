// seed-programs.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb+srv://ihyus-sunnah-db:Ihyau366!@cluster0.cvbn5ff.mongodb.net/Cluster0';

const dbName = 'Ihyaus_Sunnah';

const programs = [
  {
    id: 1,
    title: "Full-Time Tahfeez Program",
    slug: "full-time-tahfeez-program",
    category: "Tahfeez",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=1200&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=2000&auto=format&fit=crop",
    overviewImage: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=1200&auto=format&fit=crop",
    tagline: "Nurturing future Huffaz with discipline and sincerity.",
    shortDescription: "Structured Qur'an memorization program with supervision and revision system.",
    fullDescription: "The Full-Time Tahfeez Program is designed to help students memorize the Noble Qur'an through structured daily lessons, revision systems, spiritual mentorship, and academic discipline under qualified teachers.",
    instructor: "Hafiz Abdullah Musa",
    duration: "3 Years",
    schedule: {
      days: "Saturday - Thursday",
      time: "After Fajr & Evening Sessions",
      dailyStructure: [
        { time: "8:00 - 8:30", activity: "Morning Adhkar & Assembly" },
        { time: "8:30 - 10:00", activity: "New Memorization (Hifdh)" },
        { time: "10:00 - 10:30", activity: "Break" },
        { time: "10:30 - 12:00", activity: "Revision (Muraja'ah)" },
        { time: "12:00 - 1:00", activity: "Lunch & Dhuhr Prayer" },
        { time: "1:00 - 2:00", activity: "Tajweed Theory & Practice" }
      ]
    },
    location: "Ihyaus Sunnah Foundation, Magume Zaria",
    sections: ["Memorization", "Revision", "Tajweed"],
    features: [
      "Daily memorization sessions",
      "Weekly revision assessments",
      "Tajweed improvement",
      "Character development"
    ],
    objectives: [
      "Memorize the Qur'an completely",
      "Develop strong tajweed",
      "Build discipline and consistency"
    ],
    stats: {
      totalStudents: 120,
      totalStaff: 12,
      yearsRunning: 8
    },
    categories: [
      {
        id: 1,
        title: "Beginner Level",
        titleArabic: "المستوى المبتدئ",
        ageRange: "7 - 12 Years",
        categoryType: "Memorization",
        totalClasses: 24,
        description: "Qa'idah and Juz Amma memorization with basic Tajweed rules.",
        prerequisites: "Basic Arabic reading skills",
        previewVideos: [
          {
            thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=400&auto=format&fit=crop",
            title: "Introduction to Memorization",
            duration: "12:45",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=400&auto=format&fit=crop",
            title: "Tajweed Basics",
            duration: "18:20",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=400&auto=format&fit=crop",
            title: "Daily Routine Tips",
            duration: "15:30",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ],
        outcomes: [
          "Complete memorization of Juz Amma",
          "Basic Tajweed application",
          "Daily memorization habits"
        ]
      },
      {
        id: 2,
        title: "Intermediate Level",
        titleArabic: "المستوى المتوسط",
        ageRange: "10 - 15 Years",
        categoryType: "Memorization",
        totalClasses: 36,
        description: "Building memorization stamina with longer Surahs and advanced Tajweed.",
        prerequisites: "Complete Juz Amma memorization",
        previewVideos: [
          {
            thumbnail: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=400&auto=format&fit=crop",
            title: "Advanced Memorization Techniques",
            duration: "20:15",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop",
            title: "Revision Mastery",
            duration: "16:45",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            title: "Student Success Stories",
            duration: "14:20",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ],
        outcomes: [
          "Memorization of Juz Tabarak to Juz 15",
          "Advanced Tajweed mastery",
          "Revision system development"
        ]
      }
    ],
    staffHighlights: [
      {
        staffId: 3,
        role: "Tahfeez Supervisor",
        categoryFocus: "Memorization & Tajweed"
      }
    ],
    testimonials: [
      {
        name: "Abu Muhammad",
        quote: "My son completed memorizing 15 Juz in just 2 years. The structured approach really works."
      },
      {
        name: "Umm Khadija",
        quote: "The teachers are incredibly dedicated. They don't just teach memorization but also instill love for the Qur'an."
      }
    ],
    verse: {
      arabic: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ",
      translation: "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?",
      reference: "Surah Al-Qamar 54:17"
    },
    gallery: [
      "https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    ],
    startDate: "2026-01-10",
    endDate: "2028-12-20",
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Weekend Islamiyyah Classes",
    slug: "weekend-islamiyyah-classes",
    category: "Islamiyyah",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop",
    overviewImage: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=1200&auto=format&fit=crop",
    tagline: "Comprehensive Islamic knowledge for the next generation.",
    shortDescription: "Weekend Islamic education program for children and adults.",
    fullDescription: [
      "Our Islamiyyah Education program provides students with a solid foundation in authentic Islamic knowledge. Through structured learning, students develop a deep understanding of their faith, rooted in the Qur'an and Sunnah as understood by the righteous predecessors.",
      "The curriculum covers essential subjects including Aqeedah (Islamic creed), Fiqh (Jurisprudence), Hadith studies, Tafsir (Qur'anic exegesis), and the study of classical Islamic texts. Students learn from qualified teachers who emphasize proper understanding and practical application of knowledge."
    ],
    instructor: "Ustadh Ibrahim Tijani",
    duration: "Ongoing",
    schedule: {
      days: "Weekends",
      time: "8:00AM - 1:00PM",
      dailyStructure: [
        { time: "8:00 - 8:30", activity: "Morning Adhkar & Assembly" },
        { time: "8:30 - 10:00", activity: "Aqeedah & Fiqh Studies" },
        { time: "10:00 - 10:30", activity: "Break" },
        { time: "10:30 - 12:00", activity: "Hadith & Tafsir" },
        { time: "12:00 - 1:00", activity: "Lunch & Dhuhr Prayer" },
        { time: "1:00 - 2:00", activity: "Arabic Language & Review" }
      ]
    },
    location: "Islamiyyah Section, Ihyaus Sunnah Foundation",
    sections: ["Fiqh", "Hadith", "Arabic"],
    features: [
      "Qualified instructors",
      "Structured curriculum",
      "Practical Islamic training"
    ],
    objectives: [
      "Strengthen Islamic understanding",
      "Teach moral discipline",
      "Develop Qur'an literacy"
    ],
    stats: {
      totalStudents: 150,
      totalStaff: 10,
      yearsRunning: 6
    },
    categories: [
      {
        id: 3,
        title: "Beginner Level",
        titleArabic: "المستوى المبتدئ",
        ageRange: "7 - 12 Years",
        categoryType: "Foundation",
        totalClasses: 24,
        description: "Foundational beliefs and basic rulings of worship",
        prerequisites: "Basic Arabic reading",
        previewVideos: [
          {
            thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=400&auto=format&fit=crop",
            title: "Islamic Basics for Kids",
            duration: "14:20",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=400&auto=format&fit=crop",
            title: "Understanding Aqeedah",
            duration: "17:50",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop",
            title: "Prayer Guide for Beginners",
            duration: "13:15",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ],
        outcomes: [
          "Basic Aqeedah understanding",
          "Prayer and worship knowledge",
          "Arabic reading improvement"
        ]
      },
      {
        id: 4,
        title: "Intermediate Level",
        titleArabic: "المستوى المتوسط",
        ageRange: "10 - 15 Years",
        categoryType: "Advanced",
        totalClasses: 36,
        description: "Study of selected Hadith and Qur'anic commentary",
        prerequisites: "Complete beginner level",
        previewVideos: [
          {
            thumbnail: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=400&auto=format&fit=crop",
            title: "Hadith Studies Explained",
            duration: "19:45",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            title: "Tafsir Exploration",
            duration: "21:30",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400&auto=format&fit=crop",
            title: "Islamic Jurisprudence",
            duration: "18:10",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        ],
        outcomes: [
          "Hadith memorization and understanding",
          "Tafsir comprehension",
          "Fiqh application"
        ]
      }
    ],
    staffHighlights: [
      {
        staffId: 2,
        role: "Head of Islamic Studies",
        categoryFocus: "Aqeedah & Fiqh"
      }
    ],
    testimonials: [
      {
        name: "Abu Bakr",
        quote: "This program has given my children a strong foundation in their deen. The teachers are knowledgeable and caring."
      },
      {
        name: "Umm Aisha",
        quote: "I've seen remarkable growth in my daughter's understanding of Islam. She now practices with knowledge and confidence."
      }
    ],
    verse: {
      arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
      translation: "Allah will raise those who have believed among you and those who were given knowledge, by degrees.",
      reference: "Surah Al-Mujadila 58:11"
    },
    gallery: [
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    ],
    startDate: "2026-02-01",
    endDate: "",
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "Youth Development & Leadership",
    slug: "youth-development-leadership",
    category: "Youth Development",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
    overviewImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    tagline: "Mentorship and leadership training for Muslim youth.",
    shortDescription: "Mentorship and leadership training for Muslim youth.",
    fullDescription: "This program equips Muslim youth with leadership skills, discipline, communication ability, and Islamic identity development through mentorship and workshops.",
    instructor: "Ustadh Musa Aliyu",
    duration: "6 Months",
    schedule: {
      days: "Every Sunday",
      time: "10:00AM - 2:00PM",
      dailyStructure: [
        { time: "10:00 - 10:30", activity: "Opening & Motivation" },
        { time: "10:30 - 12:00", activity: "Leadership Workshops" },
        { time: "12:00 - 1:00", activity: "Lunch & Prayer" },
        { time: "1:00 - 2:00", activity: "Mentorship Sessions" }
      ]
    },
    location: "Community Hall, Ihyaus Sunnah Foundation",
    sections: ["Leadership", "Mentorship", "Community Service"],
    features: [
      "Leadership workshops",
      "Mentorship sessions",
      "Community engagement"
    ],
    objectives: [
      "Raise responsible Muslim youth",
      "Improve leadership capacity",
      "Promote community service"
    ],
    stats: {
      totalStudents: 80,
      totalStaff: 6,
      yearsRunning: 5
    },
    categories: [
      {
        id: 5,
        title: "Leadership Training",
        titleArabic: "تدريب القيادة",
        ageRange: "13 - 18 Years",
        categoryType: "Development",
        totalClasses: 12,
        description: "Developing leadership skills and Islamic character",
        prerequisites: "Basic Islamic knowledge",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop", caption: "Youth leadership workshop" }
        ],
        outcomes: [
          "Leadership skills development",
          "Public speaking confidence",
          "Islamic character building"
        ]
      },
      {
        id: 6,
        title: "Community Service",
        titleArabic: "الخدمة المجتمعية",
        ageRange: "13 - 18 Years",
        categoryType: "Service",
        totalClasses: 8,
        description: "Practical community service and social responsibility",
        prerequisites: "Leadership training completion",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400&auto=format&fit=crop", caption: "Community service project" }
        ],
        outcomes: [
          "Community service experience",
          "Social responsibility awareness",
          "Teamwork and collaboration"
        ]
      }
    ],
    staffHighlights: [
      {
        staffId: 1,
        role: "Youth Program Coordinator",
        categoryFocus: "Leadership & Development"
      }
    ],
    testimonials: [
      {
        name: "Fatima",
        quote: "This program helped me discover my leadership potential and strengthened my connection to my faith."
      },
      {
        name: "Ahmed",
        quote: "The mentorship sessions were life-changing. I learned how to balance modern life with Islamic values."
      }
    ],
    verse: {
      arabic: "وَالْعَصْرِ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
      translation: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
      reference: "Surah Al-Asr 103:1-3"
    },
    gallery: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop"
    ],
    islamicIntegration: [
      "Islamic leadership principles",
      "Prophetic examples of leadership",
      "Community service in Islamic context",
      "Balancing dunya and akhirah priorities"
    ],
    startDate: "2026-03-15",
    endDate: "2026-09-15",
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: "Public Majlis Program",
    slug: "public-majlis-program",
    category: "Majlis",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
    overviewImage: "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=1200&auto=format&fit=crop",
    tagline: "Enlightening the community with authentic Islamic knowledge.",
    shortDescription: "Public Islamic lectures and private advanced studies for serious seekers.",
    fullDescription: [
      "The Public Majlis Program serves the community through various Islamic educational initiatives. We offer public sessions open to all community members, covering essential Islamic sciences, and private advanced classes for dedicated students seeking deeper knowledge.",
      "Our program combines community outreach with specialized education, ensuring that Islamic knowledge reaches all segments of society while providing advanced training for those committed to scholarly pursuits."
    ],
    instructor: "Sheikh Umar Farooq",
    duration: "Ongoing",
    schedule: {
      days: "Various (Public sessions weekly, Private classes ongoing)",
      time: "Evening sessions for public, Flexible for private",
      dailyStructure: [
        { time: "Public Sessions", activity: "Weekly Majlis - Tafseer, Hadith, Aqeedah" },
        { time: "Private Classes", activity: "Ilmul Hadith, Qawa'idul Fiqhiyyah, Lughah, Usulul Tafseer" },
        { time: "Special Lectures", activity: "Monthly, event-based, and response lectures" },
        { time: "Media Library", activity: "Audio, Video, PDF uploads organized by category" }
      ]
    },
    location: "Majlis Hall, Ihyaus Sunnah Foundation",
    sections: ["Ulumul Ghayah (Public)", "Ulumul Aalah (Private)", "Special Lectures", "Media Library"],
    features: [
      "Public community sessions",
      "Private advanced studies",
      "Special event lectures",
      "Organized media library",
      "Student research showcase"
    ],
    objectives: [
      "Spread authentic Islamic knowledge",
      "Provide advanced Islamic education",
      "Address contemporary issues",
      "Preserve Islamic scholarship"
    ],
    stats: {
      totalStudents: 300,
      totalStaff: 8,
      yearsRunning: 10
    },
    categories: [
      {
        id: 7,
        title: "Ulumul Ghayah (Public Sessions)",
        titleArabic: "علم الغاية",
        ageRange: "All Ages",
        categoryType: "Public",
        totalClasses: 52,
        description: "Weekly public sessions covering Tafseer, Hadith, and Aqeedah for the entire community.",
        prerequisites: "None - Open to all",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", caption: "Public Majlis session" }
        ],
        outcomes: [
          "Understanding of Quranic exegesis",
          "Knowledge of authentic Hadith",
          "Strengthened Islamic creed",
          "Community engagement"
        ]
      },
      {
        id: 8,
        title: "Ulumul Aalah (Private Classes)",
        titleArabic: "علم العلة",
        ageRange: "18+ Years",
        categoryType: "Private",
        totalClasses: 48,
        description: "Advanced private classes covering Ilmul Hadith, Qawa'idul Fiqhiyyah, Lughah, and Usulul Tafseer for serious students.",
        prerequisites: "Basic Islamic knowledge and commitment",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&auto=format&fit=crop", caption: "Advanced Islamic studies" }
        ],
        outcomes: [
          "Advanced Hadith sciences",
          "Fiqh principles and methodology",
          "Arabic language mastery",
          "Tafseer methodology",
          "Scholarly research skills"
        ]
      },
      {
        id: 9,
        title: "Special Lectures",
        titleArabic: "محاضرات خاصة",
        ageRange: "All Ages",
        categoryType: "Events",
        totalClasses: 12,
        description: "Monthly, event-based, and response lectures addressing contemporary issues and serious matters.",
        prerequisites: "None",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop", caption: "Special lecture event" }
        ],
        outcomes: [
          "Understanding contemporary issues",
          "Islamic perspectives on current events",
          "Community guidance",
          "Knowledge application"
        ]
      }
    ],
    staffHighlights: [
      {
        staffId: 4,
        role: "Majlis Coordinator",
        categoryFocus: "Public Education"
      },
      {
        staffId: 2,
        role: "Advanced Studies Instructor",
        categoryFocus: "Private Classes"
      }
    ],
    testimonials: [
      {
        name: "Amina",
        quote: "The Public Majlis sessions have deepened my understanding of Islam and brought our community closer together."
      },
      {
        name: "Ibrahim",
        quote: "The private classes in Ulumul Aalah opened doors to advanced Islamic knowledge I never thought possible."
      }
    ],
    verse: {
      arabic: "قُلْ هَذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ عَلَى بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي وَسُبْحَانَ اللَّهِ وَمَا أَنَا مِنَ الْمُشْرِكِينَ",
      translation: "Say, 'This is my way; I invite to Allah with insight, I and those who follow me. And exalted is Allah; and I am not of those who associate.'",
      reference: "Surah Yusuf 12:108"
    },
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop"
    ],
    startDate: "2016-01-01",
    endDate: null,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    title: "Western Education Program",
    slug: "western-education-program",
    category: "Western Education",
    status: "active",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
    overviewImage: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=1200&auto=format&fit=crop",
    tagline: "Excellence in both worldly and religious education.",
    shortDescription: "Comprehensive Western education integrated with Islamic values.",
    fullDescription: [
      "Our Western Education Program provides students with a strong foundation in academic subjects while nurturing their Islamic identity and character. The program combines rigorous academic curriculum with Islamic education, ensuring students excel in both worldly knowledge and spiritual development.",
      "From nursery through secondary school, students receive quality education in mathematics, sciences, languages, and humanities, all taught within an Islamic framework that emphasizes moral character, discipline, and service to humanity."
    ],
    instructor: "Mrs. Aisha Muhammad",
    duration: "12 Years",
    schedule: {
      days: "Monday - Friday",
      time: "8:00 AM - 1:00 PM",
      dailyStructure: [
        { time: "8:00 - 8:30", activity: "Morning Assembly & Islamic Studies" },
        { time: "8:30 - 10:00", activity: "Core Academic Subjects" },
        { time: "10:00 - 10:30", activity: "Break & Dhuhr Prayer" },
        { time: "10:30 - 12:00", activity: "Specialized Subjects" },
        { time: "12:00 - 1:00", activity: "Islamic Integration & Activities" }
      ]
    },
    location: "Western Education Wing, Ihyaus Sunnah Foundation",
    sections: ["Primary Education", "Junior Secondary", "Senior Secondary"],
    features: [
      "Integrated Islamic curriculum",
      "Qualified teaching staff",
      "Modern educational facilities",
      "Character development focus",
      "Academic excellence"
    ],
    objectives: [
      "Academic excellence in all subjects",
      "Strong Islamic character development",
      "Preparation for higher education",
      "Balanced worldly and religious knowledge"
    ],
    stats: {
      totalStudents: 450,
      totalStaff: 25,
      yearsRunning: 7
    },
    categories: [
      {
        id: 10,
        title: "Basic Level (Nursery - Primary 5)",
        titleArabic: "المستوى الأساسي",
        ageRange: "4 - 11 Years",
        categoryType: "Primary",
        totalClasses: 60,
        description: "Foundation education covering nursery through Primary 5 with integrated Islamic studies.",
        prerequisites: "Age appropriate",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop", caption: "Primary classroom" }
        ],
        outcomes: [
          "Basic literacy and numeracy",
          "Islamic foundation knowledge",
          "Social skills development",
          "Creative thinking"
        ]
      },
      {
        id: 11,
        title: "Intermediate Level (JS 1-3)",
        titleArabic: "المستوى المتوسط",
        ageRange: "12 - 15 Years",
        categoryType: "Junior Secondary",
        totalClasses: 36,
        description: "Junior Secondary education with BECE preparation and advanced Islamic studies.",
        prerequisites: "Primary education completion",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=400&auto=format&fit=crop", caption: "Junior Secondary class" }
        ],
        outcomes: [
          "BECE qualification preparation",
          "Advanced Islamic knowledge",
          "Critical thinking skills",
          "Leadership development"
        ]
      },
      {
        id: 12,
        title: "Advanced Level (SS 1-3)",
        titleArabic: "المستوى المتقدم",
        ageRange: "16 - 19 Years",
        categoryType: "Senior Secondary",
        totalClasses: 36,
        description: "Senior Secondary education preparing for higher education and future careers.",
        prerequisites: "Junior Secondary completion",
        previewImages: [
          { url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400&auto=format&fit=crop", caption: "Senior Secondary studies" }
        ],
        outcomes: [
          "WAEC qualification preparation",
          "Career guidance",
          "Advanced Islamic scholarship",
          "University preparation",
          "Life skills development"
        ]
      }
    ],
    staffHighlights: [
      {
        staffId: 3,
        role: "Academic Coordinator",
        categoryFocus: "Curriculum Development"
      }
    ],
    testimonials: [
      {
        name: "Zainab",
        quote: "The integrated approach helped me excel academically while staying true to my Islamic values."
      },
      {
        name: "Yusuf",
        quote: "I received both worldly knowledge and spiritual guidance that prepared me for university and life."
      }
    ],
    islamicIntegration: [
      "Daily Islamic studies integration",
      "Character development programs",
      "Prayer and worship facilities",
      "Islamic ethics in all subjects",
      "Community service projects",
      "Prophetic examples in leadership",
      "Quranic values in daily life"
    ],
    verse: {
      arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنْ تَنْصُرُوا اللَّهَ يَنْصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ",
      translation: "O you who have believed, if you support Allah, He will support you and plant firmly your feet.",
      reference: "Surah Muhammad 47:7"
    },
    gallery: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607434472257-d25c5b65af0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586767206939-3c4e4b0b1b7e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop"
    ],
    startDate: "2019-09-01",
    endDate: null,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB successfully');
    
    const db = client.db(dbName);
    const collection = db.collection('programs');
    
    // Optional: Clear existing data
    const deleteResult = await collection.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing programs`);
    
    // Insert new programs
    const insertResult = await collection.insertMany(programs);
    console.log(`✅ Successfully inserted ${insertResult.insertedCount} programs`);
    
    // Verify insertion
    const count = await collection.countDocuments();
    console.log(`📊 Total programs in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the seed function
seedDatabase();