import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.route.js";
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


app.listen(PORT, () => {
    console.log("Server is running up");
}).on("error", (error) => {
    throw new Error(error.message);
});

app.use('/api/user', UserRouter);
 