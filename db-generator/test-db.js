const config = require('config');
const dbConfig = config.get('test-db');
const knex = require('./knex-connector');
const db = knex(dbConfig);

module.exports = db;
