import { UserSignInData, UserSignUpData } from 'types/user';
import { 
    signInStart, 
    signInSucces, 
    signInFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
 } from "store/user/userSlice";
import { AppDispatch } from 'store/store';

const postMethod = 'POST';

const urlSignUp: string = "/api/auth/signup";
const urlSignIn: string = "/api/auth/signin";
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

        console.log('User created successfully');

        return data;
    } catch (error) {
        throw new Error(`Error message occur: ${error}`);
    }
};

export const signInUser = async (formData: UserSignInData, dispatch: AppDispatch) => {
    try {
        dispatch(signInStart());

        const response = await fetch(urlSignIn, {
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

        if (data === false) {
            return dispatch(signInFailure(data));
        }

        dispatch(signInSucces(data));
        
        return data;
    } catch (error) {
        dispatch(signInFailure(error));
        throw new Error(`Error message: ${JSON.stringify(error)}`)
    }
}

export const signOutUser = async (dispatch: AppDispatch) => {
    try {
        dispatch(signOutUserStart());

        const response = await fetch(urlSignOut);

        const data = await response.json();

        if (data.success === false) {
            return dispatch(signOutUserFailure(data));
        }

        dispatch(signOutUserSuccess(data));
    } catch (error) {
        dispatch(signOutUserSuccess(error));
        throw new Error(`Error message: ${error}`);
    }
};