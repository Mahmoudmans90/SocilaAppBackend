import express from "express";
import { dbConnection } from "./config/db.js";
import AuthRouter from "./routes/auth.route.js";
import { GlopalErrorHandler } from "./middleware/Error.middlewar.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import PostsRouter from "./routes/posts.route.js";
const app = express();
dbConnection();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://gravo-design.online",
    credentials: true,
  }),
);
app.use("/uploads", express.static("uploads"));
app.use("/auth", AuthRouter);
app.use("/post", PostsRouter);
app.use("/user", userRouter);

app.use(GlopalErrorHandler);

export default app;
