import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const app=express();
const PORT=process.env.PORT||5000;

connectDB();

app.use(express.json());
app.use(cors({origin:"*"}));

app.use("/api/users",userRouter);
app.use("/api/resumes",resumeRouter);
app.use("/api/ai",aiRouter);

app.get("/api/test",(req,res)=>{res.json({message:"API working"})});

const clientBuildPath=path.join(__dirname,"../client/dist");

app.use(express.static(clientBuildPath));

app.use((req,res)=>{
res.sendFile(path.join(clientBuildPath,"index.html"));
});

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});
