const AnonymousDriver = require('./anonymous-dao');
const { sqlDate } = require('./utils');

class AirlineDriver extends AnonymousDriver {
    constructor(db) {
        super();
        this.db = db;
    }

    async insertFlight({
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
        const result = await this.db.raw(
            `select * from sp_insert_flight(${airlineId}, ${originCountryId}, ${destinationCountryId}, '${sqlDepartureTime}', '${sqlLandingTime}', ${remainingTickets});`
        );
        return result['rows'][0]['sp_insert_flight'];
    }
    async deleteFlight(flightId) {
        const result = await this.db.raw(`select * from sp_delete_flight(${flightId});`);
        return result['rowCount'];
    }
    async insertTicket(flightId, customerId) {
        const result = await this.db.raw(`select * from sp_insert_ticket(${flightId}, ${customerId});`);
        return result.rows[0]['sp_insert_ticket'];
    }
    async updateTicket(id, flightId, customerId) {
        await this.db.raw(`call sp_update_ticket(${id}, ${flightId}, ${customerId});`);
    }
    async updateAirline({ id, name, countryId, userId }) {
        await this.db.raw(`call sp_update_airline(${id}, '${name}', '${countryId}', ${userId} );`);
    }
    async updateFlight({
        id,
        airlineId,
        originCountryId,
        destinationCountryId,
        departureTime,
        landingTime,
        remainingTickets,
    }) {
        await this.db.raw(
            `call sp_update_flight(${id}, ${airlineId}, ${originCountryId}, ${destinationCountryId}, '${sqlDate(
                departureTime
            )}', '${sqlDate(landingTime)}', ${remainingTickets} );`
        );
    }
}

module.exports = AirlineDriver;
