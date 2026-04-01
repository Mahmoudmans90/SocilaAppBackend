import { loginService, registerService } from "../services/auth.service.js";
import AppError from "../utils/AppError.js";
import {
  geanrateAccessToken,
  generateRefreshToken,
  refreshTokens,
} from "../utils/genreateTokens.js";
import { SendEmail } from "../utils/sendEmail.js";

export const registerController = async (req, res, next) => {
  try {
    const user = await registerService(req.body);
    await SendEmail({ email: user.email, name: user.name, vfcode: "266595" });
    user.password = undefined;
    user.__v = undefined;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const user = await loginService(req.body);
    user.password = undefined;
    let { userName, email, _id } = user;

    const accessToken = geanrateAccessToken({ userName, email, _id });
    const refreshToken = generateRefreshToken({ userName, email, _id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/auth/refresh",
      maxAge: 10 * 24 * 60 * 60,
    });
    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refreshController = async (req, res, next) => {
  console.log(req.cookies);

  const token = req.cookies.refreshToken;
  if (!token) {
    throw new AppError("No refresh token", 401);
  }
  const { user, accessToken, refreshToken } = await refreshTokens(token);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 10 * 24 * 60 * 60,
  });
  res.status(200).json({
    success: true,
    user,
    accessToken,
  });
};
