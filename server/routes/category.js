const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware/auth');
const { addCategory, getCategories } = require('../controller/category');

const router = express.Router();

const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, 'uploads/')
    },
    filename: function(req, file, cd) {
        cd(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.post('/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/getcategory', getCategories);

module.exports = router;