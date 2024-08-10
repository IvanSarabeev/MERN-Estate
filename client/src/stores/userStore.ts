import { makeObservable, observable, action } from "mobx";
import { SignInCredentials, UserDetails, UserSignUpData } from "types/user";
import { authenticateUser, registerNewUser } from './../api/auth';
import { AUTHENTICATION_FAILED, COMMON_ERROR_MESSAGE, USER_REGISTRATION_FAILED } from "./../defines";
import { UserAuthResponse } from "types/api";

class UserStore {
    currentUser: UserDetails | null = null;
    error: string | null = null;
    loading: boolean = false;

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            error: observable,
            loading: observable,
            
            // Region Methods
            signInStart: action,
            UserSuccessSignIn: action,
            signInFailure: action,
            updatedUserStart: action,
            updatedUserSuccess: action,
            updatedUserFailure: action,
            deleteUserStart: action,
            deleteUserSuccess: action,
            deleteUserFailure: action,
            signOutUserStart: action,
            signOutUserSuccess: action,
            signOutUserFailure: action,

            // Region Api Methods
            registerUser: action,
        });
    }

    signInStart() {
        this.loading = true;
    }

    UserSuccessSignIn(user: UserAuthResponse) {
        this.currentUser = user.userData;
        this.loading = false;
        this.error = null;
    }

    signInFailure(error: string) {
        this.error = error;
        this.loading = false;
    }

    updatedUserStart() {
        this.loading = true;
    }

    updatedUserSuccess(user: UserDetails) {
        this.currentUser = user;
        this.loading = false;
        this.error = null;
    }

    updatedUserFailure(error: string) {
        this.error = error;
        this.loading = false;
    }
    

    deleteUserStart() {
        this.loading = true;
    }

    deleteUserSuccess(user: UserDetails | null) {
        this.currentUser = user;
        this.loading = false;
        this.error = null;
    }

    deleteUserFailure(error: string) {
        this.loading = false;
        this.error = error;
    }

    signOutUserStart() {
        this.loading = true;
    }

    signOutUserSuccess(user: UserDetails | null) {
        this.currentUser = user;
        this.loading = false;
        this.error = null;
    }

    signOutUserFailure(error: string) {
        this.error = error;
        this.loading = false;
    }

    registerUser = (formData: UserSignUpData) => {
        return registerNewUser(formData)
            .then(response => {
                if (!response) {
                    return Promise.reject(new Error(response ?? USER_REGISTRATION_FAILED));
                }

                return Promise.resolve(response);
            })
            .catch(error => {
                console.error(`Error during authentication: ${error}`);

                throw new Error(`${COMMON_ERROR_MESSAGE}, ${error}`);
            })
        ;
    }

    loadUserAuthentication = async (UserCredentials: SignInCredentials) => {
        return await authenticateUser(UserCredentials)
            .then(response => {
                console.log(response);

                if (!response.success) {
                    return Promise.reject(new Error(response.message ?? AUTHENTICATION_FAILED));
                }

                return Promise.resolve(response);
            })
            .catch(error => {
                console.error(`${COMMON_ERROR_MESSAGE + AUTHENTICATION_FAILED}: ${error}`);

                throw new Error(`${COMMON_ERROR_MESSAGE}, ${error.message || error}`);
            })
        ;
    }
}

export const userStore = new UserStore();