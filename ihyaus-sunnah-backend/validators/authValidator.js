
import { z } from "zod";

//
// 🔐 LOGIN
//
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

//
// 🔁 CHANGE PASSWORD (LOGGED IN)
//
export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters")
});

//
// 📩 FORGOT PASSWORD (REQUEST CODE)
//
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format")
});

//
// 🔑 RESET PASSWORD (VERIFY CODE)
//
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
  code: z.string().min(3, "Reset code is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters")
});

//
// 🔐 GENERATE SECRET KEY (ADMIN/DIRECTOR ONLY)
//
export const generateSecretKeySchema = z.object({
  password: z.string().min(6, "Password is required to generate secret key")
});

//
// 🔄 RESET SECRET KEY (ADMIN/DIRECTOR ONLY)
//
export const resetSecretKeySchema = z.object({
  password: z.string().min(6, "Password is required to reset secret key")
});

//
// 🔑 CHANGE SECRET KEY (ADMIN/DIRECTOR ONLY)
//
export const changeSecretKeySchema = z.object({
  currentSecretKey: z.string().min(1, "Current secret key is required"),
  password: z.string().min(6, "Password is required to change secret key")
});

//
// 🔐 SET CUSTOM SECRET KEY (ADMIN/DIRECTOR ONLY)
//
export const setCustomSecretKeySchema = z.object({
  secretKey: z.string()
    .length(4, "Secret key must be exactly 4 digits")
    .regex(/^\d{4}$/, "Secret key must contain only digits 0-9"),
  password: z.string().min(6, "Password is required to set custom secret key")
});