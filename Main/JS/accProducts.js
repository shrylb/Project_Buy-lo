import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db, storage } from "./connect.js";
import { PageRenderer } from "./pageRenderer.js";


const docRef = doc(db, 'Accounts', '7Wl4ixQrFWPiuNlxuUCEkCTwnRI2');
const docSnapshot = await getDoc(docRef);

// Check if the document exists
if (docSnapshot.exists()) {
  // Access the array field within the document
  const dataArray = docSnapshot.data().products;

  // Iterate over the elements of the array using a loop
  dataArray.forEach((element) => {
    console.log(element);

    // createInfo(product);
    // Perform operations on each element
  });
} else {
  console.log('Document does not exist.');
}

