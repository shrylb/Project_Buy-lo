import { collection, getDocs, or, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "./connect.js";

export async function search(searchQuery) {
    const coll = collection(db, "Products");
    const q = query(coll, or(where("tag", "==", `${searchQuery}`), where("name", "==", `${searchQuery}`)));

    const snap = await getDocs(q);
    snap.forEach((doc) => {
        console.log(snap);
        console.log(doc.data());
    });
}