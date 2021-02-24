const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/auth');
const { createProduct } = require('../controller/product');
const multer = require('multer');
const shortid = require('shortid');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, 'uploads/')
    },
    filename: function(req, file, cd) {
        cd(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.post('/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);



module.exports = router;