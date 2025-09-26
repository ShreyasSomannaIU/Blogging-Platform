import { like } from "../models/likes.models.js";
import { blog } from "../models/blogs.models.js";

// Add a like
export const addLike = async (req, res) => {
  try {
    const { user, blog } = req.body;

    // check if blog exists
    const foundBlog = await blog.findById(blog);
    if (!foundBlog) return res.status(404).json({ message: "Blog not found" });

    // check if user already liked
    const existingLike = await like.findOne({ user, blog });
    if (existingLike) {
      return res.status(400).json({ message: "User already liked this blog" });
    }

    const newLike = new like({ user, blog });
    const savedLike = await newLike.save();

    // push like to blog
    foundBlog.likes.push(savedLike._id);
    await foundBlog.save();

    res.status(201).json(savedLike);
  } catch (error) {
    res.status(500).json({ message: "Error liking blog", error: error.message });
  }
};

// Remove a like
export const removeLike = async (req, res) => {
  try {
    const { user, blog } = req.body;

    const existingLike = await like.findOneAndDelete({ user, blog });
    if (!existingLike) {
      return res.status(404).json({ message: "Like not found" });
    }

    // remove from blog.likes array
    await Blog.findByIdAndUpdate(blog, { $pull: { likes: existingLike._id } });

    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking blog", error: error.message });
  }
};

// Get all likes for a blog
export const getLikesByBlog = async (req, res) => {
  try {
    const likes = await like.find({ blog: req.params.blogId }).populate("user", "name email");
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog likes", error: error.message });
  }
};

// Get all likes by a user
export const getLikesByUser = async (req, res) => {
  try {
    const likes = await Like.find({ user: req.params.userId }).populate("blog", "title");
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user likes", error: error.message });
  }
};

// Check if a user liked a blog
export const checkUserLike = async (req, res) => {
  try {
    const { userId, blogId } = req.params;

    const like = await like.findOne({ user: userId, blog: blogId });
    res.status(200).json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ message: "Error checking like", error: error.message });
  }
};
