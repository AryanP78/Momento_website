import PostMessage from "../models/PostMessage.js";
import mongoose from "mongoose";

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthenticated",
    });
  }

  const post = await PostMessage.findById(id);

  if (!post) {
    return res.status(404).send("No post with that id");
  }

  const likes = post.likes || [];
  const index = likes.findIndex((id) => id === req.userId);

  if (index === -1) {
    likes.push(req.userId);
  } else {
    likes.splice(index, 1);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likes },
    { new: true },
  );

  res.json(updatedPost);
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  try {
    const post = await PostMessage.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });

    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await PostMessage.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log("POST request received");
  console.log(req.body);

  const post = {
    ...req.body,
    creatorId: req.userId,
  };

  try {
    const newPost = new PostMessage(post);

    console.log(newPost);

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
