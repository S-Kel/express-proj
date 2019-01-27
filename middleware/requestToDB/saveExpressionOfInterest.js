// saves a new Expression of interest from created user, host and event models
const saveExpressionOfInterest = (req, res, next) => {
    try {
        console.log('in save eoi middleware...', req.newEvent)
        // destructure request and set models to an array
        const { newUser, newHost, newEvent } = req;
        const models = [newUser, newHost, newEvent];

        // validate data for all entries before saving to DB
        models.forEach(async model => await model.validate());
        models.forEach(async model => await model.save());

        // Send ne event to next middleware
        next();

    } catch (error) {
        return next(error);
    };
};

module.exports = saveExpressionOfInterest;