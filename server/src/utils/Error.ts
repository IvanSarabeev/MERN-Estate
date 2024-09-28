import { ErrorResponse } from "types/responses/errorResponse";

export const errorHandler = (statusCode: number, message: string): ErrorResponse => {
    return {
        success: false,
        statusCode: statusCode,
        message: message,
    };
}