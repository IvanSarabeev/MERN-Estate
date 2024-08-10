import { UserSignUpData } from 'types/user';
import {
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
 } from "store/user/userSlice";
import { AppDispatch } from 'store/store';

const postMethod = 'POST';

const urlSignUp: string = "/api/auth/signup";
const urlSignOut: string = "/api/auth/signout";

export const registerUser = async (formData: UserSignUpData) => {
    try {
        const response = await fetch(urlSignUp, {
            method: postMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error(`Error message occur: ${error}`);
    }
};


export const signOutUser = async (dispatch: AppDispatch) => {
    try {
        dispatch(signOutUserStart());

        const response = await fetch(urlSignOut);

        const data = await response.json();

        if (data.success === false) {
            return dispatch(signOutUserFailure(data));
        }

        return dispatch(signOutUserSuccess(data));
    } catch (error) {
        dispatch(signOutUserSuccess(error));
        throw new Error(`Error message: ${JSON.stringify(error)}`);
    }
};