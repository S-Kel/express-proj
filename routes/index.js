// Describes requests made to the / path
const express = require('express');
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req, res, next) {
  res.send('Express app running');
});

module.exports = indexRouter;