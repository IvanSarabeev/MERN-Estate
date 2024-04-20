import { app } from "../fireStore/firebase";
import { AppDispatch } from "store/store";
import { signInFailure, signInStart, signInSucces } from "store/user/userSlice";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const githubUrl = "/api/auth/github";
const methodPOST = "POST";

interface GitHubProp {
    name: string,
    photo: string,
    email: string,
}

export const gitHubAuth = async (dispatch: AppDispatch) => {
    try {
        const provider = new GithubAuthProvider();
        const auth = getAuth(app);

        dispatch(signInStart());
        
        const result = await signInWithPopup(auth, provider);

        const credential = GithubAuthProvider.credentialFromResult(result);
        
        if (!credential) {
            throw new Error(`Unable to get access to GitHub account!`);
        }

        const token = credential.accessToken;

        if (!token) {
            throw new Error(`Token is not found!`);
        }

        const user = result.user;
        const {displayName, email, photoURL } = user;

        const userData = {
            name: displayName,
            photo: photoURL,
        } as GitHubProp;

        if (email !== null && email !== undefined) {
            userData.email = email;
        }

        const response = await fetch(githubUrl, {
            method: methodPOST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`Unable to get Google credentials!
            Status: ${response.status}, message: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data === false) {
            return dispatch(signInFailure(data));
        }

        dispatch(signInSucces(data));

        return data;
    } catch (error) {
        throw new Error(`Authentication failed: ${error}`);
    }
};