import axios from "axios";
import { SignInCredentials, UserSignUpData } from "types/user";
import { AUTHENTICATION_FAILED, COMMON_ERROR_MESSAGE, COMMON_EXCEPTION, COMMON_HEADERS, SIGN_IN_API, SIGN_OUT_API, SIGN_UP_API } from "./../defines";
import { authStore } from "stores/authStore";
import { AuthResponse, UserAuthResponse } from "types/api";

/**
 * 
 * @param formData : UserSignUpData
 * @returns <Promise>
 */
export const registerNewUser = async (formData: UserSignUpData): Promise<AuthResponse> => {    
    authStore.signInStart();

    try {
        const response = await axios.post(SIGN_UP_API, formData, {
            headers: COMMON_HEADERS
        });

        const data = response.data;

        authStore.UserSuccessSignIn(data);

        return data;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : COMMON_EXCEPTION;

        authStore.signInFailure(errorMessage);

        throw new Error(errorMessage);
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
    authStore.signInStart();

    try {
        const response = await axios.post<UserAuthResponse>(SIGN_IN_API, UserCredentials, {
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
    authStore.signOutUserStart();
    
    try {
        const { data } = await axios.get(SIGN_OUT_API);

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