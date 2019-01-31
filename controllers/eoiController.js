// defines controllers for expression of interest

const eoiController = () => {

    const post = (req, res, next) => {
        try {

            // destructure request and set models to an array
            const { newUser, newHost, newEvent } = req;
            const models = [newUser, newHost, newEvent];

            // validate data for all entries before saving to DB
            models.forEach(async model => await model.validate());
            models.forEach(async model => await model.save());

            // Send to next middleware
            next();

        } catch (error) {
            return next(error);
        };
    };

    return {
        post
    };
};

module.exports = eoiController;