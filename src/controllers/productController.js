const mongoose = require('mongoose');
const Product = require('../models/Product');

// - - - - - - - - - SHOW PRODUCTS - - - - - - - - - 
async function showProducts (req,res) {

    const cat = req.query.cat;

    let products;

    try{
        if(cat) products = await Product.find({category:cat});
        else products = await Product.find();
    }catch (err){
        console.error('DB-FIND PRODUCTS ERROR : ',err);
        return res
            .status(500)
            .send('<h1>Ups! algo pasa con el servidor, espere unos minutos porfavor.');
    }

    let html;

    if(req.admin) html = 
        baseHtmlHead() + 
        getNavBar("dashboard") + 
        getProductCards(products,true) + 
        baseHtmlFoot();
    else html = 
        baseHtmlHead() + 
        getNavBar("products") + 
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
            .status(500)
            .send('<h1>Ups! algo pasa con el servidor, espere unos minutos porfavor.');
    }
    if(!product) return res
        .status(400)
        .send('<h1>Error:  parece que esa ID no es válida.</h1>');

    let html;

    if(req.admin) html = 
        baseHtmlHead() + 
        getNavBar("dashboard") +
        getProductDetails(product,true) + 
        baseHtmlFoot();
    else html = 
        baseHtmlHead() + 
        getNavBar("products") +
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
            .status(500)
            .send('<h1>Ups! algo pasa con el servidor, espere unos minutos porfavor.');
    }

    res.redirect(`./dashboard/${product._id}`);
}
// - - - - - - - - - FORM UPDATE PRODUCT - - - - - - - - - 
async function showEditProduct(req,res) {

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
    if(!product) return res
        .status(400)
        .send('<h1>Error:  parece que esa ID no es válida.</h1>');

    const html = 
        baseHtmlHead() + 
        getUpdateForm(product,prodId) + 
        baseHtmlFoot();

    res.status(200).send(html);
}
// - - - - - - - - - UPDATE PRODUCT  - - - - - - - - - 
async function updateProduct(req,res) {

    let product;
    const prod = req.body;
    const id = req.params.productId;

    const sizes = [];

    const sizeXS = prod.sizeXS || '';
    const sizeS = prod.sizeS || '';
    const sizeM = prod.sizeM || '';
    const sizeLS = prod.sizeLS || '';
    const sizeXL = prod.sizeXL || '';

    if(sizeXS)sizes.push(sizeXS);
    if(sizeS)sizes.push(sizeS);
    if(sizeM)sizes.push(sizeM);
    if(sizeLS)sizes.push(sizeLS);
    if(sizeXL)sizes.push(sizeXL);

    const updProduct = {
        name:prod.name,
        description:prod.description,
        category:prod.category,
        size:sizes,
        price:prod.price,
    }

    try{
        product = await Product.findByIdAndUpdate(id,updProduct,{new:true});
    }catch (err){
        console.error('DB-UPDATE PRODUCT ERROR : ',err);
        return res
            .status(500)
            .send('<h1>Ups! algo pasa con el servidor, espere unos minutos porfavor.');
    }
    if(!product) return res
        .status(400)
        .send('<h1>Error:  parece que esa ID no es válida.</h1>');

    res.redirect(`/dashboard/${product._id}`);
}
// - - - - - - - - - DELETE PRODUCT - - - - - - - - - 
async function deleteProduct(req,res) {
    const id = req.params.productId;
    let product;

    try{
        product = await Product.findByIdAndDelete(id);
    }catch (err){
        console.error('DB-DELETE PRODUCT ERROR : ',err);
        return res
            .status(500)
            .send('<h1>Ups! algo pasa con el servidor, espere unos minutos porfavor.');
    }
    if(!product) return res
        .status(400)
        .send('<h1>Error:  parece que esa ID no es válida.</h1>');

    res.redirect(`/dashboard`);
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
            <link rel="stylesheet" href="/public/normalize.css">
            <link rel="stylesheet" href="/public/style.css">
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
function getNavBar(route){
    let createProd='';
    if(route==='dashboard') 
        createProd = `
            <a href="/auth/logout">LOGOUT</a>
            <a href="/dashboard/new">CREAR</a>
        `;

    let html = ` 
        <nav>
            <a href="/${route}/?cat=Camisetas">Camisetas</a>
            <a href="/${route}/?cat=Pantalones">Pantalones</a>
            <a href="/${route}/?cat=Zapatos">Zapatos</a>
            <a href="/${route}/?cat=Accesorios">Accesorios</a>
            <a href="/auth/login">LOGIN</a>
            ${createProd}
            <a href="/${route}">HOME</a>
        </nav>
    `;
    return html;
}
// - - - - - - - - - PRODUCT DETAILS - - - - - - - - - 
function getProductDetails(product,admin){
    let adminDetails = '';
    let html = '<main>';

    const sizes = product.size;
    let sizesDom ='';

    if(sizes)sizes.forEach(s => sizesDom += `${s} `);

        
    if(admin)
        adminDetails=`
            <button onclick="location.href='/dashboard/${product._id}/edit';">
                Modificar
            </button>
            <form action="/dashboard/${product._id}/delete" method="POST">
                <input type="hidden" name="_method" value="DELETE">
                <input type="submit" value="Eliminar">
            </form>   
        `;

    html += `
        <div class="product-detaill">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <h3>${product.category}</h3>
        <p>${product.price}€</p>
        <p>${product.description}</p>
        <p>${sizesDom}</p>
        ${adminDetails}
        </div>
    `;
    

    html += '</main>';
    return html;
}
// - - - - - - - - - PRODUCT CARDS - - - - - - - - - 
function getProductCards(products,admin) {
    let adminDetails = '';
    let details = 'products';
    let html = '<main>';

    for (let product of products) {
        
        if(admin){
            details = 'dashboard';
            adminDetails=`
                <button onclick="location.href='/dashboard/${product._id}/edit';">
                    Modificar
                </button>
                <form action="/dashboard/${product._id}/delete" method="POST">
                    <input type="hidden" name="_method" value="DELETE">
                    <input type="submit" value="Eliminar">
                </form>   
            `;
        }

        html += `
            <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <a href="/${details}/${product._id}">Ver detalle</a>
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
            <input type="number" id="price" name="price"required>

            <br>
            
            <input type="submit" value="Crear">
        </form>
    `;
    
    return html;
}
// - - - - - - - - - UPDATE FORM - - - - - - - - - 
function getUpdateForm(product,id){
    let XS,S,M,LS,XL = '';
    if(product.size.includes('XS'))XS = 'checked';
    if(product.size.includes('S'))S = 'checked';
    if(product.size.includes('M'))M = 'checked';
    if(product.size.includes('LS'))LS = 'checked';
    if(product.size.includes('XL'))XL = 'checked';

    const html = `
        <form action="../${id}" method="post">
        <input type="hidden" name="_method" value="PUT">
            <label for="name">Nombre producto :</label><br>
            <input type="text" id="name" name="name" value="${product.name}" required><br>
            
            <label for="description">Descripción :</label><br>
            <textarea id="description" name="description">
                ${product.description}
            </textarea><br>
            
            <label for="category">Categoría :</label><br>
            <input list="category" name="category" value="${product.category}" required>
            <datalist id="category">
                <option value="Camisetas">
                <option value="Pantalones">
                <option value="Zapatos">
                <option value="Accesorios">
            </datalist><br>

            <input type="checkbox" id="sizeXS" name="sizeXS" value="XS" ${XS}>
            <label for="sizeXS"> XS</label><br>
            <input type="checkbox" id="sizeS" name="sizeS" value="S" ${S}>
            <label for="sizeS"> S</label><br>
            <input type="checkbox" id="sizeM" name="sizeM" value="" ${M}>
            <label for="sizeM"> M</label><br>
            <input type="checkbox" id="sizeLS" name="sizeLS" value="LS" ${LS}>
            <label for="sizeLS"> LS</label><br>
            <input type="checkbox" id="sizeXL" name="sizeXL" value="XL" ${XL}>
            <label for="sizeXL"> XL</label><br>

            <label for="price">Precio :</label>
            <input type="number" id="price" name="price" value="${product.price}" required>

            <br>
            
            <input type="submit" value="Actualizar">
        </form>
    `;
    
    return html;
}