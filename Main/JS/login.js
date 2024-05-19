import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { GoogleAuthProvider, auth, browserSessionPersistence, signInWithPopup } from "./connect.js";

import { db } from "./connect.js";


const provider = new GoogleAuthProvider();

function signIn( auth, provider) {
    signInWithPopup(auth, provider)
        .then(async(result) => {
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
                await createAccount(user);
                window.location.assign("homepage.html");
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

async function createAccount(user) {
    const userData = {
        name: user.displayName,
        email: user.email,
        products: [],
        transactions: [],
        wishlist: []
    };
    await setDoc(doc(db, "Accounts", user.uid), userData);
}


document.getElementById("google-login").addEventListener("click", () => {
    signIn(auth, provider);
});