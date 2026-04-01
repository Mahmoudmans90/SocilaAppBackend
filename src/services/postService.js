import PostModel from "../models/Post.model.js";
import AppError from "../utils/AppError.js";
import { ApplyCreatePostValidation } from "../utils/createNewPostValidation.js";

export const UpdatePostService = async (req) => {
  const { postId } = req.params;
  const { user, body } = req;
  const data = ApplyCreatePostValidation(body);
  if (req.file?.filename) {
    data.image = "uploads/" + req.user._id + "/" + req.file.filename;
  }
  const postAfterUpdate = await PostModel.findOneAndUpdate(
    { _id: postId, user_id: user._id },
    data,
  );
  return postAfterUpdate;
};
export const addLikeService = async (postId, userId) => {
  const post = await PostModel.findById(postId);
  const isLiked = post.likes.includes(userId);
  if (isLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }
  await post.save();
  return post;
};
export const addCommentService = async (params, body, user) => {
  const { postId } = params;
  const user_id = user._id;
  const { text } = body || { text: null };
  if (!text) throw new AppError("comment text is required", 400);
  const post = await PostModel.findById(postId);
  if (!post) throw new AppError("not found", 404);
  post.comments.push({
    user: user_id,
    text,
  });
  await post.save();
  return post;
};

export const updateCommentService = async (
  comment_id,
  text,
  user_id,
  postId,
) => {
  const post = await PostModel.findById(postId);
  if (!post) throw new AppError("Post Not Found", 404);
  const comment = post.comments.id(comment_id);
  if (!comment) throw new AppError("Comment Not Found", 404);
  if (comment.user.toString() !== user_id.toString())
    throw new AppError("not Your Comment", 401);
  comment.text = text;
  await post.save();
  return post;
};
