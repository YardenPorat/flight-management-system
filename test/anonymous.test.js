const config = require('config');
const { expect } = require('chai');
const { resetDb } = require('../db-generator/utils');
const AnonymousDriver = require('../dao/anonymous-dao');
const db = require('../db-generator/test-db');

describe('test anonymous user dao', () => {
    const anonymousDriver = new AnonymousDriver(db);

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
        --(airlineId, originId, destId, ...)
        select * from sp_insert_flight(1, 1, 3, now()::timestamp, now()::timestamp + interval '1 hour', 100);
        select * from sp_insert_flight(2, 2, 3, now()::timestamp - interval '2 hour', now()::timestamp - interval '1 hour', 100);
        select * from sp_insert_flight(3, 2, 1, now()::timestamp + interval '1 hour', now()::timestamp, 100);
        select * from sp_insert_flight(3, 1, 2, now()::timestamp + interval '1 hour', now()::timestamp, 100);
        select * from sp_insert_ticket(1, 1);
        select * from sp_insert_ticket(1, 2);
        `.trim()
        );
    });

    describe('sp_get', function () {
        it('airline by id', async function () {
            const id = 1;
            const airline = await anonymousDriver.getAirlineById(id);
            expect(airline['name']).to.equal('Airline1');
            expect(airline['country_id']).to.equal(1);
            expect(airline['id']).to.equal('1');
            expect(airline['user_id']).to.equal('1');
            expect(airline['name']).to.equal('Airline1');
        });
        it('airline by username', async function () {
            const username = 'User2';
            const airline = await anonymousDriver.getAirlineByUsername(username);
            expect(airline['airline_name']).to.equal('Airline2');
        });
        it('arrival flights', async function () {
            const countryId = 3;
            const flights = await anonymousDriver.getArrivalFlights(countryId);
            expect(flights.length).to.equal(1);
        });
        it('country by id', async function () {
            const id = 1;
            const country = await anonymousDriver.getCountryById(id);
            expect(country['name']).to.equal('Israel');
        });
        it('customer by id', async function () {
            const id = 1;
            const customer = await anonymousDriver.getCustomerById(id);
            expect(customer['first_name']).to.equal('Customer1');
        });
        it('customer by username', async function () {
            const username = 'User1';
            const customer = await anonymousDriver.getCustomerByUsername(username);
            expect(customer['first_name']).to.equal('Customer1');
        });
        it('departure flights', async function () {
            const countryId = 2;
            const flights = await anonymousDriver.getDepartureFlights(countryId);
            expect(flights.length).to.equal(1);
        });
        it('flight by id', async function () {
            const id = 1;
            const flight = await anonymousDriver.getFlightById(id);
            expect(flight['airline_id']).to.equal('1');
        });
        it('flights by airline id', async function () {
            const airlineId = 3;
            const flights = await anonymousDriver.getFlightsByAirlineId(airlineId);
            expect(flights.length).to.equal(2);
        });
        it('flights by parameters', async function () {
            const originCountryId = 1;
            const destinationCountryId = 3;
            const date = new Date();
            const flights = await anonymousDriver.getFlightsByAirlineId(originCountryId, destinationCountryId, date);
            expect(flights.length).to.equal(1);
        });
        it('ticket by id', async function () {
            const id = '1';
            const ticket = await anonymousDriver.getTicketById(id);
            expect(ticket.id).to.equal('1');
            expect(ticket.flight_id).to.equal('1');
            expect(ticket.customer_id).to.equal('1');
        });
        it('ticket by customer id', async function () {
            const id = '1';
            const ticket = await anonymousDriver.getTicketByCustomerId(id);
            expect(ticket.id).to.equal('1');
            expect(ticket.flight_id).to.equal('1');
            expect(ticket.customer_id).to.equal('1');
        });
        it('user by id', async function () {
            const id = '1';
            const user = await anonymousDriver.getUserById(id);
            expect(user.email).to.equal('11@g.com');
            expect(user.id).to.equal('1');
            expect(user.name).to.equal('User1');
            expect(user.password).to.equal('11');
        });
        it('user by username', async function () {
            const username = 'User1';
            const user = await anonymousDriver.getUserByUsername(username);
            expect(user.email).to.equal('11@g.com');
            expect(user.id).to.equal('1');
            expect(user.name).to.equal('User1');
            expect(user.password).to.equal('11');
        });
    });
});
