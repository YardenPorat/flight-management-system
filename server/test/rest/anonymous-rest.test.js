const newman = require('newman');
const db = require('../../db-generator/db');
const { resetDb } = require('../../db-generator/utils');
const { sqlDate } = require('../../dao/utils');

describe('anonymous-rest', function () {
    this.timeout(5_000);

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
            select * from sp_insert_flight(1, 1, 3, now()::timestamp, now()::timestamp + interval '1 hour', 100);
            select * from sp_insert_flight(2, 2, 3, now()::timestamp + interval '1 hour', now()::timestamp + interval '5 hour', 100);
            select * from sp_insert_ticket(1, 1);
            select * from sp_insert_ticket(1, 2);
    
            `.trim()
        );
    });

    it('test name', async function () {
        this.timeout(5_000);
        const runner = new Promise((resolve, reject) => {
            newman.run(
                {
                    collection: require('../postmen-exports/anonymous-controller.postman_collection.json'),
                    reporters: 'cli',
                },
                function (err) {
                    console.log('collection run complete!');
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
        await runner;
    });
});
