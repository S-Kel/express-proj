// defines controllers which transport data to/from dB for users
const usersController = (User) => {
    const passport = require('passport');

    // User register controller
    const postRegister = (req, res, next) => {
        try {
            // Add newly registered user to dB
            User.register(new User({
                email: req.body.email,
                role: 'user'
            }), req.body.password, (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                // Log the new user in (Passport will create a session) using the local strategy
                passport.authenticate('local')(req, res, () => {
                    req.session.role = req.user.role || 'guest';
                    res.status(200).json({ email: req.user.email, role: req.user.role });
                });
            });

        } catch (error) {
            return next(error);
        };
    };

    // User login controller
    const postLogin = (req, res, next) => {
        try {
            req.session.role = req.user.role || 'guest';
            res.status(200).json({ email: req.user.email, role: req.user.role });
        } catch (error) {
            return next(error);
        };
    };

    // User logout controller
    const getLogout = (req, res, next) => {
        try {
            req.logout();
            res.sendStatus(200);
        } catch (error) {
            return next(error);
        };
    };

    const verifyUserToken = (req, res, next) => {
        console.log(req.headers)
        if (!req.headers.user || req.headers.user === 'null') {
            // set default user role to session
            req.session.role = 'guest';
            next();
        } else {
            // find user in header and add user role to session
            User.find({ email: req.headers.user }).select('role')
                .exec((err, user) => {
                    if (err) return next(err);
                    console.log(req.headers.user)
                    req.session.role = user[0].role || 'guest';
                    next();
                });
        }
    }

    return {
        postRegister,
        postLogin,
        getLogout,
        verifyUserToken
    };
};

module.exports = usersController;