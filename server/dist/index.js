"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./middleware/User"));
const AuthMiddleware_1 = __importDefault(require("./middleware/AuthMiddleware"));
const Listing_1 = __importDefault(require("./middleware/Listing"));
const Common_1 = __importDefault(require("./middleware/Common"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const csurf_1 = __importDefault(require("csurf"));
dotenv_1.default.config();
const PORT = process.env.PORT_KEY ?? process.env.RESERVE_PORT;
const DB_URL = process.env.MONGODB_KEY ?? "Empty String";
mongoose_1.default.connect(DB_URL)
    .then(() => {
    console.log('Connected to MongoDB!');
})
    .catch((error) => {
    console.log(error);
});
const __dirname = path_1.default.resolve();
const app = (0, express_1.default)();
// Secure HEADER HTTP
app.use((0, helmet_1.default)({
    // TODO: Secure the content
    contentSecurityPolicy: false,
}));
// DATE SANITIZATION against NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
const httpServer = (0, http_1.createServer)(app);
const socketIo = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});
const csrfProtection = (0, csurf_1.default)({ cookie: true });
socketIo.on('connection', (socket) => {
    console.log('New client connected');
    // Send cookie reminder message to the client
    socket.emit('cookieReminder', 'Please accept our cookies.');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
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
app.use('/api/user', User_1.default);
app.use('/api/auth', AuthMiddleware_1.default);
app.use('/api/listing', Listing_1.default);
app.use('/api', Common_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use((error, req, res, next) => {
    const statusCode = 500;
    const message = error + 'Internal Server Error!';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
    next();
});
