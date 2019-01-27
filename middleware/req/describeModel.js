// adds a new model with type [string] to request data
const describeModel = (User, Host, EventWBGS) => (model) => (req, res, next) => {
    // destructure request body
    const {
        email,
        first_name,
        last_name,
        organisation,
        socials,
        description,
        volunteers,
        target_value,
        location,
        best_time,
        local_council_relationship,
        local_council_details,
        key_influencers
    } = req.body;

    const { newUser, newHost } = req;

    try {
        let data;
        // new model is created
        switch (model) {
            case 'newUser':
                data = new User({
                    email
                });
                break;
            case 'newHost':
                data = new Host({
                    user: newUser,
                    first_name,
                    last_name,
                    organisation,
                    socials
                });
                break;
            case 'newEvent':
                data = new EventWBGS({
                    host: newHost,
                    description,
                    volunteers,
                    target_value,
                    location,
                    best_time,
                    local_council_relationship,
                    local_council_details,
                    key_influencers
                });
                break;
            default:
                throw ('An appropriate model type must be provided.')
        };

        // add created model to request
        req[model] = data;

        // send to next middleware
        next();
    } catch (error) {
        return next(error);
    };
};

module.exports = describeModel;