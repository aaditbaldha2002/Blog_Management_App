import express from "express";
import { getPostStats} from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ for post analysis*/
router.get("/:postId/analysis",verifyToken,getPostStats);

export default router;
