import { useState } from "react"
import {
  FaBookOpen,
  FaClock,
  FaUserGraduate,
  FaCalendarAlt,
  FaPlayCircle,
  FaTelegramPlane,
  FaFacebookF,
  FaYoutube,
  FaChalkboardTeacher,
  FaMosque,
  FaUsers,
  FaRegBell,
  FaDownload,
  FaRegCalendarCheck,
  FaExternalLinkAlt,
  FaStar,
  FaRegClock,
  FaUserTie,
} from "react-icons/fa"
import { IoMdPeople } from "react-icons/io"
import { GiBookCover, GiOpenBook } from "react-icons/gi"

const tabs = [
  {
    id: "public-majlis",
    label: "Public Majlis",
    badge: "Free",
  },
  {
    id: "private-majlis",
    label: "Private Majlis",
    badge: "Structured",
  },
  {
    id: "public-lectures",
    label: "Public Lectures",
    badge: "Events",
  },
]

const publicMajlis = [
  {
    title: "Fajr Reminder Circle",
    day: "Daily (Mon-Thu)",
    time: "After Fajr (6:00 AM)",
    book: "Selected Ahadith",
    bookImage: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200&h=280&fit=crop",
    tutor: "Ustadh Ahmad Tijani",
    tutorImage: "https://images.unsplash.com/photo-1583195764036-6dc248ac07b9?w=150&h=150&fit=crop",
    tutorRole: "Senior Islamic Scholar",
    description:
      "Morning reminder circle with Qur'an recitation and selected Ahadith for spiritual development.",
  },
  {
    title: "Weekly Tafsir Session",
    day: "Saturday",
    time: "10:00 AM - 12:00 PM",
    book: "Tafsir Ibn Kathir",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Dr. Umar Farooq",
    tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    tutorRole: "Professor of Qur'anic Studies",
    description:
      "Detailed explanation of Qur'anic verses with practical lessons and reflections.",
  },
  {
    title: "Seerah Study Circle",
    day: "Sunday",
    time: "4:00 PM - 6:00 PM",
    book: "Ar-Raheeq Al-Makhtum",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Sheikh Abdulrazzak",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Hadith Specialist",
    description:
      "Exploring the life of the Prophet ﷺ and extracting timeless guidance.",
  },
  {
    title: "Evening Dhikr Gathering",
    day: "Daily",
    time: "After Maghrib",
    book: "Qur'an & Adhkar",
    bookImage: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=200&h=280&fit=crop",
    tutor: "Hafiz Musa Ibrahim",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Qur'an Memorization Coach",
    description:
      "A peaceful gathering for Qur'an recitation, adhkar and reminders.",
  },
  {
    title: "Women's Weekly Circle",
    day: "Wednesday",
    time: "3:00 PM - 5:00 PM",
    book: "Riyad-us-Saliheen",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Ustadha Fatima",
    tutorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    tutorRole: "Women's Education Director",
    description:
      "Dedicated weekly learning session for sisters focused on purification and character.",
  },
]

