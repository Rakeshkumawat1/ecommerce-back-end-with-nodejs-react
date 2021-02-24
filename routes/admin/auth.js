const { text } = require('body-parser');
const express = require('express');

const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidate, validateSigninRequest } = require('../../validators/validateauth');
const router = express.Router();
const { requireSignin } = require('../../common-middleware/auth')




router.post('/auth/signin' ,validateSigninRequest, isRequestValidate,signin());

router.post('/auth/signup',validateSignupRequest, isRequestValidate, signup());

router.post('/auth/signout', requireSignin , signout);





module.exports = router;