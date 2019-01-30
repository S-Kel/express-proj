const express = require('express');
const dashboardRouter = express.Router();

dashboardRouter.route('/')
    .get((req, res, next) => {
        res.send('reached dashboard');
    });

module.exports = dashboardRouter;