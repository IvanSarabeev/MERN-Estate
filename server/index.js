import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import commonRouter from "./routes/common.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import csurf from "csurf";
import nodemailer from "nodemailer";

dotenv.config();

const PORT = process.env.PORT_KEY || 5000;
const DB_URL = process.env.MONGODB_KEY;

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log(error);
    })
;
    
const __dirname = path.resolve();

const app = express();

// Secure HEADER HTTP
app.use(helmet({
    // TODO: Secure the content
    contentSecurityPolicy: false,
}));

// DATE SANITIZATION against NoSQL query injection
app.use(ExpressMongoSanitize());

const httpServer = createServer(app);
const socketIo = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

const csrfProtection = csurf({ cookie: true });

socketIo.on('connection', (socket) => {
    console.log('New client connected');

    // Send cookie reminder message to the client
    socket.emit('cookieReminder', 'Please accept our cookies.');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


app.use(express.json());

app.use(cookieParser());

app.listen(PORT, () => {
    console.log("Server is running up");
}).on("error", (error) => {
    throw new Error(error.message);
});

httpServer.listen(3001, () => {
    console.log('Server Websocket is running correctly');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api', commonRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
 
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error!';

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message, 
    });
});