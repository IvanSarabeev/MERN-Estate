import { app } from "../lib/firebase";
import { AppDispatch } from "store/store";
import { signInFailure, signInStart, signInSucces } from "store/user/userSlice";
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const methodPOST = "POST";

interface GitHubProp {
    name: string,
    photo: string,
    email: string,
}

export const googleAuthentication = async (dispatch: AppDispatch) => {
    const googleUrl = "/api/auth/google";

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

export const githubAuthentication = async (dispatch: AppDispatch) => {
    const githubUrl = "/api/auth/github";

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