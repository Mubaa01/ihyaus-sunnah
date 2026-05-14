// src/components/staff/StaffCard.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StaffCard = ({ staff, featured }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[28px] bg-white border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500 ${
        featured ? "xl:scale-[1.02]" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={staff.image}
          alt={staff.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-5 left-5">
          <span className="bg-secondary text-white text-xs px-4 py-2 rounded-full">
            {staff.role}
          </span>
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">
          {staff.name}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-5">
          {staff.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {staff.sections.map((section, idx) => (
            <span
              key={idx}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
            >
              {section}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Academic Status
            </p>

            <p className="font-semibold text-primary">
              {staff.academicStatus}
            </p>
          </div>

        <Link to={`/staff/profile/${staff.id}`} className="btn-primary">
         View Profile
        </Link>

         
        </div>
      </div>
    </motion.div>
  );
};

export default StaffCard;