// src/components/staff/StaffProfileModal.jsx

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const StaffProfileModal = ({ staff, isOpen, onClose }) => {
  if (!staff) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-white max-w-5xl w-full rounded-[32px] overflow-hidden shadow-premium max-h-[95vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-full h-[350px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 bg-white/20 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/30 transition"
                >
                  <FiX size={24} />
                </button>

                <div className="absolute bottom-8 left-8 text-white">
                  <span className="bg-secondary px-4 py-2 rounded-full text-sm">
                    {staff.role}
                  </span>

                  <h2 className="text-4xl font-serif font-bold mt-5">
                    {staff.name}
                  </h2>

                  <p className="text-gray-200 mt-3 max-w-2xl">
                    {staff.bio}
                  </p>
                </div>
              </div>

              <div className="p-10 grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                      Biography
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {staff.fullBio}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                      Responsibilities
                    </h3>

                    <ul className="space-y-3">
                      {staff.responsibilities?.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-600"
                        >
                          <span className="w-2 h-2 rounded-full bg-secondary mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-cream rounded-3xl p-6">
                    <h4 className="text-xl font-bold text-primary mb-5">
                      Academic Information
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Qualification
                        </p>

                        <p className="font-semibold text-primary">
                          {staff.qualification}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Experience
                        </p>

                        <p className="font-semibold text-primary">
                          {staff.experience}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Specialization
                        </p>

                        <p className="font-semibold text-primary">
                          {staff.specialization}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary text-white rounded-3xl p-6">
                    <h4 className="text-xl font-bold mb-5">
                      Sections
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {staff.sections.map((section, idx) => (
                        <span
                          key={idx}
                          className="bg-white/10 px-4 py-2 rounded-full text-sm"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StaffProfileModal;