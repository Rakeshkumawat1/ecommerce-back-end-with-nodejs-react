const express = require('express');
const { userMiddleware, requireSignin } = require('../common-middleware/auth');
const { addItemToCart } = require('../controller/cart');

const router = express.Router();

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);
// router.get('/getcategory', getCategories);

module.exports = router;