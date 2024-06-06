const express = require('express');
const product = require('../controllers/productController');
const {validate} = require('../middlewares/validator');
const {inputValidations,categoryValidation} = require('../models/bodyInput');

const router = express.Router();


//Main view

//Show all products
router.get(
    '/products',
    categoryValidation,
    validate,
    product.showProducts);
//Show a detailed product
router.get('/products/:productId',product.showProductById);


//Admon dashboard view (AUTH MIDDELWARE)

//Show all products (with admin controls)
router.get(
    '/dashboard',
    categoryValidation,
    validate,
    product.showProducts);

//Trow create product form
router.get(
    '/dashboard/new',
    product.showNewProduct);

//Create new product
router.post(
    '/dashboard',
    inputValidations,
    validate,
    product.createProduct);

//Show a detailed product (with admin controls)
router.get(
    '/dashboard/:productId',
    product.showProductById);

//Trow update product form
router.get(
    '/dashboard/:productId/edit',
    product.showEditProduct);

//Update a product
router.put(
    '/dashboard/:productId',
    inputValidations,
    validate,
    product.updateProduct);

//Delete a product
router.delete(
    '/dashboard/:productId/delete',
    product.deleteProduct);


module.exports=router;
