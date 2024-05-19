/**
 * This file is the class responsible for communicating with the database
 */

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, or, orderBy, query, setDoc, updateDoc, where, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDownloadURL, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { db, storage } from "./connect.js";


class Product {
    constructor(id, name, tag, description, image, userId) {
        this.id  = id;
        this.name = name;
        this.tag = tag;
        this.description = description;
        this.image = image; 
        this.userId = userId;
    }
}

class Notification {
    constructor(id, productId, customerId) {
        this.id  = id;
        this.productId = productId;
        this.customerId = customerId;
    }
}

export class Model {

    async createAccount(user){
        const userData = {
            name: user.displayName,
            email: user.email,
            products: [],
            transactions: [],
            wishlist: [],
            notifications: []
        };

        const account = await this.getAccountById(user.uid);
        
        if (account){
            return;
        }else{
            await setDoc(doc(db, "Accounts", user.uid), userData);
        }
    }


    async search(searchQuery) {
        const products = [];
        const coll = collection(db, "Products");
        const q = query(coll, or(where("tag", "==", `${searchQuery}`), where("name", "==", `${searchQuery}`)));
        const snap = await getDocs(q);


        snap.forEach((doc) => {
            products.push(new Product(doc.id, doc.data()["name"], doc.data()["tag"], doc.data()["description"], doc.data()["image"], doc.data()["owner"]));
            console.log(doc.id);
            
        });
        return products;
    }

    
    async addProduct(name, tag, description, image, authId) {
        const data = {
            name: name,
            tag: tag,
            description: description,
            image: image,
            owner: authId
        };
        const docRef = await addDoc(collection(db, "Products"), data);
        const accProd= doc(db, "Accounts", authId);



        console.log("Document written with ID: ", docRef.id);
        await updateDoc(accProd, {
			products: arrayUnion(docRef.id),
			});
    }


    async updateProduct(name, tag, description, image,id, authId) {
        const data = {
            name: name,
            tag: tag,
            description: description,
            image: image,
            owner: authId
        };
        await updateDoc(doc(db, "Products", id), data);


    }

    async getProducts(){
        const products = [];

        const coll = collection(db, "Products");

        let q = query(coll, where("__name__", ">=", " "),orderBy("__name__"),limit(20));
        
        const snapshot = await getDocs(q);


        snapshot.forEach((doc) => {
            products.push(new Product(doc.id, doc.data()["name"], doc.data()["tag"], doc.data()["description"], doc.data()["image"], doc.data()["owner"]));
            
        });
        return products;
        
    }

    async addPhoto(fileItem){


        const uniqueFileName = crypto.randomUUID();

        
        let storageRef = ref(storage);
        let imageRef = await ref(storageRef, 'images/'+uniqueFileName);

        

        await uploadBytes(imageRef, fileItem);

        let url = await getDownloadURL(imageRef)
        console.log(url);
        return (url);
    }
    
    

    async getProductById(id){
        const coll = doc(db, "Products", id);
        const snapshot = await getDoc(coll);
        const data = snapshot.data();
        return new Product(snapshot.id, data["name"], data["tag"], data["description"], data["image"], data["owner"]);
    }

    

    async getProductsByTag(tag){

        const products = [];
        const coll = collection(db, "Products");
        const q = query(coll, where("tag", "==", `${tag}`));
        const snap = await getDocs(q);


        snap.forEach((doc) => {
            products.push(new Product(doc.id, doc.data()["name"], doc.data()["tag"], doc.data()["description"], doc.data()["image"], doc.data()["owner"]));
            console.log(doc.id);
            
        });
        return products;
    }


    async getTransactionById(id){
        const coll = doc(db, "Transactions", id);
        const snapshot = await getDoc(coll);
        return new Product(snapshot.id, snapshot.data()["name"], snapshot.data()["tag"], snapshot.data()["description"], snapshot.data()["image"]);
    }

    async getAccountById(id){
        const account = doc(db, "Accounts", id);
        const snap = await getDoc(account);
        const data= snap.data();
        return data;
    }


    async addNotification(productId, customerId, uploaderId){
        const data = {
            productId: productId,
            customerId: customerId,
            read: false
        }
        const notificationDoc = await addDoc(collection(db, "Notifications"), data);;
        const account = await doc(db, "Accounts", uploaderId);
        await updateDoc(account, {
			"notifications": arrayUnion(notificationDoc.id),
        });

        console.log("Document written with ID: ", notificationDoc.id);

    }

    async getNotificationsByUserId(userId){
        const notifications = [];
        const account = await this.getAccountById(userId);
        const accountNotificationsArray = account.notifications;
        for (const notificationId of accountNotificationsArray) {

            const notification = await doc(db, "Notifications", notificationId);
            const snap = await getDoc(notification);
            const data = snap.data();
            notifications.push(new Notification(
                snap.id, 
                data["productId"], 
                data["customerId"]));
        }
        return notifications;
    }
    async deleteProduct(id,authId){
        const docRef = doc(db, "Products", id);
        const deleted= await deleteDoc(docRef);

        if (deleted){
            alert("success");
        }


        const fieldDelete= doc(db, "Accounts", authId);


        
        await updateDoc(fieldDelete, {
        products: arrayRemove(id),
        });

  
        

        window.location.href="/AccountPage.html"
    }

    async buyloProduct(name, tag, description, image,id, authId){
        const fieldDelete= doc(db, "Accounts", authId);


        
        

        const data = {
            name: name,
            tag: tag,
            description: description,
            image: image,
            owner: authId
        };
        const transRef = await addDoc(collection(db, "Transactions"), data);

        await updateDoc(fieldDelete, {
            products: arrayRemove(id),
            transactions: arrayUnion(transRef.id)
            }); 

        console.log("Document written with ID: ", transRef.id);
        const delRef = doc(db, "Products", id);
        await deleteDoc(delRef);

        window.location.href="/AccountPage.html"
    }

    }


