import { z } from "zod";

// REGISTER VALIDATION
export const registerSchema = z.object({

    fullName: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please provide a valid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),

    role: z
        .enum(["student", "recruiter"]),

    termsAccepted: z
        .literal(true, {
            error: "You must accept Terms and Privacy Policy",
        }),

}).strict();


// LOGIN VALIDATION
export const loginSchema = z.object({

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please provide a valid email"),

    password: z
        .string()
        .min(1, "Password is required"),

}).strict();
