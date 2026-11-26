import { z } from "zod";

// Register validation
export const registerSchema = z.strictObject({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),

  role: z.enum(["student", "recruiter"], {
    error: "Role must be either student or recruiter",
  }),
});

// Login validation
export const loginSchema = z.strictObject({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  password: z.string().min(1, "Password is required"),
});

// Forgot password validation
export const forgotPasswordSchema = z.strictObject({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),
});

// Reset password validation
export const resetPasswordSchema = z
  .strictObject({
    token: z.string().min(1, "Reset token is required"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password cannot exceed 128 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Change password validation
export const changePasswordSchema = z
  .strictObject({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(128, "New password cannot exceed 128 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
