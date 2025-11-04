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

router.post("/add",  addNewTip);
router.delete("/delete/:id",  deleteTip);
router.put("/update/:id",  updateTip);
router.get("/getall", getAllTips);
router.get("/get/:id", getSingleTip);

export default router;
