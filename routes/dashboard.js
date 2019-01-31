const express = require('express');

const dashboardRoutes = (EventWBGS) => {

    const dashboardRouter = express.Router();

    // controllers - transport data to/from dB
    const dashboardController = require('../controllers/dashboardController')(EventWBGS);

    dashboardRouter.route('/')
        .get(
            dashboardController.getDashboard
        );
    dashboardRouter.route('/shortlist')
        .get(
            dashboardController.getShortlist
        );

    dashboardRouter.route('/:id')
        .get(
            dashboardController.getDashboard
        )
        .put(
            dashboardController.updateDashboard
        );

    return dashboardRouter;
};

module.exports = dashboardRoutes;