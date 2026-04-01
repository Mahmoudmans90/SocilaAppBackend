import z, { email } from "zod";
import { ValidationError } from "./ValidationError.js";
import {
  passwordValidionWithZod,
  userNameValidationWithZod,
  validatePhoneWithZod,
} from "./ValidationZod.js";
const RegisterScheme = z
  .object({
    userName: userNameValidationWithZod,
    email: z.email({ error: "email must be email" }),
    password: passwordValidionWithZod,

    rePassword: passwordValidionWithZod,
    phone: validatePhoneWithZod,
    gender: z.string("Gender is Requierd").min(1, "Gender is Requierd"),
    age: z
      .number("age is Required and must be a number")
      .min(10, "Age Cant be less than 10")
      .max(100, "Age Cant be More Than 100"),
  })
  .refine((opj) => opj.password === opj.rePassword, {
    error: "Password And confirm password doesn't match",
    path: ["rePassword"],
  });

export const applayRegisterValidation = (body) => {
  try {
    return RegisterScheme.parse(body);
  } catch (error) {
    throw new ValidationError(error, 400);
  }
};
