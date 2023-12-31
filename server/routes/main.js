const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');

router.get('/', homeController.getIndex);
router.get('/signup', userController.getSignUp);
router.post('/postsignup', userController.postSignUp);
router.get('/login', userController.getLogIn);
router.post('/postlogin', userController.postLogIn);
router.get('/logout', userController.getLogOut);
module.exports = router;