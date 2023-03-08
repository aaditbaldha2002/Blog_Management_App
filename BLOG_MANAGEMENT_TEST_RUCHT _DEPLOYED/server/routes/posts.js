import express from "express";
import { getFeedPosts, getUserPosts, likePost , commentPost, /*getPostComments*/} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
// router.get("/:id/showcomments",verifyToken,getPostComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment",verifyToken,commentPost);

export default router;
