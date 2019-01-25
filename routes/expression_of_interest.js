const express = require('express');

const eoiRoutes = (User, Host, EventWBGS) => {

    const eoiRouter = express.Router();

    // Middleware
    const { eoiRequestValidation } = require('../middleware/validation/JoiValidation');
    const describeUser = require('../middleware/schemasFromRequest/describeUser')(User);
    const describeHost = require('../middleware/schemasFromRequest/describeHost')(Host);
    const describeEvent = require('../middleware/schemasFromRequest/describeEvent')(EventWBGS);
    const emailWBGS = require('../middleware/email/emailWBGS');
    const emailHost = require('../middleware/email/emailHost');

    // controllers
    const eoiController = require('../controllers/eoiController')();

    // endpoints
    eoiRouter.route('/')
        .post(
            eoiRequestValidation,
            describeUser,
            describeHost,
            describeEvent,
            eoiController.post,
            emailWBGS,
            emailHost,
            (req, res) => {
                res.send('Your expression of interest has been submitted successfully.')
            }
        );
    return eoiRouter;
};

module.exports = eoiRoutes;