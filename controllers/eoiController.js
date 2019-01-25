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

            // Send ne event to next middleware
            res.status(201);
            res.json(newEvent);
            // return next(); // Use this when ready to pass onto email handler        

        } catch (error) {
            return next(error);
        };
    };

    return {
        post
    };
};

module.exports = eoiController;