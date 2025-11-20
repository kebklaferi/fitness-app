import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/register";
import loginRouter from "./routes/login";
import { connectDB } from './db';
import userRouter from "./routes/user";

// Load .env from project root
const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET is not defined in .env! Login will fail until it is set.");
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
connectDB();
// Routes
app.use("/api/register", authRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Wiifit API is running ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
