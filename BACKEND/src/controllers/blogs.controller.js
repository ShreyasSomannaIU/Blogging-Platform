import { blog } from "../models/blogs.models.js";
import mongoose from "mongoose";

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, author, hashTags, img } = req.body;

    const newBlog = new blog({
      title,
      content,
      author,
      hashTags,
      img,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find()
      .populate("author", "name email")
      .populate("likes", "user") 
      .populate("comments");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("likes", "user")
      .populate("comments");

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

// Like a blog
export const likeBlog = async (req, res) => {
  try {
    const blog = await blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.body.userId;

    if (blog.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked this blog" });
    }

    blog.likes.push(userId);
    await blog.save();

    res.status(200).json({ message: "Blog liked", blog });
  } catch (error) {
    res.status(500).json({ message: "Error liking blog", error: error.message });
  }
};

// Unlike a blog
export const unlikeBlog = async (req, res) => {
  try {
    const blog = await blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.body.userId;

    blog.likes = blog.likes.filter((id) => id.toString() !== userId);

    await blog.save();

    res.status(200).json({ message: "Blog unliked", blog });
  } catch (error) {
    res.status(500).json({ message: "Error unliking blog", error: error.message });
  }
};
