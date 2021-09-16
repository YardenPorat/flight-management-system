const config = require('config');
const { expect } = require('chai');
const { resetDb } = require('../db-generator/utils');
const AirlineDriver = require('../dao/airline-dao');

describe('test airline user dao', () => {
    const dbConfig = config.get('test-db');
    const knex = require('../db-generator/knex-connector');
    const db = knex(dbConfig);

    const airlineDriver = new AirlineDriver(db);

    beforeEach(async function () {
        await resetDb(db);
        await db.raw(
            `
        select * from sp_insert_country('Israel');
        select * from sp_insert_country('USA');
        select * from sp_insert_country('UAE');
        select * from sp_insert_user('User1', '11','11@g.com');
        select * from sp_insert_user('User2', '22','22@g.com');
        select * from sp_insert_user('User3', '33','33@g.com');
        select * from sp_insert_customer('Customer1','Dan', 'Tel Aviv','123', '123', 1);
        select * from sp_insert_customer('Customer2','Ben', 'Tel Aviv','1123', '1232', 2);
        select * from sp_insert_customer('Customer3','Avi', 'Tel Aviv','11231', '12321', 3);
        select * from sp_insert_airline('Airline1', 1, 1);
        select * from sp_insert_airline('Airline2', 2, 2);
        select * from sp_insert_airline('Airline3', 3, 3);
        --_airline_id bigint, _origin_country_id int, _destination_country_id int, _departure_time timestamp, _landing_time timestamp, _remaining_tickets int
        select * from sp_insert_flight(1, 1, 3, current_timestamp::timestamp, now()::timestamp, 100);
        select * from sp_insert_flight(2, 2, 3, current_timestamp::timestamp, now()::timestamp, 100);
        select * from sp_insert_flight(3, 3, 1, current_timestamp::timestamp, now()::timestamp, 100);
        select * from sp_insert_ticket(1, 1);

        `.trim()
        );
        after(async function () {
            await db.destroy();
        });
    });
    it('insert flight', async function () {
        const newId = await airlineDriver.insertFlight({
            airlineId: 1,
            departureTime: '2020-09-13',
            landingTime: '2020-09-14',
            originCountryId: 1,
            destinationCountryId: 2,
            remainingTickets: 100,
        });
        expect(newId).to.equal('4');
    });

    it('delete flight', async function () {
        let flights = await airlineDriver.getAllFlights();
        expect(flights.length).to.equal(3);
        const deletedCount = await airlineDriver.deleteFlight(3);
        expect(deletedCount).to.equal(1);
        flights = await airlineDriver.getAllFlights();
        expect(flights.length).to.equal(2);
    });

    it('insert ticket', async function () {
        const newTicketId = await airlineDriver.insertTicket(1, 2);
        expect(newTicketId).to.equal(2);
    });
    it('update ticket', async function () {
        await airlineDriver.updateTicket(1, 1, 2);
        const ticket = await airlineDriver.getTicketById(1);
        expect(ticket['customer_id']).to.equal('2');
    });
    it('update airline', async function () {
        await airlineDriver.updateAirline({ id: 1, name: 'New name', countryId: 2, userId: 1 });
        const airline = await airlineDriver.getAirlineById(1);
        expect(airline.name).to.equal('New name');
    });
    it('update flight', async function () {
        await airlineDriver.updateFlight({
            id: 1,
            airlineId: 1,
            originCountryId: 1,
            destinationCountryId: 2,
            departureTime: new Date(),
            landingTime: new Date(),
            remainingTickets: 5,
        });
        const flight = await airlineDriver.getFlightById(1);
        expect(flight['remaining_tickets']).to.equal(5);
    });
});
