const mongoose = require('mongoose');
const Product = require('../models/Product');

// - - - - - - - - - SHOW PRODUCTS - - - - - - - - - 
async function showProducts (req,res) {

    let products;

    try{
        products = await Product.find();
    }catch (err){
        console.error('DB-FIND PRODUCTS ERROR : ',err);
        return res
            .status(500)
            .send('<h1>Ups! algo pasa con el servidor, espere unos minutos porfavor.');
    }

    const html = 
        baseHtmlHead() + 
        getNavBar() + 
        getProductCards(products) + 
        baseHtmlFoot();

    res.status(200).send(html);
}
// - - - - - - - - - SHOW PRODUCT BY ID - - - - - - - - - 
async function showProductById(req,res) {
    
    const prodId = req.params.productId;
    let product;

    try{
        product = await Product.findById(prodId);
    }catch (err){
        console.error('DB-FIND PRODUCT BY ID ERROR : ',err);
        return res
            .status(400)
            .send('<h1>Error:  parece que esa ID no es válida.</h1>');
    }

    const html = 
        baseHtmlHead() + 
        getProductDetails(product) + 
        baseHtmlFoot();

    res.status(200).send(html);
}
// - - - - - - - - - FORM NEW PRODUCT  - - - - - - - - - 
async function showNewProduct(req,res) {
    const html = 
        baseHtmlHead() + 
        getCreateForm() + 
        baseHtmlFoot();

    res.status(200).send(html);
}
// - - - - - - - - - CREATE NEW PRODUCT - - - - - - - - -  
async function createProduct(req,res) {

    const nProBod = req.body;
    let product;

    console.log(nProBod)

    const imgname = nProBod.name.trim()
    const imgProd= `./public/images/${imgname}.jpg`;


    const sizes = [];

    const sizeXS = nProBod.sizeXS || '';
    const sizeS = nProBod.sizeS || '';
    const sizeM = nProBod.sizeM || '';
    const sizeLS = nProBod.sizeLS || '';
    const sizeXL = nProBod.sizeXL || '';

    if(sizeXS)sizes.push(sizeXS);
    if(sizeS)sizes.push(sizeS);
    if(sizeM)sizes.push(sizeM);
    if(sizeLS)sizes.push(sizeLS);
    if(sizeXL)sizes.push(sizeXL);


    const newProduct = {
        name:nProBod.name,
        description:nProBod.description,
        image:imgProd,
        category:nProBod.category,
        size:sizes,
        price:nProBod.price,
    }

    try{
        product = await Product.create(newProduct);
    }catch (err){
        console.error('DB-CREATE PRODUCT ERROR : ',err);
        return res
            .status(400)
            .send('<h1>Error:  parece que hay campos incorrectos.</h1>');
    }

    res.redirect(`./dashboard/${product._id}`);
}
// - - - - - - - - - FORM UPDATE PRODUCT - - - - - - - - - 
async function showEditProduct(req,res) {
    const html = '<p>nice</p>';

    res.status(200).send(html);
}
// - - - - - - - - - UPDATE PRODUCT  - - - - - - - - - 
async function updateProduct(req,res) {
    const html = '<p>nice</p>';

    res.status(200).send(html);
}
// - - - - - - - - - DELETE PRODUCT - - - - - - - - - 
async function deleteProduct(req,res) {
    const html = '<p>nice</p>';

    res.status(200).send(html);
}

module.exports={
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct,
}


//SSR - SERVER SIDE RENDER

// - - - - - - - - - HEAD - - - - - - - - - 
function baseHtmlHead(){
    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/x-icon" href="./public/images/favicon.ico">
            <link rel="stylesheet" href="./public/normalize.css">
            <link rel="stylesheet" href="./public/style.css">
            <title>Ropa epica</title>
        </head>
        <header>
            <h1>Catálogo epico</h1>
        </header>
        <body>    
    `;
    
    return html;
}
// - - - - - - - - - FOOT - - - - - - - - - 
function baseHtmlFoot(){
    const html = `
        </body>
        </html>    
    `;
    
    return html;
}
// - - - - - - - - - NAVEGATION BAR - - - - - - - - - 
function getNavBar(){
    let html = '<nav>'
    
    html += '<h2>aqui va el navbar, con script? valor hidden en las cards de categoria/button onclick forif categoria</h2>'

    html += '</nav>'
    return html;
}
// - - - - - - - - - PRODUCT DETAILS ON MAIN - - - - - - - - - 
function getProductDetails(product,admin){
    let adminDetails = '';
    let html = '<main>';

    const sizes = product.size;
    let sizesDom ='';

    if(sizes)sizes.forEach(s => sizesDom += `${s} `);

        
    if(admin)
        adminDetails=`
            <a href="/dashboard/${product._id}">Modificar</a>
            <a href="/dashboard/${product._id}/delete">Eliminar</a>    
        `;

    html += `
        <div class="product-detaill">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.price}€</p>
        <p>${product.description}</p>
        <p>${sizesDom}</p>
        ${adminDetails}
        </div>
    `;
    

    html += '</main>';
    return html;
  }
// - - - - - - - - - PRODUCT CARDS ON MAIN - - - - - - - - - 
function getProductCards(products,admin) {
    let adminDetails = '';
    let html = '<main>';

    for (let product of products) {
        
        if(admin)// NOT DELETE -> it shoudnt work :/
            adminDetails=`
                <a href="/dashboard/${product._id}">Modificar</a> 
                <a href="/dashboard/${product._id}/delete">Eliminar</a>    
            `;

        html += `
            <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <a href="/products/${product._id}">Ver detalle</a>
            ${adminDetails}
            </div>
        `;
    }

    html += '</main>';
    return html;
  }

// - - - - - - - - - CREATE FORM - - - - - - - - - 
function getCreateForm(){
    const html = `
        <form action="/dashboard" method="post">
            <label for="name">Nombre producto :</label><br>
            <input type="text" id="name" name="name" value="Gorrocóptero" required><br>
            
            <label for="description">Descripción :</label><br>
            <textarea id="description" name="description">
                Breve descripción del producto...
            </textarea><br>
            
            <label for="category">Categoría :</label><br>
            <input list="category" name="category" required>
            <datalist id="category">
                <option value="Camisetas">
                <option value="Pantalones">
                <option value="Zapatos">
                <option value="Accesorios">
            </datalist><br>

            <input type="checkbox" id="sizeXS" name="sizeXS" value="XS">
            <label for="sizeXS"> XS</label><br>
            <input type="checkbox" id="sizeS" name="sizeS" value="S">
            <label for="sizeS"> S</label><br>
            <input type="checkbox" id="sizeM" name="sizeM" value="M">
            <label for="sizeM"> M</label><br>
            <input type="checkbox" id="sizeLS" name="sizeLS" value="LS">
            <label for="sizeLS"> LS</label><br>
            <input type="checkbox" id="sizeXL" name="sizeXL" value="XL">
            <label for="sizeXL"> XL</label><br>

            <label for="price">Precio :</label>
            <input type="number" id="price" name="price" min="0.01" required>

            <br>
            
            <input type="submit" value="Crear">
        </form>
    `;
    
    return html;
}