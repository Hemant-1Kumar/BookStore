// index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose.connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/book", bookRoute);
app.use("/user", userRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React frontend
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // 👇 use RegExp here instead of "*"
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
