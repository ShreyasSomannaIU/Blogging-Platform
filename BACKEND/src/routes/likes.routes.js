import express from "express";
import {
  addLike,
  removeLike,
  getLikesByBlog,
  getLikesByUser,
  checkUserLike,
} from "../controllers/likes.controller.js";

const router = express.Router();

router.post("/", addLike);
router.delete("/", removeLike);
router.get("/blog/:blogId", getLikesByBlog);
router.get("/user/:userId", getLikesByUser);
router.get("/check/:userId/:blogId", checkUserLike);

export default router;
