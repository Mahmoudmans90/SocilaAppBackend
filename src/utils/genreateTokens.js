import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const geanrateAccessToken = (user) => {
  return jwt.sign(user, "SecretKey", { expiresIn: "1h" });
};

export const generateRefreshToken = (user) => {
  return jwt.sign(user, "SecretRefreshToken", { expiresIn: "10d" });
};

export const refreshTokens = async (token) => {
  const decoded = jwt.verify(token, "SecretRefreshToken");
  const user = await User.findById(decoded._id);
  if (!user) {
    return false;
  }
  let { userName, email, _id } = user;

  const accessToken = geanrateAccessToken({ userName, email, _id });
  const refreshToken = generateRefreshToken({ userName, email, _id });
  return {
    user,
    accessToken,
    refreshToken,
  };
};
