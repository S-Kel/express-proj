const createError = require('http-errors');
const Joi = require('joi');
const { eoiValidation, adminUpdateValidation } = require('./validationSchemas');

const requestValidation = (type) => (req, res, next) => {

    // choose request validation type and assign to requestValidation
    let requestValidation;
    switch (type) {
        case 'eoi':
            requestValidation = eoiValidation;
            break;
        case 'admin':
            requestValidation = adminUpdateValidation;
            break;
        default:
            requestValidation = {};
            break;
    };

    // define validation options
    const validationOptions = {
        escapeHtml: true,
        stripUnknown: true,
        allowUnknown: true
    };

    // validate data
    const result = Joi.validate(req.body, requestValidation, validationOptions);

    // create new error if joi fails to validate; this error will return before the request is passed to mongoose validation
    if (result.error) next(createError(422, result.error));
    next();
};

module.exports = { requestValidation };