const cors = require('cors');
const express = require('express');
const { queryParserMw } = require('../middlewares/parser');
const users = require('../routes/users');

/**
 * Use all the routes and middleware from the api folder
 * @param {express.Express} app
 */
module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('*', queryParserMw);
  app.use('/users', users);
};
