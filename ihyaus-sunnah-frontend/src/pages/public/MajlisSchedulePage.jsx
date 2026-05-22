import { useState } from "react";

import {
  FaBookOpen,
  FaClock,
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
  FaStar,
  FaLock,
  FaShieldAlt,
  FaTrophy,
} from "react-icons/fa";

import { IoMdPeople } from "react-icons/io";
import { GiBookCover, GiOpenBook } from "react-icons/gi";

import useMajlisAPI from "../../hooks/useMajlisAPI";
import useCompletedMajlisAPI from "../../hooks/useCompletedMajlisAPI";


// =========================
// MAIN PAGE
// =========================
const MajlisSchedulePage = () => {
  const [activeTab, setActiveTab] = useState("public");

  const {
    majlis,
    loading: majlisLoading,
  } = useMajlisAPI();

  const {
    completed,
    loading: completedLoading,
  } = useCompletedMajlisAPI();

  // =========================
  // FILTER MAJLIS
  // =========================
  const publicMajlis = majlis.filter(
    (item) => item.type === "public"
  );

  const privateMajlis = majlis.filter(
    (item) => item.type === "private"
  );

  return (
    <div className="bg-cream min-h-screen">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519817650390-64a93db51149')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-black/70" />

        <div className="container-custom relative z-10 py-24">
          <h1 className="text-5xl font-bold text-white mb-4">
            Majlis Schedule
          </h1>

          <p className="text-gold text-2xl font-arabic mb-6" dir="rtl">
            طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
          </p>

          <p className="text-white/80 max-w-2xl mb-8">
            Structured Islamic learning program with live schedules and completed book archive.
          </p>

          <div className="flex gap-4">
            <a className="btn-primary">Explore Schedule</a>
            <a className="btn-outline">Join Telegram</a>
          </div>
        </div>
      </section>

      {/* =========================
          INTRO SECTION
      ========================= */}
      <section className="section-padding text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          About The Majlis
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto">
          A structured Islamic study circle where students learn classical texts
          through scheduled sessions and guided instruction.
        </p>
      </section>

      {/* =========================
          PUBLIC / PRIVATE TOGGLE
      ========================= */}
      <section className="container-custom mb-10">
        <div className="flex justify-center gap-4">

          <button
            onClick={() => setActiveTab("public")}
            className={`px-6 py-3 rounded-xl ${
              activeTab === "public"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            Public Majlis
          </button>

          <button
            onClick={() => setActiveTab("private")}
            className={`px-6 py-3 rounded-xl ${
              activeTab === "private"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            Private Majlis
          </button>

        </div>
      </section>

      {/* =========================
          MAJLIS SCHEDULE
      ========================= */}
      <section className="container-custom space-y-10">

        {(activeTab === "public" ? publicMajlis : privateMajlis).map(
          (item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >

              {/* BOOK + PROGRESS */}
              <div className="grid md:grid-cols-3">

                <div className="p-6 bg-primary/10">
                  <img
                    src={item.book.image}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <h3 className="mt-3 font-bold text-primary">
                    {item.book.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {item.book.category}
                  </p>

                  <div className="mt-2 bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-gold h-2 rounded-full"
                      style={{ width: `${item.book.progress}%` }}
                    />
                  </div>
                </div>

                {/* SCHEDULE */}
                <div className="p-6">
                  <h4 className="font-bold text-primary mb-3">
                    Schedule
                  </h4>

                  <p>{item.schedule.day}</p>
                  <p>
                    {item.schedule.startTime} - {item.schedule.endTime}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Status: {item.status}
                  </p>
                </div>

                {/* INSTRUCTOR */}
                <div className="p-6 flex items-center gap-4">
                  <img
                    src={item.instructor.image}
                    className="w-14 h-14 rounded-full"
                  />

                  <div>
                    <p className="font-bold text-primary">
                      {item.instructor.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.instructor.role}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )
        )}

      </section>

      {/* =========================
          COMPLETED BOOKS
      ========================= */}
      <section className="section-padding bg-white mt-20">

        <div className="container-custom">
          <h2 className="text-3xl font-bold text-primary mb-10 text-center">
            Completed Books Archive
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {completed.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 rounded-2xl p-4"
              >

                <img
                  src={item.book.image}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h3 className="font-bold mt-3">
                  {item.book.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {item.book.category}
                </p>

                <p className="text-xs mt-2">
                  {new Date(
                    item.studyPeriod.startDate
                  ).toDateString()}{" "}
                  →{" "}
                  {new Date(
                    item.studyPeriod.completionDate
                  ).toDateString()}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={item.tutor.image}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-sm">
                    {item.tutor.name}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

      </section>

    </div>
  );
};

export default MajlisSchedulePage;