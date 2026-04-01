import { Router } from "express";
import {
  addCommentController,
  addLikeController,
  CreatePostController,
  deleteCommentController,
  deletePostController,
  getAllpostsController,
  getUserpostsController,
  updateCommentController,
  UpdatePostController,
} from "../controller/posts.controller.js";
import { Auth } from "../middleware/Auth.middleware.js";
import multer from "multer";
import { storage } from "../middleware/upload_single_image.middleware.js";
const upload = multer({ storage: storage });

const PostsRouter = Router();

PostsRouter.get("/get-all-posts", getAllpostsController);
PostsRouter.get("/get-user-posts", Auth, getUserpostsController);

PostsRouter.post(
  "/create-new-post",
  Auth,
  upload.single("post_image"),
  CreatePostController,
);
PostsRouter.patch(
  "/update-post/:postId",
  Auth,
  upload.single("post_image"),
  UpdatePostController,
);

PostsRouter.delete("/delete-post/:postId", Auth, deletePostController);
PostsRouter.post("/like/:postId", Auth, addLikeController);

PostsRouter.post("/create-comment/:postId", Auth, addCommentController);
PostsRouter.patch(
  "/update-comment/:postId/:comment_id",
  Auth,
  updateCommentController,
);

PostsRouter.delete(
  "/delete-comment/:postId/:commentId",
  Auth,
  deleteCommentController,
);
export default PostsRouter;
