<?php
// $name = isset($_GET['name']) ? $_GET['name'] : '';
// $id = isset($_GET['id']) ? $_GET['id'] : '';
// $tag = isset($_GET['tag']) ? $_GET['tag'] : '';
// $description = isset($_GET['description']) ? $_GET['description'] : '';
// $authId = isset($_GET['authId']) ? $_GET['authId'] : '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/design2.css">
    <link rel="stylesheet" href="CSS/nav.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"
        integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <title>Product Upload</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

    <script defer src="JS/nav.js"></script></head>
<body>
    <nav class="navbar"></nav>
    <section>
        
    <h1 class="section-title">WELCOME! Upload Your Product Here</h1>
        <div class="upload-form-container">
            <form class="upload-form" id="uploads-form" name="uploads-form" method="post" enctype="multipart/form-data">
                <label id="product-label">Enter Product Name</label>
                <input type="text" name="product-name" id="product-name" placeholder="Product name">
                <label id="product-label">Enter Product Description</label>
                <input type="text" name="product-description" id="product-description" placeholder="Product Description">
                <fieldset>
                    <legend>Choose Product Tag</legend>
                    <input type="radio" id="merchandise" name="tag" value="Merchandise">
                    <label for="merchandise">Merchandise</label><br>
                    <input type="radio" id="school-supplies" name="tag" value="School Supplies">
                    <label for="school-supplies">School Supplies</label><br>
                    <input type="radio" id="food" name="tag" value="Foods">
                    <label for="food">Food/Beverages</label><br>
                    <input type="radio" id="clothes" name="tag" value="Clothes">
                    <label for="clothes">Clothes</label><br>
                    <input type="radio" id="gadgets" name="tag" value="Gadgets">
                    <label for="gadgets">Gadgets</label><br>
                </fieldset>
                <input type="file" id="myFile" name="filename" accept="image/png, image/jpeg" />
                <p>Remember to put nice photos to impress buy-lo traders</p>
                <button id="upload-button" type="button" name="submit">Upload</button>

                <script type="module">
                    import {Authenticator} from "/JS/authenticator.js";
                    import { Model } from "./JS/model.js";


                    const urlParams = new URLSearchParams(window.location.search);
                    const nameParam = urlParams.get('name');
                    const tagParam = urlParams.get('tag');
                    const descriptionParam = urlParams.get('description');
                    const authIdParam = urlParams.get('authId');
                    const idParam = urlParams.get('id');

                    
                        document.getElementById('product-name').value = nameParam;
                    

                    if (tagParam) {
                        document.querySelector(`input[name="tag"][value="${tagParam}"]`).checked = true;
                    }

                    if (descriptionParam) {
                        document.getElementById('product-description').value = descriptionParam;
                    }

                    var fileItem;
                    var fileName;
                    var img = "";
                    const file = document.getElementById("myFile");
                    file.addEventListener("change", e => {

                        fileItem = e.target.files[0];
                        fileName = fileItem.name;
                        console.log(fileItem);
                        console.log(fileName);
                    })

                    const button = document.getElementById("upload-button");
                    button.addEventListener("click", async () => {
                        console.log("click");

                        const model = new Model();
                        const name = document.getElementById("product-name").value;
                        const tag = document.querySelector('input[name="tag"]:checked').value;
                        const description = document.getElementById("product-description").value;
                        
                        img =await model.addPhoto(fileItem);
                        console.log(authIdParam);
                        const data = await model.updateProduct(name, tag, description, img, idParam,authIdParam );


                        
                        alert("Product Uploaded");
                        window.location.href="/AccountPage.html"


                    });



                </script>
            </form>
        </div>
    </section>

    <div id="footer"></div>
</body>
</html>
