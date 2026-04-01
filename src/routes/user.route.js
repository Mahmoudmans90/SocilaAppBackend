import { Router } from "express";
import { updataProfileController } from "../controller/user.controller.js";
import { Auth } from "../middleware/Auth.middleware.js";
import { storage } from "../middleware/upload_single_image.middleware.js";
import multer from "multer";

const userRouter = Router();
const upload = multer({ storage: storage });
userRouter.patch(
  "/update-profile",
  Auth,
  upload.single("profile"),
  updataProfileController,
);

export default userRouter;
