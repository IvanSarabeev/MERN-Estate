import Jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const cookieToken = req.cookies.acces_token;

    if (!cookieToken) {
        return next(errorHandler(401, 'Unautorized'));
    }

    Jwt.verify(cookieToken, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return next(errorHandler(403, 'Forbidden'));
        }

        req.user = user;
        next();
    });
};