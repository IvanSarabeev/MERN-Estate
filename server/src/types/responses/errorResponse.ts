export interface ErrorResponse {
    success: boolean;
    message: string;
    statusCode: number;
    token?: string;
    user?: object
}