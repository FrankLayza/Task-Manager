import Task from "../models/Tasks.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  console.log("User creating this task is ", req.user);
  const { title } = req.body;
  const userId = req.user._id;

  try {
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const newTask = await Task.create({
      title,
      user: userId,
    });
    res.status(201).json({ message: "new task created", newTask });
  } catch (error) {
    console.error("Error creating task", error);
    return res.status(500).json({ message: "Error creating task" });
  }
};

export const getAllTask = async (req, res) => {
  console.log("User getting all tasks", req.user);
  try {
    const tasks = await Task.find({ user: req.user._id });
    console.log("fetching tasks for: ", req.user);
    res.status(200).json({
      success: true,
      message: "All tasks retrieved",
      tasks: tasks || [],
    });
  } catch (error) {
    console.error("Error fetching all tasks", error);
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
};
