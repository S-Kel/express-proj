const createError = require('http-errors');
const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        res.status(200).send('Connected to expresson of interest!');
    } catch (error) {
        return next(createError(error));
    };
    // if (2 !== 1) {
    //     return next(createError(503, 'Error receiving expression of interest'));
    // }
    // res.status(200).send('Connected to expresson of interest!');
});

module.exports = router;