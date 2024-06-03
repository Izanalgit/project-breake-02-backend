const express = require('express');
const product = require('../controllers/productController');

const router = express.Router();


//Main view

//Show all products
router.get('/products',product.showProducts);
//Show a detailed product
router.get('/products/:productId',product.showProductById);


//Admon dashboard view

//Show all products (with admin controls)
router.get('/dashboard',product.showProducts);
//Trow create product form
router.get('/dashboard/new',product.showNewProduct);
//Create new product
router.post('/dashboard',product.createProduct);
//Show a detailed product (with admin controls)
router.get('/dashboard/:productId',product.showProductById);
//Trow update product form
router.get('/dashboard/:productId/edit',product.showEditProduct);
//Update a product
router.put('/dashboard/:productId',product.updateProduct);
//Delete a product
router.delete('/dashboard/:productId/delete',product.deleteProduct);


module.exports=router;
