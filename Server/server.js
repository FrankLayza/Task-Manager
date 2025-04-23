// import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";
import { connectMongoDb } from "./config/db.js";
// import User from "./models/User.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

// app.use("/api/users", userRoutes );
app.use('/api', userRoutes)

app.listen(5000, () => {
  connectMongoDb();
  console.log(`This server started 5000`);
});
//oOkCIVLE4weETrNK
