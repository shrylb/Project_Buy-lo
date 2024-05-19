class Product {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

let banana = new Product("Banana", "Images/banana.jpg");
let centuryTuna = new Product("Century Tuna", "Images/century tuna.jfif");
let mouse = new Product("Mouse", "Images/mouse.jfif");
let afritada = new Product("Afritada", "Images/afritada.jfif");
let condom = new Product("Preloved Condom", "Images/condom.jfif");
const products = [banana, centuryTuna, mouse, afritada, condom];

function createCard(product) {
    let card = document.createElement("div");
    let cardContent = document.createElement("div");
    let productImage = document.createElement("img");
    let productDetails = document.createElement("div");
    let productName = document.createElement("h3");

    productImage.src = product.image;
    productImage.alt = product.name;
    productName.innerHTML = product.name;

    card.classList.add("card");
    cardContent.classList.add("card-content");
    productImage.classList.add("product-image");
    productDetails.classList.add("product-details");
    productName.classList.add("product-name");

    productDetails.appendChild(productName);
    cardContent.appendChild(productImage);
    cardContent.appendChild(productDetails);
    card.appendChild(cardContent);
    return card;
}


function addCard(card) {
    let container = document.getElementById("container");
    container.appendChild(card);
}


for (let product of products) {
    let card = createCard(product);
    addCard(card);
}