import express from "express";
import {
  addTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  updateTeamMember,
} from "../controller/teamController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addTeamMember);
router.delete("/delete/:id", isAuthenticated, deleteTeamMember);
router.put("/update/:id", isAuthenticated, updateTeamMember);
router.get("/getall", getAllTeamMembers);

export default router;
