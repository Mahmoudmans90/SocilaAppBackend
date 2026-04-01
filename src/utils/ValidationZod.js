import z from "zod";
export const passwordValidionWithZod = z
  .string("password is required")
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    "password cant be less than 8 characters and must have apperCase and LowerCase ",
  );
export const userNameValidationWithZod = z
  .string({ error: "userName is Required" })
  .min(2, "user name can not be less than 2 chars")
  .max(15, "user name can not be more than 15 chars");
export const validatePhoneWithZod = z
  .string("phone is Required and must be a Vlaid Phone Number")
  .regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{8}$/,
    "Please enter a valid phone number in the format: (XXX) XXX-XXXXXXXX or +XXX-XXX-XXXXXXXX.",
  );
