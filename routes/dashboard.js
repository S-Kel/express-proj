const express = require('express');

const dashboardRoutes = (EventWBGS) => {

    const dashboardRouter = express.Router();

    // middlewware
    const { adminUpdateValidation } = require('../middleware/validation/JoiValidation');
    const deniedEmail = require('../middleware/email/deniedEmail');
    const clientResponse = require('../middleware/res/clientResponse')();

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
            adminUpdateValidation,
            dashboardController.updateDashboard,
            // deniedEmail,
            clientResponse.send('An email has been sent to the prospective host explaining reason for denial.')
        );

    return dashboardRouter;
};

module.exports = dashboardRoutes;