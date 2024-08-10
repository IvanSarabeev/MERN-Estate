import axios from "axios";
import { SignInCredentials, UserSignUpData } from "types/user";
import { AUTHENTICATION_FAILED, COMMON_ERROR_MESSAGE, COMMON_EXCEPTION, COMMON_HEADERS } from "./../defines";
import { userStore } from "stores/userStore";
import { AuthResponse, UserAuthResponse } from "types/api";

const api = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === "production"
        ? import.meta.env.VITE_DOMAIN_ORIGIN
        : import.meta.env.VITE_LOCAL_DOMAIN,
        withCredentials: true // Important ! For sending cookies
});

/**
 * 
 * @param formData : UserSignUpData
 * @returns <Promise>
 */
export const registerNewUser = async (formData: UserSignUpData): Promise<AuthResponse> => {
    const url = "/api/auth/signup";
    
    userStore.signInStart();

    try {
        const { data } = await axios.post(url, formData, {
            headers: COMMON_HEADERS
        });

        userStore.UserSuccessSignIn(data);

        return data;
    } catch (error) {
        console.error(error);

        userStore.signInFailure(`${COMMON_EXCEPTION}, ${error}`);

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

    userStore.signInStart();

    try {
        const response = await api.post<UserAuthResponse>(url, UserCredentials, {
            headers: COMMON_HEADERS,
        });    

        const data = response.data;

        if (data.success === false) {
            throw new Error(`${AUTHENTICATION_FAILED}: ${data.message}`);
        }

        userStore.UserSuccessSignIn(data);

        return data;
    } catch (error) {
        console.error(error);

        userStore.signInFailure(`${COMMON_ERROR_MESSAGE}, ${JSON.stringify(error)}`);

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

    userStore.signOutUserStart();
    
    try {
        const { data } = await axios.get(url);

        if (data.success === false) {
            return data;
        }

        userStore.signOutUserSuccess(data);

        return data;

    } catch (error) {
        console.error(error);

        userStore.signOutUserFailure(`${COMMON_ERROR_MESSAGE}, ${JSON.stringify(error)}`);

        throw new Error(`Error message: ${JSON.stringify(error)}`);
    }
}