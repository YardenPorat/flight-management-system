const { expect } = require('chai');
const { resetDb } = require('../db-generator/utils');
const userDriver = require('../dao/user-dao');
const { sqlDate } = require('../dao/utils');
const db = require('../db-generator/db');

describe('test regular user dao', () => {
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
    it('insert customer', async function () {
        const newId = await userDriver.insertCustomer({
            firstName: 'fname',
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        expect(newId).to.equal('4');
    });
    it('update customer', async function () {
        const newFirstName = 'updated name';
        await userDriver.updateCustomer({
            id: 1,
            firstName: newFirstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        const user = await userDriver.getCustomerById(1);
        expect(user['first_name']).to.equal(newFirstName);
    });
    it('upsert existing customer', async function () {
        const newFirstName = 'updated name';
        const newId = await userDriver.upsertCustomer({
            firstName: newFirstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 3,
        });
        expect(newId).to.equal(0);
        const user = await userDriver.getCustomerById(3);
        expect(user['first_name']).to.equal(newFirstName);
    });
    it('upsert mew customer', async function () {
        const firstName = 'New customer';
        const newId = await userDriver.upsertCustomer({
            firstName,
            lastName: 'lname',
            address: 'pt',
            phoneNo: '9',
            creditCardNo: '99',
            userId: 4,
        });
        expect(newId).to.equal(4);
    });
});
