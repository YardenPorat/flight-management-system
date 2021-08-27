// knex-connector.js
const knex = require('knex');

function connect(config) {
    return knex(config);
}

module.exports = connect;
