const express = require('express');
const adminDoor = require('../controllers/authController');
const {verifyToken} = require('../middlewares/authMiddleware');

const router = express.Router();


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
    adminDoor.regisAdmin);


//LOGOUT
router.get(
    '/logout',
    verifyToken,
    adminDoor.logout);



module.exports = router;