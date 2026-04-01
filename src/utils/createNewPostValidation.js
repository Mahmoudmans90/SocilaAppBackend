import z from "zod";
import { ValidationError } from "./ValidationError.js";

const postSchema = z.object({
  title: z
    .string()
    .min(5, "title cant be less than 5 charcters")
    .max(30, "title cant be more than 30 character"),
  content: z
    .string()
    .min(5, "content cant be less than 5")
    .max(200, "content cant be more than 200 charcter"),
});

export const ApplyCreatePostValidation = (data) => {
  try {
    const validate = postSchema.parse(data);
    return validate;
  } catch (error) {
    throw new ValidationError(error.message, 401);
  }
};
