const { text } = require('body-parser');
const express = require('express');
const { initialData } = require('../../controller/admin/initialData');
const router = express.Router();

router.post('/initialdata' ,initialData);

module.exports = router;