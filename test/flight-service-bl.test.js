const { expect } = require('chai');
const bl = require('../server/flight-service-bl');
const { sqlDate } = require('../dao/utils');
const { resetDb } = require('../db-generator/utils');
const db = require('../db-generator/db');

describe('Flight service BL', function () {
    beforeEach(async function () {
        await resetDb(db);
        await db.raw(
            `
        select * from sp_insert_country('Israel');
        select * from sp_insert_country('USA');
        select * from sp_insert_country('UAE');
        select * from sp_insert_country('UK');
        `.trim()
        );
        await db.raw(
            `
        select * from sp_insert_user('user1', '111111','11@g.com', 'customer');
        select * from sp_insert_user('user2', '222222','22@g.com', 'customer');
        select * from sp_insert_user('user3', '333333','33@g.com', 'customer');
        select * from sp_insert_user('user4', '444444','44@g.com', 'customer');
        select * from sp_insert_user('user5', '555555','5@g.com', 'customer');
        select * from sp_insert_user('John Doe', 'pw1123','user1@1.com', 'customer');
        select * from sp_insert_user('Jane Dow', 'pw2123','user2@1.com', 'customer');
        `.trim()
        );
        await db.raw(
            `
        select * from sp_insert_customer('Customer1','Dan', 'Tel Aviv','123', '123', 1);
        select * from sp_insert_customer('Customer2','Ben', 'Tel Aviv','1123', '1232', 2);
        select * from sp_insert_customer('Customer3','Avi', 'Tel Aviv','11231', '12321', 3);
        `.trim()
        );
        await db.raw(
            `
        select * from sp_insert_airline('Airline1', 1, 1);
        select * from sp_insert_airline('Airline2', 2, 2);
        select * from sp_insert_airline('Airline3', 3, 3);
        select * from sp_insert_airline('Airline4', 3, 4);
        `.trim()
        );
        await db.raw(
            `
        select * from sp_insert_flight('1', 1, 2, '${sqlDate('2021-09-15')}', '${sqlDate('2021-09-16')}', 50);
        select * from sp_insert_ticket(1, 1);
        select * from sp_insert_ticket(1, 2);
        select * from sp_insert_flight(1, 1, 3, now()::timestamp, now()::timestamp + interval '1 hour', 100);
        select * from sp_insert_flight(2, 2, 3, now()::timestamp - interval '2 hour', now()::timestamp - interval '1 hour', 100);
        select * from sp_insert_flight(3, 2, 1, now()::timestamp + interval '1 hour', now()::timestamp, 100);
        select * from sp_insert_flight(3, 1, 2, now()::timestamp + interval '1 hour', now()::timestamp, 100);
        `.trim()
        );
    });

    it('deleteAirline', async function () {
        const deletedCount = await bl.deleteAirline(JSON.stringify({ id: 4 }));
        expect(deletedCount).to.equal(1);
    });

    it('deleteCustomer', async function () {
        const deletedCount = await bl.deleteCustomer(JSON.stringify({ id: 3 }));
        expect(deletedCount).to.equal(1);
        const customers = await bl.getAllCustomers();
        expect(customers.length).to.equal(2);
    });
    it('deleteFlight', async function () {
        const flights = await bl.getAllFlights();
        const deletedCount = await bl.deleteFlight(JSON.stringify({ id: 3 }));
        expect(deletedCount).to.equal(1);
        const updatedFlights = await bl.getAllFlights();
        expect(updatedFlights.length).to.equal(flights.length - 1);
    });

    it('deleteTicket', async function () {
        const deletedCount = await bl.deleteTicket(JSON.stringify({ id: 2 }));
        expect(deletedCount).to.equal(1);
    });

    it('getAllAirlines', async () => {
        const result = await bl.getAllAirlines();
        const airlines = result.map(({ name }) => name);
        expect(airlines).to.include('Airline1');
        expect(airlines).to.include('Airline2');
        expect(airlines).to.include('Airline3');
        expect(airlines).to.include('Airline4');
    });

    it('getAllCustomers', async () => {
        const result = await bl.getAllCustomers();
        const customers = result.map(({ first_name }) => first_name);
        expect(customers).to.include('Customer1');
        expect(customers).to.include('Customer2');
        expect(customers).to.include('Customer3');
    });

    it('getAllCountries', async () => {
        const result = await bl.getAllCountries();
        const countries = result.map(({ name }) => name);
        expect(countries).to.include('UAE');
        expect(countries).to.include('Israel');
        expect(countries).to.include('USA');
    });

    it('getAllFlights', async () => {
        const flights = await bl.getAllFlights();
        expect(flights.length).to.equal(5);
        expect(flights[0]['id']).to.equal('1');
        expect(flights[0]['airline_id']).to.equal('1');
        expect(flights[0]['origin_country_id']).to.equal(1);
        expect(flights[0]['remaining_tickets']).to.equal(50);
    });

    it('getAllUsers', async () => {
        const users = await bl.getAllUsers();
        expect(users.length).to.equal(7);
        expect(users[0]['id']).to.equal('1');
        expect(users[0]['name']).to.equal('user1');
        expect(users[0]['password']).to.equal('111111');
        expect(users[0]['email']).to.equal('11@g.com');
    });

    it('getAirlineById', async () => {
        const data = JSON.stringify({ id: 1 });
        const airline = await bl.getAirlineById(data);
        expect(airline['name']).to.equal('Airline1');
        expect(airline['country_id']).to.equal(1);
        expect(airline['id']).to.equal('1');
        expect(airline['user_id']).to.equal('1');
        expect(airline['name']).to.equal('Airline1');
    });
    it('getAirlineByUsername', async () => {
        const data = JSON.stringify({ username: 'user2' });
        const airline = await bl.getAirlineByUsername(data);
        expect(airline['airline_name']).to.equal('Airline2');
    });
    it('getArrivalFlights', async function () {
        const flights = await bl.getArrivalFlights(JSON.stringify({ countryId: 3 }));
        expect(flights.length).to.equal(1);
    });
    it('getCustomerById', async function () {
        const customer = await bl.getCustomerById(JSON.stringify({ id: 1 }));
        expect(customer['first_name']).to.equal('Customer1');
    });
    it('getCustomerByUsername', async function () {
        const customer = await bl.getCustomerByUsername(JSON.stringify({ username: 'user1' }));
        expect(customer['first_name']).to.equal('Customer1');
    });
    it('getDepartureFlights', async function () {
        const flights = await bl.getDepartureFlights(JSON.stringify({ countryId: 2 }));
        expect(flights.length).to.equal(1);
    });
    it('getFlightsByAirlineId', async function () {
        const flights = await bl.getFlightsByAirlineId(JSON.stringify({ airlineId: 1 }));
        expect(flights.length).to.equal(2);
    });
    it('getFlightById', async function () {
        const flight = await bl.getFlightById(JSON.stringify({ id: 1 }));
        expect(flight['airline_id']).to.equal('1');
    });
    it('getFlightsByParameters', async function () {
        const data = JSON.stringify({ originCountryId: 1, destinationCountryId: 2, date: '2021-09-15' });
        const flights = await bl.getFlightsByParameters(data);
        expect(flights.length).to.equal(1);
        expect(flights[0]['airline_id']).to.equal('1');
    });
    it('getTicketsByCustomerId', async function () {
        const tickets = await bl.getTicketsByCustomerId(JSON.stringify({ customerId: 2 }));
        expect(tickets.length).to.equal(1);
    });
    it('getUserById', async function () {
        const user = await bl.getUserById(JSON.stringify({ id: '1' }));
        expect(user.email).to.equal('11@g.com');
        expect(user.id).to.equal('1');
        expect(user.name).to.equal('user1');
        expect(user.password).to.equal('111111');
    });
    it('getUserByUsername', async function () {
        const username = 'user1';
        const user = await bl.getUserByUsername(JSON.stringify({ username }));
        expect(user.email).to.equal('11@g.com');
        expect(user.id).to.equal('1');
        expect(user.name).to.equal(username);
        expect(user.password).to.equal('111111');
    });
    it('insertAirline', async () => {
        const data = JSON.stringify({
            airlineName: 'Elal',
            countryId: 1,
            userId: 5,
        });
        const newId = await bl.insertAirline(data);
        expect(newId).to.equal('5');
    });
    it('insertCustomer', async function () {
        const data = JSON.stringify({
            firstName: 'fname',
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        const newId = await bl.insertCustomer(data);
        expect(newId).to.equal('4');
    });
    it('insertFlight', async function () {
        const data = JSON.stringify({
            airlineId: 1,
            departureTime: '2020-09-13',
            landingTime: '2020-09-14',
            originCountryId: 1,
            destinationCountryId: 2,
            remainingTickets: 100,
        });
        const newId = await bl.insertFlight(data);
        expect(newId).to.equal('6');
    });
    it('insertTicket', async function () {
        const data = JSON.stringify({ flightId: 2, customerId: 2 });
        const newTicketId = await bl.insertTicket(data);
        expect(newTicketId).to.equal(3);
    });

    it('updateAirline', async function () {
        const data = JSON.stringify({ id: 1, name: 'New name', countryId: 2, userId: 1 });
        const updatedAirline = await bl.updateAirline(data);
        expect(updatedAirline.name).to.equal('New name');
    });
    it('updateCustomer', async function () {
        const newFirstName = 'updated name';
        const data = JSON.stringify({
            id: 1,
            firstName: newFirstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        const updatedCustomer = await bl.updateCustomer(data);
        expect(updatedCustomer['first_name']).to.equal(newFirstName);
    });
    it('updateFlight', async function () {
        const data = JSON.stringify({
            id: 1,
            airlineId: 1,
            originCountryId: 1,
            destinationCountryId: 2,
            departureTime: new Date(),
            landingTime: new Date(),
            remainingTickets: 5,
        });
        const updateFlight = await bl.updateFlight(data);
        expect(updateFlight['remaining_tickets']).to.equal(5);
    });
    it('isUsernameAvailable', async () => {
        const takenName = await bl.isUsernameAvailable(JSON.stringify({ username: 'user1' }));
        expect(takenName).to.equal(false);
    });
});
