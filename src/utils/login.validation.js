import z, { email } from "zod";
import { passwordValidionWithZod } from "./ValidationZod.js";
import { ValidationError } from "./ValidationError.js";

const LoginSchema = z.object({
  email: z.email({
    error: "email must be of type contain (@gmail , @yahoo) folwed by .com",
  }),
  password: passwordValidionWithZod,
});

export const applayLoginValidation = (body) => {
  try {
    return LoginSchema.parse(body);
  } catch (error) {
    throw new ValidationError(error, 400);
  }
};
