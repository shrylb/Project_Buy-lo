import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { auth, db } from "./connect.js";

async function getAccountDetails(auth) {
  return new Promise((resolve) => { // Wrap the listener in a Promise
    auth.onIdTokenChanged(async (user) => {
      if (user) {
        const account = doc(db, "Accounts", user.uid);
        const snap = await getDoc(account);
        const data = snap.data();
        addAccountDetails(data);
        resolve(data); // Resolve the Promise with the data
      } else {
        resolve(null); // Resolve with null when user is not signed in
      }
    });
  });
}

function addAccountDetails(detailsArray) {
  document.getElementById("name").innerHTML = detailsArray["name"];
  document.getElementById("email").innerHTML = detailsArray["email"];
  
  // Set the profile image URL as the src attribute of the img tag
  const accountImg = document.getElementById("account_img");
  accountImg.src = detailsArray["profileImage"]; // Assuming the profile image URL is stored in the "profileImage" field
}

window.addEventListener("load", async () => {
  const array = await getAccountDetails(auth);
});
