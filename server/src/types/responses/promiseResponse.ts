export interface SignInAuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: object;
}

export interface SignUpAuthResponse {
    success: boolean;
    message: string;
}

export interface GeneralResponse {
    success: boolean;
    message: string;
}