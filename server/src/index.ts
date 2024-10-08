import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listingRouter from "middleware/Listing";
import authRouter from "middleware/AuthMiddleware";
import commonRouter from "middleware/Common";
import userRouter from "middleware/User";
import healthRouter from "middleware/HealthCheck";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();

const PORT = process.env.PORT_KEY ?? process.env.RESERVE_PORT;
const DB_URL = process.env.MONGODB_KEY ?? "Empty String";

mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.log(error);
    })
;
    
const app = express();

// Enable csrf in front-end
// const csrfProtection = csurf({ cookie: true });

// Secure HEADER HTTP
app.use(helmet({
    contentSecurityPolicy: false, //Secure the content
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
// app.use(session({
//     secret: process.env.SESSION_SECRET || "default_secret", // Session Secret Key
//     saveUninitialized: false, // prevent random Session Objects, living in the Session Store
//     resave: false,
//     cookie: cookieAuthOptions
// }));

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
app.use('/check', healthRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
 
app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = error + 'Internal Server Error!';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message, 
    });

    next();
});