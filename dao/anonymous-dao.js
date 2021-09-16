// const anonymousDriver = {
//
// };

const { sqlDate } = require('./utils');

class AnonymousDriver {
    constructor(db) {
        this.db = db;
    }

    async getAirlineById(id) {
        const result = await this.db.raw(`select * from sp_get_airline_by_id('${id}');`);
        return result['rows'][0];
    }
    async getAirlineByUsername(username) {
        const result = await this.db.raw(`select * from sp_get_airline_by_username('${username}');`);
        return result['rows'][0];
    }
    async getAllCountries() {
        const result = await this.db.raw(`select * from sp_get_all_countries();`);
        return result.rows;
    }

    async getAllCustomers() {
        const result = await this.db.raw(`select * from sp_get_all_customers();`);
        return result.rows;
    }
    async getAllAirlines() {
        const result = await this.db.raw(`select * from sp_get_all_airlines();`);
        return result.rows;
    }
    async getAllFlights() {
        const result = await this.db.raw(`select * from sp_get_all_flights();`);
        return result.rows;
    }
    async getAllTickets() {
        const result = await this.db.raw(`select * from sp_get_all_tickets();`);
        return result.rows;
    }
    async getAllUsers() {
        const result = await this.db.raw(`select * from sp_get_all_users();`);
        return result.rows;
    }
    async getArrivalFlights(countryId) {
        const result = await this.db.raw(`select * from sp_get_arrival_flights(${countryId});`);
        return result.rows;
    }
    async getCountryById(id) {
        const result = await this.db.raw(`select * from sp_get_country_by_id('${id}');`);
        return result['rows'][0];
    }
    async getCustomerById(id) {
        const result = await this.db.raw(`select * from sp_get_customer_by_id('${id}');`);
        return result['rows'][0];
    }
    async getCustomerById(id) {
        const result = await this.db.raw(`select * from sp_get_customer_by_id('${id}');`);
        return result['rows'][0];
    }
    async getCustomerByUsername(username) {
        const result = await this.db.raw(`select * from sp_get_customer_by_username('${username}');`);
        return result['rows'][0];
    }
    async getDepartureFlights(countryId) {
        const result = await this.db.raw(`select * from sp_get_departure_flights(${countryId});`);
        return result['rows'];
    }
    async getFlightById(id) {
        const result = await this.db.raw(`select * from sp_get_flight_by_id('${id}');`);
        return result['rows'][0];
    }
    async getFlightsByAirlineId(airlineId) {
        const result = await this.db.raw(`select * from sp_get_flights_by_airline_id('${airlineId}');`);
        return result['rows'];
    }
    async getFlightsByParameters(originCountryId, destinationCountryId, date) {
        date = sqlDate(date);
        const result = await this.db.raw(
            `select * from sp_get_flights_by_parameters('${originCountryId}', '${destinationCountryId}', '${date}');`
        );
        return result['rows'];
    }
    async getTicketById(id) {
        const result = await this.db.raw(`select * from sp_get_ticket_by_id('${id}');`);
        return result['rows'][0];
    }
    async getTicketByCustomerId(customerId) {
        const result = await this.db.raw(`select * from sp_get_tickets_by_customer('${customerId}');`);
        return result['rows'][0];
    }
    async getUserById(id) {
        const result = await this.db.raw(`select * from sp_get_user_by_id('${id}');`);
        return result['rows'][0];
    }
    async getUserByUsername(username) {
        const result = await this.db.raw(`select * from sp_get_user_by_username('${username}');`);
        return result['rows'][0];
    }
}
module.exports = AnonymousDriver;
