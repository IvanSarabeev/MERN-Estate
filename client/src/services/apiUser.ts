import {
    updatedUserStart, 
    updatedUserSuccess, 
    updatedUserFailure,
    userState,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} from "store/user/userSlice";
import { AppDispatch } from 'store/store';
import { UserUploadData } from "types/user";

const urlUpdateUser: string = "/api/user/update";
const urlDeleteUser: string = "/api/user/delete";

const postMethod = 'POST';
const deleteMethod = 'DELETE';

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

        const data = await response.json();

        if (!response.ok) {
            dispatch(updatedUserFailure(data.message));
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        dispatch(updatedUserSuccess(data));

        return data;
    } catch (error) {
        dispatch(updatedUserFailure(`Error message: ${error}`));
        throw new Error(`Error message: ${error}`)
    }
}

export const deleteUser = async (dispatch: AppDispatch, currentUser: userState|null) => {
    try {
        dispatch(deleteUserStart());

        const response = await fetch(`${urlDeleteUser}/${currentUser}`, {
            method: deleteMethod,
        });

        const data = await response.json();
        
        if (!response.ok) {
            return dispatch(deleteUserFailure(data.message));
        }

        dispatch(deleteUserSuccess(data));

        return data;
    } catch (error) {
        dispatch(deleteUserFailure(`Error message: ${error}`));
    }
};