import {
    updatedUserStart, 
    updatedUserSuccess, 
    updatedUserFailure,
    UserState,
} from "store/user/userSlice";
import { AppDispatch } from 'store/store';
import { UserUploadData } from "types/user";


const urlUpdateUser: string = "/api/user/update";

const postMethod = 'POST';

export const updateUser = async (formData:UserUploadData, dispatch:AppDispatch, currentUser: UserState|null) => {
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

        dispatch(updatedUserSuccess(data));

        return data;
    } catch (error) {
        dispatch(updatedUserFailure(`Error message: ${error}`));
        throw new Error(`Error message: ${error}`)
    }
}