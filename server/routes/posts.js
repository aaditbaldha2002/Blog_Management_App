import express from "express";
import { getFeedPosts, getUserPosts, likePost , commentPost, getUserPost, getSearchedPosts,deletePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:searchquery", verifyToken, getSearchedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId",verifyToken,getUserPost);
// router.get("/:id/showcomments",verifyToken,getPostComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment",verifyToken,commentPost);

/* DELETE */
router.delete("/:id",verifyToken,deletePost);

export default router;

