import { NextFunction, Request, Response } from "express";
import Jwt from 'jsonwebtoken';
import { errorHandler } from 'utils/Error';

// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 id: string;
//                 email: string;
//             }
//         }
//     }
// }

// // Define a type for Jwt verification callback parameters
// interface JwtCallback {
//     error: Jwt.VerifyErrors | null; // Use Jwt's built-in types for errors
//     user: { [key: string]: IUser } | undefined; // Adjust this based on your JWT payload structure
// }

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const cookieToken = req.cookies.acces_token;

    if (!cookieToken) {
        return next(errorHandler(401, 'Fatal: Unautorized'));
    }

    Jwt.verify(cookieToken, process.env.JWT_SECRET ?? '', (error: Jwt.VerifyErrors | null) => {
        if (error) {
            return next(errorHandler(403, 'Forbidden'));
        }
        
        next();
    });
};