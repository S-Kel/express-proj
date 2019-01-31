// Describes requests made to the /expression-of-interest path 
const express = require('express');

const eoiRoutes = (User, Host, Criteria, EventWBGS) => {

    const eoiRouter = express.Router();

    // Middleware - modify or use request/response object data
    const { eoiRequestValidation } = require('../middleware/validation/JoiValidation');
    const eoiEmail = require('../middleware/email/eoiEmail');
    const clientResponse = require('../middleware/res/clientResponse')();

    // controllers - transport data to/from dB
    const eoiController = require('../controllers/eoiController')(User, Host, Criteria, EventWBGS);

    // endpoints
    eoiRouter.route('/')
        .post(
            eoiRequestValidation,
            eoiController.post,
            // emailEmail,
            clientResponse.send('Your expression of interest has been submitted successfully.')
        );

    return eoiRouter;
};

module.exports = eoiRoutes;