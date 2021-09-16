const AirlineDriver = require('./airline-dao');
const { insertCustomer, updateCustomer, upsertCustomer } = require('./shared-functions');
const { validatePassword } = require('./validators');

class AdminDriver extends AirlineDriver {
    constructor(db) {
        super();
        this.db = db;
    }

    async insertAirline({ airlineName, countryId, userId }) {
        const result = await this.db.raw(`select * from sp_insert_airline('${airlineName}', ${countryId}, ${userId});`);
        return result['rows'][0]['sp_insert_airline'];
    }
    async insertUser(username, password, email) {
        validatePassword(password);
        const result = await this.db.raw(`select * from sp_insert_user('${username}', '${password}', '${email}');`);
        return result['rows'][0]['sp_insert_user'];
    }
    async updateUser({ id, username, password, email }) {
        validatePassword(password);
        await this.db.raw(`call sp_update_user('${id}', '${username}', '${password}', '${email}');`);
    }
    async insertCountry(name) {
        const result = await this.db.raw(`select * from sp_insert_country('${name}');`);
        return result['rows'][0]['sp_insert_country'];
    }
    async insertCustomer({ firstName, lastName, address, phoneNo, creditCardNo, userId }) {
        const bindedFunction = insertCustomer.bind(this);
        return await bindedFunction({ firstName, lastName, address, phoneNo, creditCardNo, userId });
    }
    async deleteAll() {
        await this.db.raw(`call sp_delete_all();`);
    }

    async deleteAirline(airlineId) {
        const result = await this.db.raw(`select * from sp_delete_airline(${airlineId});`);
        return result['rowCount'];
    }
    async deleteCountry(airlineId) {
        const result = await this.db.raw(`select * from sp_delete_country(${airlineId});`);
        return result['rowCount'];
    }
    async deleteCustomer(customerId) {
        const result = await this.db.raw(`select * from sp_delete_customer(${customerId});`);
        return result['rowCount'];
    }

    async deleteTicket(ticketId) {
        const result = await this.db.raw(`select * from sp_delete_ticket(${ticketId});`);
        return result['rowCount'];
    }
    async deleteUser(userId) {
        const result = await this.db.raw(`select * from sp_delete_user(${userId});`);
        return result['rowCount'];
    }

    async updateCountry(id, name) {
        await this.db.raw(`call sp_update_country(${id}, '${name}');`);
    }
    async updateCustomer({ id, firstName, lastName, address, phoneNo, creditCardNo, userId }) {
        const bindedFunction = updateCustomer.bind(this);
        return await bindedFunction({ id, firstName, lastName, address, phoneNo, creditCardNo, userId });
    }

    async upsertAirline(name, countryId, userId) {
        const result = await this.db.raw(`select * from sp_upsert_airline('${name}', ${countryId}, ${userId} );`);
        return result.rows[0]['sp_upsert_airline'];
    }
    async upsertCustomer({ firstName, lastName, address, phoneNo, creditCardNo, userId }) {
        const bindedFunction = upsertCustomer.bind(this);
        return await bindedFunction({ firstName, lastName, address, phoneNo, creditCardNo, userId });
    }
    async upsertUser(name, password, email) {
        const result = await this.db.raw(`select * from sp_upsert_user('${name}', '${password}', '${email}');`);
        return result.rows[0]['sp_upsert_user'];
    }
}

module.exports = AdminDriver;
