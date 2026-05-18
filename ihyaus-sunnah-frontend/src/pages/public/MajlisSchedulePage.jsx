import { useState } from "react";
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
  FaExternalLinkAlt,
  FaStar,
  FaRegClock,
  FaUserTie,
  FaLock,
  FaShieldAlt,
  FaTrophy,
} from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { GiBookCover, GiOpenBook } from "react-icons/gi";
import useMajlisAPI from "../../hooks/useMajlisAPI";
import useCompletedSeriesAPI from "../../hooks/useCompletedSeriesAPI";

const CompletedSeriesSection = () => {
  const { series: completedSeries, stats } = useCompletedSeriesAPI();

  return (
    <div className="space-y-12">
      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <FaTrophy className="text-3xl text-gold mx-auto mb-3" />
          <p className="text-2xl font-bold text-primary">{stats.totalSeries}</p>
          <p className="text-sm text-gray-600">Total Series Completed</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-200 rounded-2xl p-6 text-center">
          <GiBookCover className="text-3xl text-blue-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-blue-600">{stats.totalVolumes}</p>
          <p className="text-sm text-gray-600">Total Volumes</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-25 border border-green-200 rounded-2xl p-6 text-center">
          <FaUsers className="text-3xl text-green-600 mx-auto mb-3" />
          <p className="text-2xl font-bold text-green-600">{stats.totalParticipants}</p>
          <p className="text-sm text-gray-600">Students Benefited</p>
        </div>

        <div className="bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/30 rounded-2xl p-6 text-center">
          <FaStar className="text-3xl text-gold mx-auto mb-3" />
          <p className="text-2xl font-bold text-secondary">{stats.recentCompletions}</p>
          <p className="text-sm text-gray-600">Recent Completions</p>
        </div>
      </div>

      {/* Series Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {completedSeries.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-gold text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                ✓ Completed
              </div>
              <div className="absolute bottom-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                {item.category}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 mb-1">By {item.author}</p>

              <div className="grid grid-cols-2 gap-4 my-4 text-sm">
                <div className="bg-cream rounded-xl p-3 text-center">
                  <p className="text-primary font-bold">{item.totalVolumes}</p>
                  <p className="text-gray-600 text-xs">Volumes</p>
                </div>
                <div className="bg-cream rounded-xl p-3 text-center">
                  <p className="text-primary font-bold">{item.participants}</p>
                  <p className="text-gray-600 text-xs">Students</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-primary">{new Date(item.completionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-700">{item.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium text-gray-700">{item.instructor}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.highlights.slice(0, 2).map((highlight, index) => (
                  <span key={index} className="bg-gold/20 text-secondary text-xs px-3 py-1 rounded-full">
                    {highlight}
                  </span>
                ))}
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-2xl font-semibold transition-colors duration-300 flex items-center justify-center gap-2">
                <GiOpenBook size={16} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary/5 to-gold/5 rounded-3xl p-8 border border-primary/10">
        <FaMosque className="text-4xl text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-primary mb-4">Join Our Next Study Circle</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Be part of our next Islamic text completion. Our structured programs ensure deep understanding and lasting knowledge.
        </p>
        <button className="bg-gold hover:bg-gold/90 text-primary px-8 py-4 rounded-2xl font-bold transition-colors duration-300">
          Explore Current Programs
        </button>
      </div>
    </div>
  );
};

const MajlisSchedulePage = () => {
  const [activeTab, setActiveTab] = useState("public-majlis");
  const { publicMajlis, privateMajlis } = useMajlisAPI();

  const tabs = [
    {
      id: "public-majlis",
      label: "Public Majlis",
      badge: "Free",
      icon: IoMdPeople,
    },
    {
      id: "private-majlis",
      label: "Private Classes",
      badge: "Serious Students",
      icon: FaChalkboardTeacher,
    },
  ];

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
              Majlis <span className="text-gold">Schedule</span>
            </h1>

            <p
              className="font-arabic text-3xl md:text-5xl text-gold leading-loose mb-6"
              dir="rtl"
            >
              طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
            </p>

            <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-3xl mb-10">
              "Seeking knowledge is an obligation upon every Muslim." All our programs are completely FREE to attend.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#majlis" className="btn-primary">
                Explore Programs
              </a>

              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="btn-outline">
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
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 hover:bg-gold hover:text-primary text-white px-6 py-4 rounded-2xl transition-all duration-300 group"
            >
              <FaTelegramPlane size={20} className="group-hover:scale-110 transition-transform" />
              Telegram Channel
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/10 hover:bg-gold hover:text-primary text-white px-6 py-4 rounded-2xl transition-all duration-300 group"
            >
              <FaFacebookF size={18} className="group-hover:scale-110 transition-transform" />
              Facebook Page
            </a>

            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
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
            <span className="section-subtitle">Educational Gatherings</span>

            <h2 className="section-title">Majlis Schedule & Programs</h2>

            <p className="section-description max-w-3xl mx-auto">
              Join our free public gatherings and structured private classes for serious students. All programs are designed to strengthen Islamic knowledge and community engagement.
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
                <tab.icon size={24} />
                <div>
                  <div className="font-bold text-lg">{tab.label}</div>
                  <div
                    className={`text-sm mt-1 ${
                      activeTab === tab.id ? "text-gold" : "text-secondary"
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
              {publicMajlis && publicMajlis.length > 0 ? (
                publicMajlis.map((item) => (
                  <div
                    key={item.id}
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
                                {item.time} - {item.endTime}
                              </div>

                              <div className="flex items-center gap-2">
                                <FaUsers className="text-secondary" />
                                {item.enrolled}/{item.capacity} Joined
                              </div>
                            </div>
                          </div>

                          <div className="bg-gold text-primary px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <FaStar size={14} />
                            FREE
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
                              <p className="text-sm text-gray-500 mb-1">Instructor</p>
                              <p className="font-semibold text-primary">{item.tutor}</p>
                              <p className="text-xs text-gray-400">{item.tutorRole}</p>
                            </div>
                          </div>

                          <div className="bg-cream rounded-2xl p-5">
                            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                              <GiOpenBook className="text-secondary" />
                              Format & Level
                            </p>
                            <p className="font-semibold text-primary">{item.format}</p>
                            <p className="text-xs text-gray-400">{item.level}</p>
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
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No public majlis scheduled yet.</p>
                </div>
              )}
            </div>
          )}

          {/* PRIVATE MAJLIS */}
          {activeTab === "private-majlis" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/20 rounded-3xl p-8 flex items-start gap-4">
                <FaShieldAlt className="text-primary text-3xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">For Serious & Committed Students</h3>
                  <p className="text-gray-700">
                    Our private classes are designed for students committed to advanced Islamic studies. These programs require dedication, regular attendance, and completion of coursework.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {privateMajlis && privateMajlis.length > 0 ? (
                  privateMajlis.map((item) => (
                    <div
                      key={item.id}
                      className="card p-8 group hover:-translate-y-2 transition-all duration-500 border-2 border-primary/20 hover:border-gold"
                    >
                      <div className="flex gap-5 mb-6">
                        {/* Book Image */}
                        <div className="w-24 h-32 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                          <img
                            src={item.bookImage}
                            alt={item.book}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                            {item.title}
                          </h3>
                          <div className="bg-gold/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-2 mb-3">
                            <FaLock size={12} />
                            Private Class
                          </div>
                          <p className="text-gray-600 text-sm mb-2">Tutor: {item.tutor}</p>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        {/* Schedule */}
                        <div className="flex items-center gap-3 text-sm">
                          <FaCalendarAlt className="text-secondary flex-shrink-0" />
                          <div>
                            <p className="text-gray-600">{item.day}</p>
                            <p className="font-semibold text-primary">
                              {item.time} - {item.endTime}
                            </p>
                          </div>
                        </div>

                        {/* Level & Intensity */}
                        <div className="flex items-center gap-3 text-sm">
                          <FaTrophy className="text-gold flex-shrink-0" />
                          <div>
                            <p className="text-gray-600">Level</p>
                            <p className="font-semibold text-primary">{item.level}</p>
                          </div>
                        </div>

                        {/* Capacity */}
                        <div className="flex items-center gap-3 text-sm">
                          <FaUsers className="text-secondary flex-shrink-0" />
                          <div>
                            <p className="text-gray-600">
                              {item.enrolled}/{item.capacity} Students Enrolled
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-gold rounded-full h-2"
                                style={{
                                  width: `${(item.enrolled / item.capacity) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="bg-cream rounded-2xl p-4 mb-6 border-l-4 border-gold">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Requirements</p>
                        <p className="text-sm text-gray-700">{item.requirements}</p>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <button className="w-full btn-primary flex items-center justify-center gap-2">
                        <FaPlayCircle size={16} />
                        Apply Now
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 col-span-full">
                    <p className="text-gray-600">No private classes scheduled yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COMPLETED SERIES SECTION */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-subtitle">Academic Achievements</span>
            <h2 className="section-title">Completed Islamic Texts & Books</h2>
            <p className="section-description max-w-3xl mx-auto">
              Celebrating our community's completion of major Islamic texts and scholarly works. These achievements represent years of dedicated study and spiritual growth.
            </p>
          </div>

          <CompletedSeriesSection />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Deepen Your Islamic Knowledge?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
            Join our community of learners. All programs are completely free. Sign up for reminders and stay updated on new sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-gold text-primary px-10 py-4 rounded-2xl font-bold hover:shadow-premium transition-all duration-300">
              Subscribe to Updates
            </button>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 text-white px-10 py-4 rounded-2xl font-bold border-2 border-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              Join Telegram Channel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MajlisSchedulePage;
