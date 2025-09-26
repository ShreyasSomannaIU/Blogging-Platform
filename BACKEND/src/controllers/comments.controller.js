import { comment } from "../models/comments.models.js";
import { blog } from "../models/blogs.models.js";
import { user } from "../models/user.models.js";

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { comment, user, blog } = req.body;

    // check if blog & user exist
    const foundBlog = await blog.findById(blog);
    if (!foundBlog) return res.status(404).json({ message: "Blog not found" });

    const foundUser = await user.findById(user);
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const newComment = new comment({
      comment,
      user,
      blog,
    });

    const savedComment = await newComment.save();

    // push comment to blog's comments array
    foundBlog.comments.push(savedComment._id);
    await foundBlog.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error: error.message });
  }
};

// Get all comments
export const getComments = async (req, res) => {
  try {
    const comments = await comment.find()
      .populate("user", "name email")
      .populate("blog", "title");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

// Get a single comment by ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await comment.findById(req.params.id)
      .populate("user", "name email")
      .populate("blog", "title");

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comment", error: error.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const updatedComment = await comment.findByIdAndUpdate(
      req.params.id,
      { comment },
      { new: true }
    ).populate("user", "name email");

    if (!updatedComment) return res.status(404).json({ message: "Comment not found" });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) return res.status(404).json({ message: "Comment not found" });

    // remove from blog's comments array
    await Blog.findByIdAndUpdate(deletedComment.blog, {
      $pull: { comments: deletedComment._id },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};

// Get comments for a specific blog
export const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog comments", error: error.message });
  }
};

// Get comments made by a specific user
export const getCommentsByUser = async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.params.userId })
      .populate("blog", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user comments", error: error.message });
  }
};
