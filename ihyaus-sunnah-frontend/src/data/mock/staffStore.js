// src/data/mock/staffStore.js

import { STAFF_SCHEMA } from "../../constants/staffSchema"

const STORAGE_KEY =
  "ihya_staff_data"

const generateInitialStaff =
  () => {
    return [
      {
        ...STAFF_SCHEMA,

        id: 1,

        name:
          "Dr. Abdulrahman Musa",

        position:
          "Director General",

        role: "director",

        department:
          "Leadership Directorate",

        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",

        bio: "Leading the foundation with dedication to authentic Islamic education and community development.",

        sections: [
          "Administration",
          "Community",
        ],

        email:
          "director@ihyafoundation.org",

        phone:
          "+234 800 000 0001",

        address:
          "Magume, Zaria",

        academicStatus:
          "PhD Islamic Studies",

        occupation:
          "Director & Scholar",

        maritalStatus:
          "Married",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      {
        ...STAFF_SCHEMA,

        id: 2,

        name:
          "Ustadh Ibrahim Tijani",

        position:
          "Head of Islamiyyah",

        role: "board",

        department:
          "Islamiyyah Department",

        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",

        bio: "Supervisor of Islamiyyah curriculum and student affairs.",

        sections: [
          "Islamiyyah",
        ],

        email:
          "islamiyyah@ihyafoundation.org",

        phone:
          "+234 800 000 0002",

        address:
          "Magume, Zaria",

        academicStatus:
          "Graduate of Islamic Sciences",

        occupation:
          "Islamiyyah Instructor",

        maritalStatus:
          "Married",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      {
        ...STAFF_SCHEMA,

        id: 3,

        name:
          "Hafiz Abdullah Musa",

        position:
          "Head of Tahfeez",

        role: "board",

        department:
          "Tahfeez Department",

        image:
          "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200&auto=format&fit=crop",

        bio: "Leading Qur'an memorization programs with strong revision systems.",

        sections: [
          "Tahfeez",
        ],

        email:
          "tahfeez@ihyafoundation.org",

        phone:
          "+234 800 000 0003",

        address:
          "Magume, Zaria",

        academicStatus:
          "Hafizul Qur'an",

        occupation:
          "Tahfeez Instructor",

        maritalStatus:
          "Married",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      {
        ...STAFF_SCHEMA,

        id: 4,

        name:
          "Sheikh Umar Farooq",

        position:
          "Board of Trustee",

        role: "board",

        department:
          "Board of Trustees",

        image:
          "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",

        bio: "Advisor and senior scholar guiding educational strategy.",

        sections: [
          "Administration",
        ],

        email:
          "umar@ihyafoundation.org",

        phone:
          "+234 800 000 0004",

        address:
          "Magume, Zaria",

        academicStatus:
          "Senior Islamic Scholar",

        occupation:
          "Educational Advisor",

        maritalStatus:
          "Married",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      {
        ...STAFF_SCHEMA,

        id: 5,

        name:
          "Ustadh Ahmad Bello",

        position:
          "Board of Trustee",

        role: "board",

        department:
          "Board of Trustees",

        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",

        bio: "Oversees welfare and organizational planning.",

        sections: [
          "Community",
        ],

        email:
          "ahmad@ihyafoundation.org",

        phone:
          "+234 800 000 0005",

        address:
          "Magume, Zaria",

        academicStatus:
          "Islamic Studies Graduate",

        occupation:
          "Community Coordinator",

        maritalStatus:
          "Married",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      {
        ...STAFF_SCHEMA,

        id: 6,

        name:
          "Ustadh Musa Aliyu",

        position:
          "Senior Academic Coordinator",

        role: "senior",

        department:
          "Academic Affairs",

        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",

        bio: "Coordinates academic planning and student mentorship.",

        sections: [
          "Academic",
        ],

        email:
          "academic@ihyafoundation.org",

        phone:
          "+234 800 000 0006",

        address:
          "Magume, Zaria",

        academicStatus:
          "Bachelor in Arabic & Islamic Studies",

        occupation:
          "Academic Coordinator",

        maritalStatus:
          "Married",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      {
        ...STAFF_SCHEMA,

        id: 7,

        name:
          "Ustadh Yahya Idris",

        position:
          "Senior Media Coordinator",

        role: "senior",

        department:
          "Media Department",

        image:
          "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200&auto=format&fit=crop",

        bio: "Responsible for lectures media and public communication.",

        sections: [
          "Media",
        ],

        email:
          "media@ihyafoundation.org",

        phone:
          "+234 800 000 0007",

        address:
          "Magume, Zaria",

        academicStatus:
          "Media & Communication Specialist",

        occupation:
          "Media Coordinator",

        maritalStatus:
          "Single",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString(),
      },

      ...Array.from(
        { length: 10 },
        (_, i) => ({
          ...STAFF_SCHEMA,

          id: 100 + i,

          name: `Staff I Member ${
            i + 1
          }`,

          position:
            "Administrative Officer",

          role: "staff-i",

          department:
            "Administration",

          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",

          bio: "Dedicated administrative staff supporting institutional activities.",

          sections: [
            "Administration",
          ],

          createdAt:
            new Date().toISOString(),

          updatedAt:
            new Date().toISOString(),
        })
      ),

      ...Array.from(
        { length: 10 },
        (_, i) => ({
          ...STAFF_SCHEMA,

          id: 200 + i,

          name: `Staff II Member ${
            i + 1
          }`,

          position:
            "Teaching Assistant",

          role: "staff-ii",

          department:
            "Education",

          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",

          bio: "Supports educational delivery and student supervision.",

          sections: [
            "Islamiyyah",
            "Tahfeez",
          ],

          createdAt:
            new Date().toISOString(),

          updatedAt:
            new Date().toISOString(),
        })
      ),

      ...Array.from(
        { length: 10 },
        (_, i) => ({
          ...STAFF_SCHEMA,

          id: 300 + i,

          name: `Staff III Member ${
            i + 1
          }`,

          position:
            "Community Support Officer",

          role: "staff-iii",

          department:
            "Community Affairs",

          image:
            "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200&auto=format&fit=crop",

          bio: "Assists community outreach and welfare programs.",

          sections: [
            "Community",
          ],

          createdAt:
            new Date().toISOString(),

          updatedAt:
            new Date().toISOString(),
        })
      ),
    ]
  }

export const initializeStorage =
  () => {
    const existing =
      localStorage.getItem(
        STORAGE_KEY
      )

    if (!existing) {
      localStorage.setItem(
        STORAGE_KEY,

        JSON.stringify(
          generateInitialStaff()
        )
      )
    }
  }

export const getStaff = () => {
  initializeStorage()

  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEY
    )
  )
}

export const getStaffById = (
  id
) => {
  const staff = getStaff()

  return staff.find(
    (member) =>
      member.id === Number(id)
  )
}

export const createStaff = (
  newStaff
) => {
  const staff = getStaff()

  const createdStaff = {
    ...STAFF_SCHEMA,

    ...newStaff,

    id: Date.now(),

    createdAt:
      new Date().toISOString(),

    updatedAt:
      new Date().toISOString(),
  }

  const updated = [
    ...staff,
    createdStaff,
  ]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  return createdStaff
}

export const updateStaff = (
  id,
  data
) => {
  const staff = getStaff()

  const updated = staff.map(
    (member) =>
      member.id === Number(id)
        ? {
            ...member,

            ...data,

            updatedAt:
              new Date().toISOString(),
          }
        : member
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  return updated
}

export const deleteStaff = (
  id
) => {
  const staff = getStaff()

  const updated = staff.filter(
    (member) =>
      member.id !== Number(id)
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  return updated
}