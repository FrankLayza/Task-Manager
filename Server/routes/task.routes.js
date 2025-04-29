import express from "express";
import { createTask, getAllTask } from "../controllers/task.controller.js";
import { authenticateTokens } from "../auth.middleware.js";
const router = express.Router();

router.post("/tasks/create", authenticateTokens, createTask);
router.get("/tasks", authenticateTokens, getAllTask);
export default router;
