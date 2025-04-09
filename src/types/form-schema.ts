import { z } from "zod";

export const registrationSchemaServer = z.object({
  firstName: z.string().min(3).max(30),
  lastName: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const registrationSchema = z
  .object({
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email().min(5).max(30),
  password: z.string().min(8).max(30),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(5).max(30),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
