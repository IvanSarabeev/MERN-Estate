import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT_KEY;
const DB_URL = process.env.MONGODB_KEY;

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log(error);
    });
    
const app = express();

app.use(express.json());

// Get info from cookkie
// app.use(cookieParser);

app.listen(PORT, () => {
    console.log("Server is running up");
}).on("error", (error) => {
    throw new Error(error.message);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
 
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error!';

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message, 
    });
});