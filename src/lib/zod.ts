import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; //5MB

export const signInSchema = z.object({
  email: z.string().email("Invalid E-mail").nonempty("E-mail is required"),
  password: z.string().nonempty("Password is required"),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(5, "Name must be at least 5 characters long"),
});

export const baseGameSchema = z.object({
  id: z.number().optional().nullable(),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .nonempty("Title is required"),
  slug: z.string().min(5, "Slug must be at least 5 characters long").nonempty("Slug is required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long")
    .nonempty("Description is required"),
  status: z
    .string({ required_error: "Status is required" })
    .refine((value) => value === "true" || value === "false", {
      message: "Status must be either 'true' or 'false'",
    })
    .nullable() // Allow `null` if not selected
    .refine((value) => value !== null, {
      message: "Status is required", // Custom message for `null`
    }),
  featured: z
    .string({ required_error: "Featured is required" })
    .refine((value) => value === "true" || value === "false", {
      message: "Featured must be either 'true' or 'false'",
    })
    .nullable() // Allow `null` if not selected
    .refine((value) => value !== null, {
      message: "Featured is required", // Custom message for `null`
    }),
  categoryId: z.string({
    required_error: "Category is required",
  }),
});

export const createGameSchema = baseGameSchema.extend({
  thumbnail: z
    .instanceof(File, { message: "Game thumbnail is required" })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "File size must be less than 5MB"),
  gameFile: z.instanceof(File, { message: "Game ROMs is required" }),
});

export const updateGameSchema = baseGameSchema.extend({
  thumbnail: z
    .instanceof(File, { message: "Game thumbnail is required" })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "File size must be less than 5MB")
    .optional(),
  gameFile: z.instanceof(File, { message: "Game ROMs is required" }).optional(),
});
