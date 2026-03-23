import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "dotenv/config.js";
import cookieParser from "cookie-parser";

import connectDB from "./configurations/database.js";

// Routes
import facultyAuthRouter from "./routes/facultyAuth.js";
import facultyRouter from "./routes/facultyRoutes.js";
import hodRouter from "./routes/hodRoutes.js";
import superAdminRouter from "./routes/superAdminRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://aiss-aes-8ju1.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 🔥 connect DB inside request lifecycle
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// routes
app.use("/faculty/auth", facultyAuthRouter);
app.use("/faculty", facultyRouter);
app.use("/faculty/hod", hodRouter);
app.use("/faculty/superadmin", superAdminRouter);

export default app;