const privateMajlis = [
  {
    title: "Advanced Arabic Grammar",
    day: "Mon & Wed",
    time: "6:00 PM - 7:30 PM",
    book: "Al-Ajurrumiyyah",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Ustadh Ahmad Tijani",
    tutorImage: "https://images.unsplash.com/photo-1583195764036-6dc248ac07b9?w=150&h=150&fit=crop",
    tutorRole: "Arabic Language Expert",
    fee: "₦25,000",
    capacity: "15 Students",
    level: "Intermediate",
  },
  {
    title: "Qur'an Tahfeez (Hifz)",
    day: "Daily (Sat-Thu)",
    time: "5:00 AM - 7:00 AM",
    book: "Qur'an Al-Kareem",
    bookImage: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=200&h=280&fit=crop",
    tutor: "Hafiz Musa Ibrahim",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Certified Hifz Teacher",
    fee: "₦30,000",
    capacity: "10 Students",
    level: "All Levels",
  },
  {
    title: "Hadith Sciences",
    day: "Tuesday",
    time: "7:00 PM - 9:00 PM",
    book: "Al-Arba'un Nawawiyyah",
    bookImage: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=200&h=280&fit=crop",
    tutor: "Dr. Umar Farooq",
    tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    tutorRole: "Hadith Sciences Professor",
    fee: "₦20,000",
    capacity: "12 Students",
    level: "Advanced",
  },
  {
    title: "Fiqh for Daily Life",
    day: "Thursday",
    time: "6:00 PM - 8:00 PM",
    book: "Fiqh As-Sunnah",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Sheikh Abdulrazzak",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Fiqh Consultant",
    fee: "₦25,000",
    capacity: "20 Students",
    level: "Beginner-Intermediate",
  },
  {
    title: "Tajweed Masterclass",
    day: "Fri & Sat",
    time: "9:00 AM - 11:00 AM",
    book: "Tuhfat Al-Atfal",
    bookImage: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=200&h=280&fit=crop",
    tutor: "Hafiz Musa Ibrahim",
    tutorImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    tutorRole: "Tajweed Certified Instructor",
    fee: "₦15,000",
    capacity: "8 Students",
    level: "All Levels",
  },
  {
    title: "Islamic Studies Diploma",
    day: "Sunday",
    time: "10:00 AM - 2:00 PM",
    book: "Multiple Texts",
    bookImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
    tutor: "Dr. Umar Farooq",
    tutorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    tutorRole: "Islamic Studies Program Director",
    fee: "₦50,000",
    capacity: "25 Students",
    level: "Diploma Level",
  },
]

const lectures = [
  {
    title: "The Importance of Sincerity",
    day: "March 15",
    time: "After Maghrib",
    topic: "Qur'an & Sunnah",
    speaker: "Sheikh Abdulrazzak",
    speakerImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1599837565318-67429bde7162?w=400&h=250&fit=crop",
    duration: "45 mins",
  },
  {
    title: "Tafseer of Surah Al-Asr",
    day: "March 10",
    time: "After Isha",
    topic: "Qur'an",
    speaker: "Dr. Umar Farooq",
    speakerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=250&fit=crop",
    duration: "60 mins",
  },
  {
    title: "Rights of Neighbors",
    day: "March 5",
    time: "After Asr",
    topic: "Ahadith",
    speaker: "Ustadh Ahmad Tijani",
    speakerImage: "https://images.unsplash.com/photo-1583195764036-6dc248ac07b9?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=400&h=250&fit=crop",
    duration: "30 mins",
  },
  {
    title: "Purification of Heart",
    day: "Feb 28",
    time: "After Fajr",
    topic: "Islamic Spirituality",
    speaker: "Hafiz Musa Ibrahim",
    speakerImage: "https://images.unsplash.com/photo-1603415526960-f7eab8c49601?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop",
    duration: "50 mins",
  },
  {
    title: "Life of Prophet ﷺ",
    day: "Last Sunday",
    time: "4:00 PM",
    topic: "Seerah",
    speaker: "Guest Speaker",
    speakerImage: "https://images.unsplash.com/photo-1583195764036-6dc248ac07b9?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1609599006353-6290aa7e9fe3?w=400&h=250&fit=crop",
    duration: "90 mins",
  },
]

