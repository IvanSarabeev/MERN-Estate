import { UserSignInData, UserSignUpData, UserUploadData } from 'types/user';
import { 
    signInStart,
    signInSucces,
    signInFailure,
    updatedUserStart, 
    updatedUserSuccess, 
    updatedUserFailure, 
    userState
} from "store/user/userSlice";
import { AppDispatch } from 'store/store';
const postMethod = 'POST';

const urlSignUp: string = "/api/auth/signup";
const urlSignIn: string = "/api/auth/signin";
const urlUpdateUser: string = "/api/user/update";

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
}

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
        throw new Error(`Error message: ${error}`)
    }
}

export const updateUser = async (formData:UserUploadData, dispatch:AppDispatch, currentUser: userState|null) => {
    try {
        dispatch(updatedUserStart())

        const response = await fetch(`${urlUpdateUser}/${currentUser}`, {
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
            return dispatch(updatedUserFailure(data));
        }

        dispatch(updatedUserSuccess(data));

        return data;

    } catch (error) {
        throw new Error(`Error message: ${error}`)
    }
}