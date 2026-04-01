import { updataProfileService } from "../services/user.service.js";

export const updataProfileController = async (req, res, next) => {
  const user = await updataProfileService(req);
  return res.status(201).json({ success: true, user });
};
