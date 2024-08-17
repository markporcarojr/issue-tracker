import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(2, "Title is required").max(255),
  description: z.string().min(2, "Description is required").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(2, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(2, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssingedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
  status: z
    .string()
    .min(1, "AssingedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const userSchema = z
  .object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });
