import PostModel from "../models/Post.model.js";
import {
  addCommentService,
  addLikeService,
  updateCommentService,
  UpdatePostService,
} from "../services/postService.js";
import AppError from "../utils/AppError.js";
import { ApplyCreatePostValidation } from "../utils/createNewPostValidation.js";
import fs from "fs";

export const getAllpostsController = async (req, res, next) => {
  const posts = await PostModel.find()
    .populate("user_id", "userName email profile_pic _id")
    .populate("comments.user", "userName email profile_pic _id")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    posts,
  });
};

export const CreatePostController = async (req, res, next) => {
  const varify = ApplyCreatePostValidation(req.body);
  const { filename } = req.file;

  const post = await PostModel.insertOne({
    ...varify,
    image: "uploads/" + req.user._id + "/" + filename,
    user_id: req.user._id,
  });
  res.status(201).json({
    success: true,
    post,
  });
};

export const UpdatePostController = async (req, res, next) => {
  const post = await UpdatePostService(req);
  if (!post) {
    throw new AppError("cannot update", 401);
  }
  res.status(201).json({ success: true, post });
};
export const deletePostController = async (req, res, next) => {
  const user_id = req.user._id;
  const { postId } = req.params;
  const post = await PostModel.findOne({ _id: postId, user_id });
  console.log(post, user_id, postId);

  if (!post) throw new AppError("cannot delete", 401);
  if (fs.existsSync(post.image)) {
    fs.unlinkSync(post.image);
  }
  await PostModel.findOneAndDelete({ _id: postId });
  res.status(201).json({ success: true, ok: "ok" });
};

export const addLikeController = async (req, res, next) => {
  const post = await addLikeService(req.params.postId, req.user._id);
  res.status(201).json({ success: true });
};

export const addCommentController = async (req, res, next) => {
  const post = await addCommentService(req.params, req.body, req.user);
  res.status(201).json({
    success: true,
    post,
  });
};

export const updateCommentController = async (req, res, next) => {
  const { comment_id, postId } = req.params;
  const { text } = req.body || { text: null };
  const user_id = req.user._id;
  const post = await updateCommentService(comment_id, text, user_id, postId);
  res.status(201).json({
    success: true,
    post,
  });
};

export const deleteCommentController = async (req, res, next) => {
  const post = await PostModel.findById(req.params.postId);
  if (!post) throw new AppError("post not Found", 404);
  const comment = post.comments.id(req.params.commentId);
  if (!comment) throw new AppError("comment Not Found", 404);
  if (comment.user.toString() !== req.user._id.toString())
    throw new AppError("Not Your Comment", 403);
  comment.deleteOne();
  post.save();
  res.status(201).json({
    success: true,
  });
};

export const getUserpostsController = async (req, res, next) => {
  const posts = await PostModel.find({ user_id: req.user._id })
    .populate("user_id", "userName email profile_pic _id")
    .populate("comments.user", "userName email profile_pic _id")
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    posts,
  });
};
