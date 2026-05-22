import { z } from "zod";

//
// 📊 ENUMS (must match your model + controller)
//
export const roleEnum = z.enum(["director", "board", "senior", "staff-i", "staff-ii", "staff-iii"]);

//
// 🧱 CREATE STAFF (USED IN createStaff)
//
export const staffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Invalid email"),
  address: z.string().optional(),
  role: roleEnum,
  position: z.string().min(2, "Position is required"),
  department: z.string().optional(),
  sections: z.array(z.string()).optional(),
  bio: z.string().optional(),
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]).optional(),
  image: z.string().optional(),
  occupation: z.string().optional(),
  academicStatus: z.string().optional()
});

//
// 🔁 UPDATE STAFF (USED IN updateStaff)
//
export const updateStaffSchema = staffSchema.partial();

//
// 🔍 FILTER VALIDATOR (FOR QUERY PARAMS)
//
export const filterStaffSchema = z.object({
  role: roleEnum.optional(),
  name: z.string().optional(),
  section: z.string().optional()
});

//
// 📄 PAGINATION VALIDATOR (OPTIONAL BUT BEST PRACTICE)
//
export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional()
});
