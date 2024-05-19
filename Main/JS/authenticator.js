/**
 * Class that authenticates login of user
 */

import { GoogleAuthProvider, auth, browserSessionPersistence, signInWithPopup } from "./connect.js";


export class Authenticator {

    #key = "firebase:authUser:AIzaSyB9qifivcFXhoiUeoJUd4T-7jYVSDNgxKo:[DEFAULT]";
    async signIn(model){

        await signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            if (user != null) {
                try {
                    auth.setPersistence(browserSessionPersistence);

                } catch (e) {
                    console.log(e);
                }
            await model.createAccount(user);
            }
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log(errorCode, errorMessage, email, credential);
            // ...
            console.log(errorCode);
        });

    }

    async signOut(){
        await auth.signOut();
        sessionStorage.removeItem(this.#key);
    }

    isSignedIn(){
        const user = sessionStorage.getItem(this.#key);
        if (user) {
            return true;
        }else{
            return false;
        }
    }

    getSignedInUserId(){
        const user = sessionStorage.getItem(this.#key);
        if (user) {
            return JSON.parse(user).uid;
        }
    }

    getSignedInUser(){
        const user = sessionStorage.getItem(this.#key);
        if (user) {
            return JSON.parse(user);
        }
    }

    redirect(){
        window.location.assign("/login.html");
    }

    getUserPhoto(){
        const user  = this.getSignedInUser();
        return user.photoURL;
    }
}