const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { resetDb } = require('../db-generator/utils');
const db = require('../db-generator/db');
const { sqlDate } = require('../dao/utils');
const adminDriver = require('../dao/admin-dao');

describe('test admin user dao', () => {
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
        select * from sp_insert_user('user1', '111111','11@g.com');
        select * from sp_insert_user('user2', '222222','22@g.com');
        select * from sp_insert_user('user3', '333333','33@g.com');
        select * from sp_insert_user('user4', '444444','44@g.com');
        select * from sp_insert_user('user5', '555555','5@g.com');
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
        select * from sp_insert_user('John Doe', 'pw1123','user1@1.com');
        select * from sp_insert_user('Jane Dow', 'pw2123','user2@1.com');
        `.trim()
        );
    });

    it('insert airline', async function () {
        const newId = await adminDriver.insertAirline({
            airlineName: 'Elal',
            countryId: 1,
            userId: 5,
        });
        expect(newId).to.equal('5');
    });
    it('insert country', async function () {
        const newId = await adminDriver.insertCountry('NewCountry');
        expect(newId).to.equal(5);
    });
    it('insertCustomer', async function () {
        const newId = await adminDriver.insertCustomer({
            firstName: 'fname',
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        expect(newId).to.equal('4');
    });
    it('insert flight with correct data', async function () {
        const newId = await adminDriver.insertFlight({
            airlineId: 1,
            departureTime: '2020-09-13',
            landingTime: '2020-09-14',
            originCountryId: 1,
            destinationCountryId: 2,
            remainingTickets: 100,
        });
        expect(newId).to.equal('2');
    });
    it('insert flight with incorrect departure date', async function () {
        const promise = adminDriver.insertFlight({
            airlineId: 1,
            departureTime: '2020-09-15',
            landingTime: '2020-09-14',
            originCountryId: 1,
            destinationCountryId: 2,
            remainingTickets: 100,
        });
        await expect(promise).to.be.rejectedWith(Error);
    });
    it('insert flight with negative number of tickets', async function () {
        const promise = adminDriver.insertFlight({
            airlineId: 1,
            departureTime: '2020-09-13',
            landingTime: '2020-09-14',
            originCountryId: 1,
            destinationCountryId: 2,
            remainingTickets: -100,
        });
        await expect(promise).to.be.rejectedWith(Error);
    });

    it('insert flight with negative number of tickets', async function () {
        const promise = adminDriver.insertFlight({
            airlineId: 1,
            departureTime: '2020-09-13',
            landingTime: '2020-09-14',
            originCountryId: 1,
            destinationCountryId: 1,
            remainingTickets: -100,
        });
        await expect(promise).to.be.rejectedWith(Error);
    });

    it('insert user with correct data', async function () {
        const newId = await adminDriver.insertUser('a', '123456', 'email@email.com');
        expect(newId).to.equal('8');
    });

    it('insert user with password length lower than 6', async function () {
        const promise = adminDriver.insertUser('a', 'pw', 'email@email.com');
        await expect(promise).to.be.rejectedWith(Error);
    });

    it('update user', async function () {
        const id = 1;
        const newEmail = 'updated@email.com';
        await adminDriver.updateUser({ id, username: 'a', password: 'pw1111111', email: newEmail });
        const user = await adminDriver.getUserById(id);
        expect(user.email).to.equal(newEmail);
    });

    it('upsert existing airline', async function () {
        const newId = await adminDriver.upsertAirline('Airline4', 2, 4);
        expect(newId).to.equal(0);
        const airline = await adminDriver.getAirlineById(4);
        expect(airline['country_id']).to.equal(2);
    });

    it('upsert new airline', async function () {
        const newId = await adminDriver.upsertAirline('newAirline', 2, 5);
        expect(newId).to.equal(5);
    });

    it('upsert existing customer', async function () {
        const newFirstName = 'updated name';
        const newId = await adminDriver.upsertCustomer({
            firstName: newFirstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 3,
        });
        expect(newId).to.equal(0);
        const user = await adminDriver.getCustomerById(3);
        expect(user['first_name']).to.equal(newFirstName);
    });
    it('upsert new customer', async function () {
        const firstName = 'New customer';
        const newId = await adminDriver.upsertCustomer({
            firstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        expect(newId).to.equal(4);
    });
    it('upsertUser', async function () {
        const newUsername = 'abcd';
        const newId = await adminDriver.upsertUser(newUsername, '123123', '11@g.com');
        expect(newId).to.equal('0');
        const user = await adminDriver.getUserById(1);
        expect(user['name']).to.equal(newUsername);
    });
    it('upsertUser', async function () {
        const newId = await adminDriver.upsertUser('someName', 'password', 'zzz@zzz.com');
        expect(newId).to.equal('8');
    });

    it('getAllCountries', async () => {
        const result = await adminDriver.getAllCountries();
        const countries = result.map(({ name }) => name);
        expect(countries).to.include('UAE');
        expect(countries).to.include('Israel');
        expect(countries).to.include('USA');
    });
    it('getAllCustomers', async () => {
        const result = await adminDriver.getAllCustomers();
        const customers = result.map(({ first_name }) => first_name);
        expect(customers).to.include('Customer1');
        expect(customers).to.include('Customer2');
        expect(customers).to.include('Customer3');
    });
    it('getAllAirlines', async () => {
        const result = await adminDriver.getAllAirlines();
        const airlines = result.map(({ name }) => name);
        expect(airlines).to.include('Airline1');
        expect(airlines).to.include('Airline2');
        expect(airlines).to.include('Airline3');
        expect(airlines).to.include('Airline4');
    });
    it('get all flights', async () => {
        const flights = await adminDriver.getAllFlights();
        expect(flights.length).to.equal(1);
        expect(flights[0]['id']).to.equal('1');
        expect(flights[0]['airline_id']).to.equal('1');
        expect(flights[0]['origin_country_id']).to.equal(1);
        expect(flights[0]['remaining_tickets']).to.equal(50);
    });
    it('get all tickets', async () => {
        const tickets = await adminDriver.getAllTickets();
        expect(tickets.length).to.equal(2);
        expect(tickets[0]['id']).to.equal('1');
        expect(tickets[0]['flight_id']).to.equal('1');
        expect(tickets[0]['customer_id']).to.equal('1');
    });
    it('get all users', async () => {
        const users = await adminDriver.getAllUsers();
        expect(users.length).to.equal(7);
        expect(users[0]['id']).to.equal('1');
        expect(users[0]['name']).to.equal('user1');
        expect(users[0]['password']).to.equal('111111');
        expect(users[0]['email']).to.equal('11@g.com');
    });
    it('delete all', async function () {
        await adminDriver.deleteAll();
        const users = await adminDriver.getAllUsers();
        expect(users.length).to.equal(0);
        const tickets = await adminDriver.getAllTickets();
        expect(tickets.length).to.equal(0);
        const flights = await adminDriver.getAllFlights();
        expect(flights.length).to.equal(0);
        const airlines = await adminDriver.getAllAirlines();
        expect(airlines.length).to.equal(0);
        const customers = await adminDriver.getAllCustomers();
        expect(customers.length).to.equal(0);
        const countries = await adminDriver.getAllCountries();
        expect(countries.length).to.equal(0);
    });
    it('deleteAirline', async function () {
        const deletedCount = await adminDriver.deleteAirline(3);
        expect(deletedCount).to.equal(1);
    });
    it('delete country', async function () {
        const deletedCount = await adminDriver.deleteCountry(4);
        expect(deletedCount).to.equal(1);
        const countries = await adminDriver.getAllCountries();
        expect(countries.length).to.equal(3);
    });
    it('deleteCustomer', async function () {
        const deletedCount = await adminDriver.deleteCustomer(3);
        expect(deletedCount).to.equal(1);
        const customers = await adminDriver.getAllCustomers();
        expect(customers.length).to.equal(2);
    });

    it('deleteTicket', async function () {
        const deletedCount = await adminDriver.deleteTicket(3);
        expect(deletedCount).to.equal(1);
        const tickets = await adminDriver.getAllTickets();
        expect(tickets.length).to.equal(2);
    });

    it('deleteUser', async function () {
        const deletedCount = await adminDriver.deleteUser(7);
        expect(deletedCount).to.equal(1);
        const users = await adminDriver.getAllUsers();
        expect(users.length).to.equal(6);
    });

    it('updateCountry', async function () {
        const id = 4;
        const name = 'United Kingdom';
        await adminDriver.updateCountry(id, name);
        const country = await adminDriver.getCountryById(id);
        expect(country.name).to.equal(name);
    });
    it('update customer', async function () {
        const newFirstName = 'updated name';
        await adminDriver.updateCustomer({
            id: 1,
            firstName: newFirstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        const user = await adminDriver.getCustomerById(1);
        expect(user['first_name']).to.equal(newFirstName);
    });
});
