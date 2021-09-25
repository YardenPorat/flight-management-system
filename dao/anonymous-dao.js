const db = require('../db-generator/test-db');

const { sqlDate } = require('./utils');

async function getAllAirlines() {
    const result = await db.raw(`select * from sp_get_all_airlines();`);
    return result.rows;
}
async function getAirlineById(id) {
    const result = await db.raw(`select * from sp_get_airline_by_id('${id}');`);
    return result['rows'][0];
}
async function getAirlineByUsername(username) {
    const result = await db.raw(`select * from sp_get_airline_by_username('${username}');`);
    return result['rows'][0];
}

async function getAllCountries() {
    const result = await db.raw(`select * from sp_get_all_countries();`);
    return result.rows;
}

async function getAllCustomers() {
    const result = await db.raw(`select * from sp_get_all_customers();`);
    return result.rows;
}

async function getAllFlights() {
    const result = await db.raw(`select * from sp_get_all_flights();`);
    return result.rows;
}
async function getAllTickets() {
    const result = await db.raw(`select * from sp_get_all_tickets();`);
    return result.rows;
}
async function getAllUsers() {
    const result = await db.raw(`select * from sp_get_all_users();`);
    return result.rows;
}
async function getArrivalFlights(countryId) {
    const result = await db.raw(`select * from sp_get_arrival_flights(${countryId});`);
    return result.rows;
}
async function getCountryById(id) {
    const result = await db.raw(`select * from sp_get_country_by_id('${id}');`);
    return result['rows'][0];
}
async function getCustomerById(id) {
    const result = await db.raw(`select * from sp_get_customer_by_id('${id}');`);
    return result['rows'][0];
}

async function getCustomerByUsername(username) {
    const result = await db.raw(`select * from sp_get_customer_by_username('${username}');`);
    return result['rows'][0];
}
async function getDepartureFlights(countryId) {
    const result = await db.raw(`select * from sp_get_departure_flights(${countryId});`);
    return result['rows'];
}
async function getFlightById(id) {
    const result = await db.raw(`select * from sp_get_flight_by_id('${id}');`);
    return result['rows'][0];
}
async function getFlightsByAirlineId(airlineId) {
    const result = await db.raw(`select * from sp_get_flights_by_airline_id('${airlineId}');`);
    return result['rows'];
}
async function getFlightsByParameters(originCountryId, destinationCountryId, date) {
    date = sqlDate(date);
    const result = await db.raw(
        `select * from sp_get_flights_by_parameters('${originCountryId}', '${destinationCountryId}', '${date}');`
    );
    return result['rows'];
}
async function getTicketById(id) {
    const result = await db.raw(`select * from sp_get_ticket_by_id('${id}');`);
    return result['rows'][0];
}
async function getTicketByCustomerId(customerId) {
    const result = await db.raw(`select * from sp_get_tickets_by_customer('${customerId}');`);
    return result['rows'][0];
}
async function getUserById(id) {
    const result = await db.raw(`select * from sp_get_user_by_id('${id}');`);
    return result['rows'][0];
}
async function getUserByUsername(username) {
    const result = await db.raw(`select * from sp_get_user_by_username('${username}');`);
    return result['rows'][0];
}
module.exports = {
    getAirlineById,
    getAirlineByUsername,
    getAllAirlines,
    getAllCountries,
    getAllCustomers,
    getCustomerById,
    getCustomerByUsername,
    getUserById,
    getUserByUsername,
    getAllUsers,
    getTicketByCustomerId,
    getTicketById,
    getAllFlights,
    getAllTickets,
    getCountryById,
    getArrivalFlights,
    getDepartureFlights,
    getFlightsByParameters,
    getFlightsByAirlineId,
    getFlightById,
};
