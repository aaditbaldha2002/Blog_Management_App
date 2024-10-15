import Post from "../models/Post.js";
import User from "../models/User.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

import * as fs from "fs";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  // Get page and limit from query params or default to page 1 and limit 10
  const { page = 1, limit = 5 } = req.query;

  try {
    // Pagination logic: sort by createdAt, limit, and skip
    const posts = await Post.find()
      .sort({ updatedAt: -1 })
      .limit(Number(limit)) // Limit number of posts per page
      .skip((Number(page) - 1) * Number(limit)); // Skip the previous pages

    // Send paginated posts in the response
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.find({ postId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSearchedPosts = async (req, res) => {
  try {
    const { searchquery } = req.params;
    // if (searchquery == "") {
    //   const post = await Post.find();
    // }

    const post = await Post.find({
      description: { $regex: `${searchquery}`, $options: "i" },
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 5 } = req.query;
    const post = await Post.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(Number(limit)) // Limit number of posts per page
      .skip((Number(page) - 1) * Number(limit)); // Skip the previous pages;
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// export const getPostComments = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const post = await Post.findById(id);

//     const comments = await Promise.all(
//       post.comments.slice(1).map((id) => User.findById(id))
//     );
//     console.log(post.comments);
//     const formattedComments = comments.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );
//     res.status(200).json(formattedComments);
//   } catch (err) {
//     console.log(err.message);
//     res.status(404).json({ message: err.message });
//   }
// };

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const { commenttext } = req.body;
    const { fullname } = req.body;
    const { picturePath } = req.body;
    //const post = await Post.findById(id);

    const comment = {
      commentBy: userId,
      comment: commenttext,
      fullname: fullname,
      picturePath: picturePath,
    };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */

export const deletePost = async (req, res) => {
  const { id } = req.params;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  try {
    const posttodelete = await Post.findOne({ _id: id });
    const post = await Post.deleteOne({ _id: id });
    const deleteurl = posttodelete.picturePath;
    var directory = __dirname.replace("controllers", "");
    const directorypath = directory + "/public/assets/";

    if (deleteurl != undefined) {
      fs.unlink(directorypath + deleteurl, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
