const express = require('express');
const adminDoor = require('../controllers/authController');
const adminDoor_API = require('../controllers-API-REST/authController');
const {verifyToken,verifyToken_API} = require('../middlewares/authMiddleware');
const {validate,validate_API_REST} = require('../middlewares/validator');
const {adminValidations} = require('../models/bodyInput');

const router = express.Router();
const router_API = express.Router();


// - - - - - - - - - - - - - - - - API SSR ROUTER - - - - - - - - - - - - - - - - 

//LOG IN

//form
router.get(
    '/login',
    adminDoor.loginForm);
//action
router.post(
    '/login',
    adminDoor.loginAdmin);


//REGIST

//form
router.get(
    '/regis',
    adminDoor.regisForm);
//action
router.post(
    '/regis',
    adminValidations,
    validate,
    adminDoor.regisAdmin);


//LOGOUT
router.get(
    '/logout',
    verifyToken,
    adminDoor.logout);


// - - - - - - - - - - - - - - - - API RES ROUTER - - - - - - - - - - - - - - - - 

//LOG IN
router_API.post(
    '/login',
    adminDoor_API.loginAdmin);

//REGIST
router_API.post(
    '/regis',
    adminValidations,
    validate_API_REST,
    adminDoor_API.regisAdmin);

//LOGOUT
router_API.get(
    '/logout',
    verifyToken_API,
    adminDoor_API.logout);


module.exports = {router,router_API};