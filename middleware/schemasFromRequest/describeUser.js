// creates a new user from request data
const describeUser = (User) => (req, res, next) => {
    // destructure request body
    const {
        email
    } = req.body;

    // new user is created
    const newUser = new User({
        email
    });

    // send created user to next middleware
    req.newUser = newUser;
    next();
};

module.exports = describeUser;