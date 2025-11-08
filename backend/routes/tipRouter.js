import express from "express";
import {
  addNewTip,
  deleteTip,
  getAllTips,
  getSingleTip,
  updateTip,
} from "../controller/tipController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewTip);
router.delete("/delete/:id", isAuthenticated, deleteTip);
router.put("/update/:id", isAuthenticated, updateTip);
router.get("/getall", getAllTips);
router.get("/get/:id", getSingleTip);

export default router;
