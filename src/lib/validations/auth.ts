import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or username is required."),
  password: z.string().min(1, "Password is required."),
  remember: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters."),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must include at least 1 uppercase letter.")
      .regex(/[0-9]/, "Password must include at least 1 number."),
    confirmPassword: z.string().min(1, "Password confirmation is required."),
    agreeTerms: z.literal(true, {
      message: "You must agree to the terms and privacy policy.",
    }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password confirmation does not match.",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
