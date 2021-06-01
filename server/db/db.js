const knex = require("knex");
const knexConfig = require("../knexfile").development;

// Todo in production: use dependency injection to create knew instance so database
//access can be mocked for tests

// Todo in production: don't access knexfile.development directly but decice with
// env vars which config to use.
const db = knex(knexConfig);

module.exports = db;
