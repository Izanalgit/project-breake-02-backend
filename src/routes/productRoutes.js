const express = require('express');
const product = require('../controllers/productController');
const product_API = require('../controllers-API-REST/productController');
const {validate,validate_API_REST} = require('../middlewares/validator');
const {inputValidations,categoryValidation} = require('../models/bodyInput');
const {verifyToken,verifyToken_API} = require('../middlewares/authMiddleware');

const router = express.Router();
const router_API = express.Router();


// - - - - - - - - - - - - - - - - API SSR ROUTER - - - - - - - - - - - - - - - - 

//Main view

//Show all products
router.get(
    '/products',
    categoryValidation,
    validate,
    product.showProducts);
//Show a detailed product
router.get(
    '/products/:productId',
    product.showProductById
);


//Admon dashboard view (AUTH MIDDELWARE)

//Show all products (with admin controls)
router.get(
    '/dashboard',
    verifyToken,
    categoryValidation,
    validate,
    product.showProducts);

//Trow create product form
router.get(
    '/dashboard/new',
    verifyToken,
    product.showNewProduct);

//Create new product
router.post(
    '/dashboard',
    verifyToken,
    inputValidations,
    validate,
    product.createProduct);

//Show a detailed product (with admin controls)
router.get(
    '/dashboard/:productId',
    verifyToken,
    product.showProductById);

//Trow update product form
router.get(
    '/dashboard/:productId/edit',
    verifyToken,
    product.showEditProduct);

//Update a product
router.put(
    '/dashboard/:productId',
    verifyToken,
    inputValidations,
    validate,
    product.updateProduct);

//Delete a product
router.delete(
    '/dashboard/:productId/delete',
    verifyToken,
    product.deleteProduct);


// - - - - - - - - - - - - - - - - API RES ROUTER - - - - - - - - - - - - - - - - 

//Show all products
router_API.get(
    '/products',
    categoryValidation,
    validate_API_REST,
    product_API.showProducts);

//Create new product
router_API.post(
    '/dashboard',
    verifyToken_API,
    inputValidations,
    validate_API_REST,
    product_API.createProduct);

//Show a detailed product
router_API.get(
    '/products/:productId',
    product_API.showProductById);

//Update a product
router_API.put(
    '/dashboard/:productId',
    verifyToken_API,
    inputValidations,
    validate_API_REST,
    product_API.updateProduct);

//Delete a product
router_API.delete(
    '/dashboard/:productId/delete',
    verifyToken_API,
    product_API.deleteProduct);


module.exports={router,router_API};
