// Describes requests made to the /user path
const express = require('express');
const passport = require('passport');

const usersRoutes = (User) => {
  const usersRouter = express.Router();

  // controllers - transport data to/from dB
  const usersController = require('../controllers/usersController')(User);

  // Register a new user
  usersRouter.route('/register')
    .post(
      usersController.postRegister
    );

  // Login an existing user, using  passport authenticate. Unauthenticated user will recieve a 401 unauthorised error
  usersRouter.route('/login')
    .post(
      passport.authenticate('local'),
      usersController.postLogin
    );

  // Logout the current user
  usersRouter.route('/logout')
    .get(
      usersController.getLogout
    );

  return usersRouter;
};

module.exports = usersRoutes;