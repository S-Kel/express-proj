const createError = require('http-errors');
const Joi = require('joi');

const eoiRequestValidation = (req, res, next) => {

    // define joi validation schema for request object
    const requestValidation = Joi.object().keys({
        // First name must be a string of alphabetical characters, and is required
        first_name: Joi.string().regex(/^[a-z]+$/i, 'alpha').required(),
        // Last name must be a string of alphabetical characters, and is required
        last_name: Joi.string().regex(/^[a-z]+$/i, 'alpha').required(),
        // Organisation must be a string, and is required
        organisation: Joi.string().required(),
        // Email must be a string in a valid email format, and is required
        email: Joi.string().email().required(),
        // Socials must be an array containing strings in URL format, and is optional
        socials: Joi.array().items(Joi.string().uri()),
        // Description must be a string of text with a maximum length of 5000 characters, and is required (sanitise?)
        description: Joi.string().max(5000).required(),
        // Volunteers must be a boolean, and is required
        volunteers: Joi.boolean().required(),
        // Target value must be a string (e.g. '100-200', '800+'), and is required
        target_value: Joi.string().required(),
        // Location must be an array containing strings (suburb, country), or numbers (postal code), and is required
        location: Joi.array().items(Joi.string(), Joi.number()).required(),
        // Best time must be a string of text with a maximum length of 100 characters, and is required
        best_time: Joi.string().max(100).required(),
        // Local council relationship must be a boolean, and is optional
        local_council_relationship: Joi.boolean(),
        // Local council details must be a string of text with a maximum length of 200 characters, and is optional
        local_council_details: Joi.string().max(200),
        // Key influencers must be an array containing strings, and is optional
        key_influencers: Joi.array().items(Joi.string())
    });

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

module.exports = { eoiRequestValidation };