import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import commentRouter from "./routes/comment.js";
const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 5002;
const DATABASE = process.env.DATABASE;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));
// Routes
app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
async function start() {
  try {
    await mongoose.connect(`${DATABASE}`);

    app.listen(PORT, () => {
      console.log(`Server listenin in http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
