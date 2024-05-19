/**
 * Class that renders elements on the page
 */


export class PageRenderer {

    createCard(product){
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const productImageContainer = document.createElement('div');
        const productName = document.createElement('h4');
        const productTag = document.createElement('p');
        const productImage = document.createElement('img');

        productName.innerText = product.name;
        productTag.innerText = product.description;
        productImage.src = product.image;

        productName.classList.add('card-product-name');
        productImage.classList.add('card-product-image');
        productImageContainer.classList.add('card-product-image-container');
        productTag.classList.add('card-product-tags');
        card.classList.add('card');

        cardBody.appendChild(productImageContainer);
        productImageContainer.appendChild(productImage);
        cardBody.appendChild(productName);
        cardBody.appendChild(productTag);

        card.appendChild(cardBody);

        card.addEventListener('click', () => {
            console.log("hello");
            const object = JSON.stringify(product);
            sessionStorage.setItem(`${product.id}`, object);
            window.document.location.assign(`/products/product.html/${product.name}+${product.tag}?id=${product.id}`);
            
        });
        

        

        return card;

    }
    /**
     * Renders the cards on the page
     */
    renderCards(div, productArray){
        productArray.forEach(product => {
            let card = this.createCard(product);
            div.appendChild(card);
        });
    }

    renderPage(product){
        document.querySelector('.product-big-img').src = product.image;
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-info').innerText = product.description;
    }

    
    createInfo(product, model,authId,headercontent){
        const card = document.createElement('div');
        const header=  document.createElement('h4');
        const cardBody = document.createElement('div');
        const productImageContainer = document.createElement('div');
        const productName = document.createElement('h4');
        const productTag = document.createElement('p');
        const productImage = document.createElement('img');
        const editButton = document.createElement('button');
        const buyloButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        header.innerText=headercontent;
        productName.innerText = product.name;
        productTag.innerText = product.description;
        productImage.src = product.image;

        editButton.innerText="edit";
        deleteButton.innerText="delete";
        buyloButton.innerText="buylo";

        editButton.classList.add('modify-button');
        deleteButton.classList.add('modify-button');
        buyloButton.classList.add('modify-button');

        productName.classList.add('card-product-name');
        productImage.classList.add('card-product-image');
        productImageContainer.classList.add('card-product-image-container');
        productTag.classList.add('card-product-tags');
        card.classList.add('card');

        cardBody.appendChild(header);
        cardBody.appendChild(productImageContainer);
        productImageContainer.appendChild(productImage);
        cardBody.appendChild(productName);
        cardBody.appendChild(productTag);
        cardBody.appendChild(editButton);
        cardBody.appendChild(deleteButton);
        cardBody.appendChild(buyloButton);

        card.appendChild(cardBody);



        deleteButton.addEventListener('click', ()=>{
            console.log(product.id);
            console.log(authId);
            model.deleteProduct(product.id, authId);
        });

        buyloButton.addEventListener('click', ()=>{
            console.log(product.id);
            console.log(authId);
            model.buyloProduct(product.name, product.tag, product.description, product.image, product.id, authId);
        });

        editButton.addEventListener('click', () => {
            const name = encodeURIComponent(product.name);
            const tag = encodeURIComponent(product.tag);
            const description = encodeURIComponent(product.description);
            const image = encodeURIComponent(product.image);
            const id = encodeURIComponent(product.id);
            const encodedAuthId = encodeURIComponent(authId);
          
            const url = `/ProductEdit.php?name=${name}&tag=${tag}&description=${description}&image=${image}&id=${id}&authId=${encodedAuthId}`;
            window.location.assign(url);
          });
          
          


        if(headercontent=="Transactions:"){
            editButton.remove();
            deleteButton.remove();
            buyloButton.remove();
            }

        
        


        return card;

    }
        
    renderInfo(div, productArray, model,authId,headercontent){
        productArray.forEach(product => {
            let card = this.createInfo(product, model,authId,headercontent);
            div.appendChild(card);
        });
    }
    


    addAccountDetails(detailsArray, photoURL) {
        const div = document.querySelector('.details-container');
        const image = document.createElement("img");
        const name = document.createElement("p");
        const email = document.createElement("p");

        const nameLabel = document.createElement("p");
        const emailLabel = document.createElement("p");
        nameLabel.textContent = "Name: ";
        emailLabel.textContent = "Email: ";

        name.setAttribute("id", "name");
        email.setAttribute("id", "email");

        name.innerHTML = detailsArray["name"];
        email.innerHTML = detailsArray["email"];
        
        image.setAttribute("referrerpolicy", "no-referrer");
        image.src = photoURL;

        div.appendChild(image);
        div.appendChild(nameLabel);
        div.appendChild(name);
        div.appendChild(emailLabel);    
        div.appendChild(email);
    }

    createNotification( product, customer){

        const div = document.createElement('div');
        const p = document.createElement('p');

        div.classList.add('notification');

        p.textContent = `${customer} wants to trade your product ${product}!`;

        div.appendChild(p);
        return p;
    }

    async renderNotifications(div, notificationsArray, model){
        notificationsArray.forEach(async(notification) => {
                let product = await model.getProductById(notification.productId);
                let customer = await model.getAccountById(notification.customerId);

                let productName = product.name;
                let customerName = customer.name;

                let card = this.createNotification( productName, customerName);
                div.appendChild(card);
            });
    }
}