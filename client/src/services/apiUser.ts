import {
    updatedUserStart, 
    updatedUserSuccess, 
    updatedUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} from "store/user/userSlice";
import { AppDispatch, store } from 'store/store';
import { CurrentUserInterface, UserUploadData } from "types/user";
import { CreateListingIntf } from "types/listing";

const urlUpdateUser: string = "/api/user/update";
const urlDeleteUser: string = "/api/user/delete";
const urlGetUser: string = "/api/user";

const postMethod = 'POST';
const deleteMethod = 'DELETE';

interface ApiUserListingProps {
    listing: CreateListingIntf;
}

export const updateUser = async (formData:UserUploadData, dispatch:AppDispatch) => {
    try {
        const currentUser = store.getState().user.currentUser! as CurrentUserInterface;
        const userId = currentUser._id ?? 'defaultUserId';

        dispatch(updatedUserStart())
        
        const response = await fetch(`${urlUpdateUser}/${userId}`, {
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

        if (data.success === false) {
            return dispatch(updatedUserFailure(data));
        }

        dispatch(updatedUserSuccess(data));

        return data;
    } catch (error) {
        dispatch(updatedUserFailure(`Error message: ${error}`));
        throw new Error(`Error message: ${error}`)
    }
}

export const deleteUser = async (dispatch: AppDispatch) => {
    try {
        const currentUser = store.getState().user.currentUser! as CurrentUserInterface;
        const userId = currentUser._id ?? "defaultUser";

        dispatch(deleteUserStart());

        if (!currentUser) {
            throw new Error("currentUser is null or does not have _id property");
        }

        const response = await fetch(`${urlDeleteUser}/${userId}`, {
            method: deleteMethod,
        });

        const data = await response.json();
        
        if (data.success === false) {
            dispatch(deleteUserFailure(data));
        }

        dispatch(deleteUserSuccess(data));

        return data;
    } catch (error) {
        dispatch(deleteUserFailure(`Error message: ${error}`));
    }
};

export const getUser = async ({listing}: ApiUserListingProps) => {
    try {
        const response = await fetch(`${urlGetUser}/${listing.userRef}`);

        console.log(response);

        if (!response.ok) {
            throw new Error(`Status code: ${response.status}, status message: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        throw new Error(`Unexpected error, cound't get user! ${error}`)
    }
};