const createError = require('http-errors');
const express = require('express');
const { User } = require('../models/User');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        // nonExistentFunction(); // this will fail, causing catch to be executed
        res.status(200).send('Connected to expresson of interest!');
    } catch (error) {
        return next(error);
    };
});

module.exports = router;