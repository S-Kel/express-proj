const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(200).send('Connected to expresson of interest!')
});

module.exports = router;