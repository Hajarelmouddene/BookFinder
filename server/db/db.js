const knex = require("knex");
require("dotenv").config();
const environment = process.env.NODE_ENV;
const knexConfig = require("../knexfile")[environment];

// TODO in production: use dependency injection to create new instance so db access can be mocked for tests
const db = knex(knexConfig);

module.exports = db;
