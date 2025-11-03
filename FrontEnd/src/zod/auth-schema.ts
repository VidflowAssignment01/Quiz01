import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  username: z.string().min(3, "name is too short"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .refine(
      (email) => {
        const domain = email.split("@")[1]?.toLowerCase().trim();
        return "gmail.com" === domain;
      },
      {
        message: "Only Gmail is supported",
      }
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TloginFormData = z.infer<typeof loginSchema>;
export type TsignUpFormData = z.infer<typeof signUpSchema>;

export { loginSchema, signUpSchema };
