const express = require('express');
const { rzp } = require('../controller/payment');
const router = express.Router();

router.get('/rzp', rzp)

module.exports = router