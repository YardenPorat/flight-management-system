const db = require('../db-generator/test-db');
const { insertCustomer, updateCustomer, upsertCustomer } = require('./shared-functions');
const anonymousDao = require('./anonymous-dao');
const airlineDao = require('./airline-dao');
const { validatePassword } = require('./validators');

async function deleteAll() {
    await db.raw(`call sp_delete_all();`);
}

async function deleteAirline(airlineId) {
    const result = await db.raw(`select * from sp_delete_airline(${airlineId});`);
    return result['rowCount'];
}

async function deleteCountry(airlineId) {
    const result = await db.raw(`select * from sp_delete_country(${airlineId});`);
    return result['rowCount'];
}
async function deleteCustomer(customerId) {
    const result = await db.raw(`select * from sp_delete_customer(${customerId});`);
    return result['rowCount'];
}

async function deleteTicket(ticketId) {
    const result = await db.raw(`select * from sp_delete_ticket(${ticketId});`);
    return result['rowCount'];
}
async function deleteUser(userId) {
    const result = await db.raw(`select * from sp_delete_user(${userId});`);
    return result['rowCount'];
}
async function insertAirline({ airlineName, countryId, userId }) {
    const result = await db.raw(`select * from sp_insert_airline('${airlineName}', ${countryId}, ${userId});`);
    return result['rows'][0]['sp_insert_airline'];
}
async function insertCountry(name) {
    const result = await db.raw(`select * from sp_insert_country('${name}');`);
    return result['rows'][0]['sp_insert_country'];
}

async function insertUser(name, password, email) {
    validatePassword(password);
    const result = await db.raw(`select * from sp_insert_user('${name}', '${password}', '${email}');`);
    return result['rows'][0]['sp_insert_user'];
}

async function updateUser({ id, username, password, email }) {
    validatePassword(password);
    await db.raw(`call sp_update_user('${id}', '${username}', '${password}', '${email}');`);
}
async function updateCountry(id, name) {
    await db.raw(`call sp_update_country(${id}, '${name}');`);
}

async function upsertAirline(name, countryId, userId) {
    const result = await db.raw(`select * from sp_upsert_airline('${name}', ${countryId}, ${userId} );`);
    return result.rows[0]['sp_upsert_airline'];
}

async function upsertUser(name, password, email) {
    const result = await db.raw(`select * from sp_upsert_user('${name}', '${password}', '${email}');`);
    return result.rows[0]['sp_upsert_user'];
}
module.exports = {
    ...anonymousDao,
    ...airlineDao,
    deleteAirline,
    deleteAll,
    deleteCountry,
    deleteCustomer,
    deleteTicket,
    deleteUser,
    insertAirline,
    insertCountry,
    insertCustomer,
    insertUser,
    updateCountry,
    updateCustomer,
    updateUser,
    upsertAirline,
    upsertCustomer,
    upsertUser,
};
