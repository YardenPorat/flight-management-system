const { sqlDate } = require('./utils');
const db = require('../db-generator/db');
const { getFlightById, getTicketById, getAirlineById, getAllFlights } = require('./anonymous-dao');

async function updateAirline({ id, name, countryId, userId }) {
    const result = await db.raw(`select * from sp_update_airline(${id}, '${name}', ${countryId}, ${userId} );`);
    return result;
}

async function insertFlight({
    airlineId,
    originCountryId,
    destinationCountryId,
    departureTime,
    landingTime,
    remainingTickets,
}) {
    if (remainingTickets < 0) {
        throw new Error('Cannot create flight with negative amount of tickets');
    }
    if (originCountryId === destinationCountryId) {
        throw new Error('Cannot create flight with the same origin and destination country');
    }
    if (new Date(departureTime) > new Date(landingTime)) {
        throw new Error('Cannot create flight with departure time greater than landing time');
    }
    const sqlDepartureTime = sqlDate(departureTime);
    const sqlLandingTime = sqlDate(landingTime);
    const result = await db.raw(
        `select * from sp_insert_flight(${airlineId}, ${originCountryId}, ${destinationCountryId}, '${sqlDepartureTime}', '${sqlLandingTime}', ${remainingTickets});`
    );
    return result['rows'][0]['sp_insert_flight'];
}
async function deleteFlight(flightId) {
    const result = await db.raw(`select * from sp_delete_flight(${flightId});`);
    return result['rowCount'];
}
async function insertTicket(flightId, customerId) {
    const result = await db.raw(`select * from sp_insert_ticket(${flightId}, ${customerId});`);
    return result.rows[0]['sp_insert_ticket'];
}
async function updateTicket(id, flightId, customerId) {
    await db.raw(`call sp_update_ticket(${id}, ${flightId}, ${customerId});`);
}

async function updateFlight({
    id,
    airlineId,
    originCountryId,
    destinationCountryId,
    departureTime,
    landingTime,
    remainingTickets,
}) {
    const result = await db.raw(
        `select * from sp_update_flight(${id}, ${airlineId}, ${originCountryId}, ${destinationCountryId}, '${sqlDate(
            departureTime
        )}', '${sqlDate(landingTime)}', ${remainingTickets} );`
    );
    return result['rows'][0];
}

module.exports = {
    updateAirline,
    insertFlight,
    updateFlight,
    updateTicket,
    insertTicket,
    deleteFlight,
    getFlightById,
    getAirlineById,
    getTicketById,
    getAllFlights,
};
