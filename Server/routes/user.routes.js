import express from "express";
import { createUser, deleteUser, loginUser, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register",  createUser);
router.delete('/delete/:id', deleteUser)
router.post('/login', loginUser)
router.get('/', getAllUsers)
export default router;
