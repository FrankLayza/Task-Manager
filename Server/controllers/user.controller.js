import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Wrong email and password" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(401)
      .json({ success: false, message: "user already exists" });
  }
  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "added new user", data: newUser });
    console.log("request body", req.body);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "connection error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "invalid user Id" });
  }
  try {
    await User.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log("error deleting user account", error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "invalid user id" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findByIdAndUpdate(
      id,
      { email, password: hashedPassword },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      data: updateUser,
      message: "User details updated successfully",
    });
  } catch (error) {
    console.log("error in updating user", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and Password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect Email" });
    }

    const isTheSame = await bcrypt.compare(password, user.password);
    if (!isTheSame) {
      return res
        .status(400)
        .json({ success: false, message: "mismatched password" });
    }

    const tokens = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    return res.status(200).json({ success: true, tokens });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};
