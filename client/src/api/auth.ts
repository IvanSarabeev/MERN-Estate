import axios from "axios";
import { SignInCredentials, UserSignUpData } from "types/user";
import { AUTHENTICATION_FAILED, COMMON_ERROR_MESSAGE, COMMON_EXCEPTION, COMMON_HEADERS } from "./../defines";
import { authStore } from "stores/authStore";
import { AuthResponse, UserAuthResponse } from "types/api";

/**
 * 
 * @param formData : UserSignUpData
 * @returns <Promise>
 */
export const registerNewUser = async (formData: UserSignUpData): Promise<AuthResponse> => {
    const url = "/api/auth/signup";
    
    authStore.signInStart();

    try {
        const { data } = await axios.post(url, formData, {
            headers: COMMON_HEADERS
        });

        authStore.UserSuccessSignIn(data);

        return data;
    } catch (error) {
        console.error(error);

        authStore.signInFailure(`${COMMON_EXCEPTION}, ${error}`);

        throw new Error(`${COMMON_EXCEPTION}, ${error}`);
    }
};

/**
 * Authenticates the user by sending the sign-in data to the server.
 * 
 * @param {UserSignInData} UserCredentials - The sign-in data containing email and password.
 * @returns {Promise<UserAuthResponse>} - A promise that resolves with the authenticated user data and token.
 * @throws {Error} - Throws an error if the authentication fails.
 */
export const authenticateUser = async (UserCredentials: SignInCredentials): Promise<UserAuthResponse> => {
    const url = "/api/auth/signin";

    authStore.signInStart();

    try {
        const response = await axios.post<UserAuthResponse>(url, UserCredentials, {
            headers: COMMON_HEADERS,
        });    

        const data = response.data;

        if (data.success === false) {
            throw new Error(`${AUTHENTICATION_FAILED}: ${data.message}`);
        }

        authStore.UserSuccessSignIn(data);

        return data;
    } catch (error) {
        console.error(error);

        authStore.signInFailure(`${COMMON_ERROR_MESSAGE}, ${JSON.stringify(error)}`);

        throw new Error(`${COMMON_ERROR_MESSAGE}: ${JSON.stringify(error)}`);
    }
};

/**
 * Logout the user from the system
 * 
 * @returns <Promise | void>
 */
export const signOutUser = async () => {
    const url = "/api/auth/signout";

    authStore.signOutUserStart();
    
    try {
        const { data } = await axios.get(url);

        if (data.success === false) {
            return data;
        }

        authStore.signOutUserSuccess(data);

        return data;

    } catch (error) {
        console.error(error);

        authStore.signOutUserFailure(`${COMMON_ERROR_MESSAGE}, ${JSON.stringify(error)}`);

        throw new Error(`Error message: ${JSON.stringify(error)}`);
    }
}