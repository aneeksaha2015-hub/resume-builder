// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect to MongoDB
connectDB();

// 2. CORS Configuration (MUST BE BEFORE ROUTES)
// This tells the browser that your specific frontend is allowed to talk to this API
const corsOptions = {
  origin: "https://resume-builder-wojz.onrender.com", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// 3. Handle Preflight Requests
// This explicitly handles the "OPTIONS" request browsers send before a POST/Login
app.options("*", cors(corsOptions));

// 4. Other Middleware
app.use(express.json());

// 5. API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// 6. Catch unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  next();
});

// 7. Serve React frontend build
const clientBuildPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientBuildPath));

// 8. Catch-all route for React Router (exclude API routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// 9. Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
