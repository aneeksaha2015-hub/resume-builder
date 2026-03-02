import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// 1. CORS Configuration
const corsOptions = {
  origin: "https://resume-builder-wojz.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// 2. The Fix for the "PathError" - Use Regex instead of "*"
app.options(/(.*)/, cors(corsOptions));

app.use(express.json());

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Catch unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

// Serve React frontend build
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
