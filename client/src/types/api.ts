import { UserDetails } from "./user";

/**
 * Represents the data returned from the server after successful authentication
 */
export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
}

/**
 *  Contains the extended response that includes user details after authentication
 */
export interface UserAuthResponse extends AuthResponse {
    userData: UserDetails;
}