import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";
import { applayLoginValidation } from "../utils/login.validation.js";
import { applayRegisterValidation } from "../utils/register.validation.js";
import { ValidationError } from "../utils/ValidationError.js";
import bcrypt from "bcryptjs";
export const registerService = async (body) => {
  const bayload = applayRegisterValidation(body);
  const { password, email } = bayload;
  const hashedPassword = await bcrypt.hash(password, 10);
  let DidUserExists = await User.findOne({ email });
  bayload.password = hashedPassword;
  if (DidUserExists) {
    throw new AppError("this Email is taken", 400);
  }
  const user = await User.insertOne(bayload);
  return user;
};

export const loginService = async (body) => {
  const { email, password } = applayLoginValidation(body);
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("wrong Credntials", 400);
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new AppError("wrong Credntials", 400);
  }
  return user;
};
