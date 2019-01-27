// defines controllers for expression of interest

const eoiController = () => {

    const post = async (req, res, next) => {
        try {

            // destructure request and set models to an array
            const { newUser, newHost, newEvent } = req;

            // validate data for all entries before saving to dB
            await newUser.validate();
            await newHost.validate();
            await newEvent.validate();

            // save data to dB
            await newUser.save();
            await newHost.save();
            await newEvent.save();

            // If validation and save successful, send to next middleware
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