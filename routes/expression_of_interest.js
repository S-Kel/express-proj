const express = require('express');

const eoiRoutes = (User, Host, Event) => {

    const eoiRouter = express.Router();

    // Middleware
    const { eoiRequestValidation } = require('../middleware/validation/JoiValidation');
    const describeUser = require('../middleware/schemasFromRequest/describeUser')(User);
    const describeHost = require('../middleware/schemasFromRequest/describeHost')(Host);
    const describeEvent = require('../middleware/schemasFromRequest/describeEvent')(Event);

    // controllers
    const eoiController = require('../controllers/eoiController')();

    // endpoints
    eoiRouter.route('/')
        .post(eoiRequestValidation, describeUser, describeHost, describeEvent, eoiController.post);
    return eoiRouter;
};

module.exports = eoiRoutes;