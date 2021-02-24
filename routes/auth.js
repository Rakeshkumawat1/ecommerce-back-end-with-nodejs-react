const { text } = require('body-parser');
const express = require('express');
const { requireSignin } = require('../common-middleware/auth');

const { signup, signin } = require('../controller/auth');
const {  validateSignupRequest, isRequestValidate,validateSigninRequest } = require('../validators/validateauth');
const router = express.Router();



router.post('/signin',validateSigninRequest, isRequestValidate, signin());

router.post('/signup', validateSignupRequest, isRequestValidate, signup());

// router.post('/profile',requireSignin(), (req, res) =>{
    
//     return res.status(200).json({
//         user: "profile"
//     });


// })



module.exports = router;