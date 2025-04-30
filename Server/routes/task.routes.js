import express from "express";
import {
  createTask,
  getAllTask,
  removeTask,
} from "../controllers/task.controller.js";
import { authenticateTokens } from "../auth.middleware.js";
const router = express.Router();

router.post("/tasks/create", authenticateTokens, createTask);
router.get("/tasks", authenticateTokens, getAllTask);
router.delete("/tasks/delete/:id", authenticateTokens, removeTask);
export default router;
