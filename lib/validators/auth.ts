import { z } from "zod";

export const authCredentialSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be at most 20 characters long." }),
});

export type authCredentialValidator = z.infer<typeof authCredentialSchema>;
