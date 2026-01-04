import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(1000),
  botField: z.string().optional(),
});

export const contactRequestSchema = contactSchema.extend({
  token: z.string().min(1),
});

export type ContactInput = z.infer<typeof contactSchema>;
