
import express from "express";
import { postToLinkedIn } from "../controller/linkedinController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", postToLinkedIn);

export default router;
