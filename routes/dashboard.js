const express = require('express');

const dashboardRoutes = (EventWBGS) => {

    const dashboardRouter = express.Router();

    // controllers - transport data to/from dB
    const dashboardController = require('../controllers/dashboardController')(EventWBGS);

    dashboardRouter.route('/')
        .get(
            dashboardController.getDashboard
        );

    return dashboardRouter;
};

module.exports = dashboardRoutes;