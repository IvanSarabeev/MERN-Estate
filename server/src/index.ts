import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./middleware/User";
import authRouter from "./middleware/AuthMiddleware";
import listingRouter from "./middleware/Listing";
import commonRouter from "./middleware/Common";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import csurf from "csurf";

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