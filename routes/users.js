// Describes requests made to the /user path
const express = require('express');
const { User } = require('../models/User');
const passport = require('passport');
const usersRouter = express.Router();

// Register a new user
usersRouter.post('/register', (req, res) => {
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
      res.status(200).json(req.user.email);
    });
  });
});

// Login an existing user, using  passport authenticate. Unauthenticated user will recieve a 401 unauthorised error
usersRouter.post('/login', passport.authenticate('local'), (req, res) => {
  req.session.role = req.user.role || 'guest';
  res.status(200).json(req.user.email);
});

// Logout the current user
usersRouter.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = usersRouter;