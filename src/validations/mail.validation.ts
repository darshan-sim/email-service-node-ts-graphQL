import z, { uuid } from "zod";

export const sendEmailSchema = z
  .object({
    to: z.email(),
    subject: z.string().optional(),
    body: z.string(),
  })
  .strip();

export const markAsReadSchema = z
  .object({
    ids: z.array(uuid()),
  })
  .strip();

export type SendEmail = z.infer<typeof sendEmailSchema>;
export type MarkAsReadEmails = z.infer<typeof markAsReadSchema>;
