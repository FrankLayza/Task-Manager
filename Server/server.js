// import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectMongoDb } from "./config/db.js";

const PORT = process.env.PORT || 2003;
const app = express();
app.use(express.json());
app.listen(PORT, () => {
  connectMongoDb();
  console.log(`This server started ${PORT}`);
});
//oOkCIVLE4weETrNK
