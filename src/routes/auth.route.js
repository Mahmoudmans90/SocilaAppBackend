import { Router } from "express";
import {
  loginController,
  refreshController,
  registerController,
} from "../controller/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.post("/refresh", refreshController);

export default AuthRouter;
