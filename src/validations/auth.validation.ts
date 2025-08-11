import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterUser = z.infer<typeof registerSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
