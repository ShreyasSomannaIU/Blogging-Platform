import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByBlog,
  getCommentsByUser,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getComments);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

// extra filters
router.get("/blog/:blogId", getCommentsByBlog);
router.get("/user/:userId", getCommentsByUser);

export default router;
