import jwt, { decode } from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const Auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError("unauthorized", 401);
  }
  const decoded = jwt.verify(token, "SecretKey");
  req.user = decoded;
  next();
};