const LecturesPage = () => {
  const [activeTab, setActiveTab] = useState("public-majlis")

  return (
    <div className="bg-cream overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-black/70" />

        <div className="container-custom relative z-10 py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md mb-8">
              <FaMosque className="text-gold" />
              Knowledge • Reminder • Community
            </span>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-8">
              Majlis & <span className="text-gold">Lectures</span>
            </h1>

            <p
              className="font-arabic text-3xl md:text-5xl text-gold leading-loose mb-6"
              dir="rtl"
            >
              طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
            </p>

            <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-3xl mb-10">
              “Seeking knowledge is an obligation upon every Muslim.”
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#majlis" className="btn-primary">
                Explore Programs
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                className="btn-outline"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      <section className="relative -mt-12 z-20">
        <div className="container-custom">
          <div className="glass-card rounded-3xl p-6 flex flex-wrap justify-center gap-5 shadow-premium">
            <a
              href="https://t.me/"
              target="_blank"
              className="flex items-center gap-3 bg-white/10 hover:bg-gold hover:text-primary text-white px-6 py-4 rounded-2xl transition-all duration-300 group"
            >
              <FaTelegramPlane size={20} className="group-hover:scale-110 transition-transform" />
              Telegram Channel
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              className="flex items-center gap-3 bg-white/10 hover:bg-gold hover:text-primary text-white px-6 py-4 rounded-2xl transition-all duration-300 group"
            >
              <FaFacebookF size={18} className="group-hover:scale-110 transition-transform" />
              Facebook Page
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              className="flex items-center gap-3 bg-white/10 hover:bg-gold hover:text-primary text-white px-6 py-4 rounded-2xl transition-all duration-300 group"
            >
              <FaYoutube size={20} className="group-hover:scale-110 transition-transform" />
              YouTube Lectures
            </a>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section id="majlis" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-subtitle">
              Educational Gatherings
            </span>

            <h2 className="section-title">
              Structured Learning Opportunities
            </h2>

            <p className="section-description max-w-3xl mx-auto">
              Join our public gatherings, private classes, and special
              educational events designed to strengthen Islamic knowledge,
              spirituality, and community engagement.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mb-14">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-5 rounded-2xl transition-all duration-300 border flex items-center gap-3 ${
                  activeTab === tab.id
                    ? "bg-primary text-white border-primary shadow-premium scale-105"
                    : "bg-white border-gray-200 hover:border-gold hover:-translate-y-1"
                }`}
              >
                {tab.id === "public-majlis" && <IoMdPeople size={24} />}
                {tab.id === "private-majlis" && <FaChalkboardTeacher size={24} />}
                {tab.id === "public-lectures" && <FaPlayCircle size={24} />}
                <div>
                  <div className="font-bold text-lg">{tab.label}</div>
                  <div
                    className={`text-sm mt-1 ${
                      activeTab === tab.id
                        ? "text-gold"
                        : "text-secondary"
                    }`}
                  >
                    {tab.badge}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* PUBLIC MAJLIS */}
          {activeTab === "public-majlis" && (
            <div className="space-y-8">
              {publicMajlis.map((item, index) => (
                <div
                  key={index}
                  className="card overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-[280px_1fr]">
                    {/* Book Image Area */}
                    <div className="relative bg-gradient-to-br from-primary/90 to-primary/70 p-6 flex flex-col items-center justify-center gap-4">
                      <div className="w-40 h-48 rounded-xl overflow-hidden shadow-xl ring-2 ring-gold/30">
                        <img 
                          src={item.bookImage} 
                          alt={item.book}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white/80 text-xs uppercase tracking-wider">Featured Book</p>
                        <p className="text-gold font-semibold text-sm">{item.book}</p>
                      </div>
                      <GiBookCover className="absolute bottom-4 right-4 text-white/10 text-6xl" />
                    </div>

                    <div className="p-8">
                      <div className="flex flex-wrap items-start justify-between gap-5 mb-6">
                        <div>
                          <h3 className="text-3xl font-heading font-bold text-primary mb-3">
                            {item.title}
                          </h3>

                          <div className="flex flex-wrap gap-5 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-secondary" />
                              {item.day}
                            </div>

                            <div className="flex items-center gap-2">
                              <FaClock className="text-secondary" />
                              {item.time}
                            </div>
                          </div>
                        </div>

                        <div className="bg-secondary/10 text-secondary px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                          <FaUsers size={14} />
                          Open To Everyone
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5 mb-6">
                        {/* Tutor Section with Image */}
                        <div className="bg-cream rounded-2xl p-5 flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gold">
                            <img 
                              src={item.tutorImage} 
                              alt={item.tutor}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Tutor</p>
                            <p className="font-semibold text-primary">{item.tutor}</p>
                            <p className="text-xs text-gray-400">{item.tutorRole}</p>
                          </div>
                        </div>

                        <div className="bg-cream rounded-2xl p-5">
                          <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                            <GiOpenBook className="text-secondary" />
                            Course Material
                          </p>
                          <p className="font-semibold text-primary">{item.book}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-8">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <button className="btn-primary flex items-center gap-2">
                          <FaPlayCircle size={16} />
                          Join Online
                        </button>

                        <button className="btn-dark-outline flex items-center gap-2">
                          <FaRegBell size={16} />
                          Get Reminder
                        </button>

                        <button className="btn-dark-outline flex items-center gap-2">
                          <FaDownload size={16} />
                          Download Materials
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRIVATE MAJLIS */}
          {activeTab === "private-majlis" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {privateMajlis.map((item, index) => (
                <div
                  key={index}
                  className="card p-8 group hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="flex gap-5 mb-6">
                    {/* Book Image */}
                    <div className="w-24 h-28 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                      <img 
                        src={item.bookImage} 
                        alt={item.book}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <FaCalendarAlt className="text-secondary" />
                            {item.day}
                          </div>
                        </div>
                        <div className="bg-gold/20 text-primary font-bold px-4 py-2 rounded-full text-sm">
                          {item.fee}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaRegClock className="text-secondary" />
                      <span>{item.time}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <GiBookCover className="text-secondary" />
                      <span>{item.book}</span>
                    </div>

                    {/* Tutor with image */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={item.tutorImage} alt={item.tutor} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-gray-600">{item.tutor}</span>
                        <p className="text-xs text-gray-400">{item.tutorRole}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <FaStar className="text-secondary" />
                      <span>Level: {item.level}</span>
                    </div>
                  </div>

                  <div className="bg-cream rounded-2xl p-5 mb-8">
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                      <FaUsers className="text-secondary" />
                      Capacity & Enrollment
                    </p>
                    <p className="text-primary font-bold text-lg">
                      {item.capacity} • Limited Slots
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                      <FaRegCalendarCheck size={16} />
                      Register
                    </button>

                    <button className="btn-dark-outline flex-1 flex items-center justify-center gap-2">
                      <FaExternalLinkAlt size={14} />
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PUBLIC LECTURES */}
          {activeTab === "public-lectures" && (
            <div className="space-y-8">
              {lectures.map((lecture, index) => (
                <div
                  key={index}
                  className="card overflow-hidden hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="grid md:grid-cols-[280px_1fr]">
                    {/* Thumbnail */}
                    <div className="relative h-48 md:h-full bg-primary">
                      <img 
                        src={lecture.thumbnail} 
                        alt={lecture.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur flex items-center justify-center">
                          <FaPlayCircle className="text-gold text-4xl" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {lecture.duration}
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="mb-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold">
                            <img src={lecture.speakerImage} alt={lecture.speaker} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-heading font-bold text-primary">
                              {lecture.title}
                            </h3>
                            <p className="text-gray-500 text-sm flex items-center gap-2">
                              <FaUserTie className="text-secondary" />
                              {lecture.speaker}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-5 text-sm text-gray-600 mt-4">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-secondary" />
                            {lecture.day}
                          </div>

                          <div className="flex items-center gap-2">
                            <FaClock className="text-secondary" />
                            {lecture.time}
                          </div>

                          <div className="flex items-center gap-2">
                            <GiOpenBook className="text-secondary" />
                            {lecture.topic}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-6">
                        <button className="btn-primary flex items-center gap-2">
                          <FaPlayCircle size={16} />
                          Watch Lecture
                        </button>

                        <button className="btn-dark-outline flex items-center gap-2">
                          <FaRegBell size={16} />
                          Get Reminder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="section-subtitle text-gold">
              Join The Journey Of Knowledge
            </span>

            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-8">
              Learn, Grow &
              <span className="text-gold"> Connect</span>
            </h2>

            <p className="text-white/80 text-xl leading-relaxed mb-10">
              Become part of a thriving community dedicated to seeking
              authentic Islamic knowledge and benefiting humanity.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              <button className="btn-primary">
                Register For Classes
              </button>

              <button className="btn-outline">
                Contact Administration
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LecturesPage