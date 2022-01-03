const express = require('express');
const { viewProfile } = require('../controller/userProfile');
const router = express.Router();

router.post('/viewProfile', viewProfile);

module.exports = router;