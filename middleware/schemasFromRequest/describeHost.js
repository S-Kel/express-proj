// creates a new WBGS host from request data
const describeHost = (Host) => (req, res, next) => {
    // destructure request body, request
    const {
        first_name,
        last_name,
        organisation,
        socials
    } = req.body;

    const { newUser } = req;

    // new host is created
    const newHost = new Host({
        user: newUser,
        first_name,
        last_name,
        organisation,
        socials
    });

    // send created host to next middleware
    req.newHost = newHost;
    next();
};

module.exports = describeHost;