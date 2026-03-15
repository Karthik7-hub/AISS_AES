//libraries imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'dotenv/config.js';
dotenv.config();



// File imports
import connectDB from "./configurations/database.js";
import sendEmail from "./configurations/nodemailer.js";

// Routes imports
import facultyAuthRouter from "./routes/facultyAuth.js";
import facultyRouter from "./routes/facultyRoutes.js";

const PORT = 5000;
connectDB();

// sendEmail();

const app = express();



app.use(cors());
app.use(express.json());

app.use("/faculty/auth", facultyAuthRouter);
app.use("/faculty", facultyRouter);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});