import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(3, "Must contain at least 3 chars")
    .max(24, "Must contain 24 chars max"),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Must contain at least 6 chars")
    .max(12, "Must contain 12 chars max"),
});

export type RegisterAccountAuth = z.infer<typeof authSchema>;

export const authSchemaWithoutUsername = authSchema.omit({ username: true });

export type GetUserByEmailAuth = z.infer<typeof authSchemaWithoutUsername>;
