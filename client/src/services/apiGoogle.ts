import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../fireStore/firebase";
import { signInFailure, signInStart, signInSucces } from "store/user/userSlice";
import { AppDispatch } from "store/store";

const googleUrl = "/api/auth/google";
const methodPOST = "POST";

export const googleAuth = async (dispatch: AppDispatch) => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        const result = await signInWithPopup(auth, provider);

        dispatch(signInStart());

        const response = await fetch(googleUrl, {
            method: methodPOST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL 
            }),
        });

        if (!response.ok) {
            throw new Error(`Unable to get Google credentials!
             Status: ${response.status}, message: ${response.statusText}`);
        }

        const data = await response.json();

        // const { token, rest } = data;

        if (data === false) {
            dispatch(signInFailure(data));
            return;
        }

        dispatch(signInSucces(data));

        return data;
    } catch (error) {
        throw new Error(`Unable to fetch, error message occur: ${JSON.stringify(error)}`);
    }
}