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
            .json({message:'Ups! algo pasa con el servidor, espere unos minutos porfavor.'});
    }


    res.status(200).json({products});
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
            .json({message:'Ups! algo pasa con el servidor, espere unos minutos porfavor.'});
    }
    if(!product) return res
        .status(400)
        .json({message:'Error : parece que esa ID no es válida.'});

    
        res.status(200).json({product});
}
// - - - - - - - - - CREATE NEW PRODUCT - - - - - - - - -  
async function createProduct(req,res) {

    const nProBod = req.body;
    let product;

    const imgname = nProBod.name.trim()
    const imgProd= `/images/${imgname}.jpg`;


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
            .json({message:'Ups! algo pasa con el servidor, espere unos minutos porfavor.'});
    }

    res.status(200).json({product});
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
            .json({message:'Ups! algo pasa con el servidor, espere unos minutos porfavor.'});
    }
    if(!product) return res
        .status(400)
        .json({message:'Error:  parece que esa ID no es válida.'});

        res.status(200).json({product});
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
            .json({message:'Ups! algo pasa con el servidor, espere unos minutos porfavor.'});
    }
    if(!product) return res
        .status(400)
        .json({message:'Error:  parece que esa ID no es válida.'});

    res
        .status(200)
        .json({message:'Producto eliminado con exito !'});
}

module.exports={
    showProducts,
    showProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}
