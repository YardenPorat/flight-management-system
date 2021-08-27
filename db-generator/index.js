const config = require('config');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const dbConfig = config.get('db');
const scale = config.get('scale');

const knex = require('./knex-connector');
const db = knex(dbConfig);

async function init() {
    await resetDb();
    const totalCountries = await generateCountries();
    await generateUsersAndCustomers();
    await generateAirlines(totalCountries);
    const totalFlights = await generateFlights(totalCountries);
    await generateTickets(totalFlights);
    process.exit();
}

async function resetDb() {
    try {
        await db.raw(`call sp_delete_all();`);
    } catch (err) {
        console.log('Could not reset db\n' + err);
    }
}

const randomDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = getRandom(0, 11);
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = getRandom(1, daysInMonth);
    const hours = getRandom(1, 24);
    const minutes = getRandom(1, 60);
    const seconds = getRandom(1, 24);
    return new Date(year, month, day, hours, minutes, seconds);
};

async function generateCountries() {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/all`);

        for (const { name } of response.data) {
            const cleanedName = name.replace(/'/g, '');
            await db.raw(`select * from sp_insert_country('${cleanedName}');`);
        }
        console.log('Added countries');
        return response.data.length;
    } catch (err) {
        console.log('Error inserting countries:\n', err);
    }
}

async function generateUsersAndCustomers() {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${scale.customers}&seed=bbb`);
        for (const { name, login, email, location, phone } of response.data.results) {
            const result = await db.raw(
                `select * from sp_insert_user('${login.username}', '${login.password}', '${email}');`
            );
            const userId = result.rows[0]['sp_insert_user'];
            await db.raw(
                `select * from sp_insert_customer('${name.first}', '${name.last}', '${location.city}', '${phone}', '${login.uuid}', ${userId});`
            );
        }
        console.log('Added users and customers');
    } catch (err) {
        console.log('Could not create users and customers:\n', err);
    }
}

const generateAirlines = async (totalCountries) => {
    try {
        const airlines = JSON.parse(fs.readFileSync(path.join(__dirname, './data/airlines.json'), 'utf8'));

        for (let i = 0; i < scale.airlines; i++) {
            const countryId = getRandom(1, totalCountries);
            await db.raw(`select * from sp_insert_airline('${airlines[i]['name']}', ${countryId}, ${i + 1});`);
        }
        console.log('Added airlines');
    } catch (err) {
        console.log('Could not create airlines:\n', err);
    }
};

const generateFlights = async (totalCountries) => {
    let totalFlights = 0;
    try {
        for (let airlineId = 1; airlineId <= scale.airlines; airlineId++) {
            const maxFlightsPerAirline = getRandom(1, scale.flights_per_airline);
            for (let j = 0; j < maxFlightsPerAirline; j++) {
                const originCountryId = getRandom(1, totalCountries);
                const destinationCountryId = getRandom(1, totalCountries);
                const remainingTickets = getRandom(0, scale.tickets_per_flight);
                const departureTime = randomDate();
                const landingTime = new Date(
                    new Date(departureTime).setHours(departureTime.getHours() + getRandom(1, 12))
                );

                await db.raw(
                    `select * from sp_insert_flight(${airlineId}, ${originCountryId}, ${destinationCountryId}, '${convertToSqlDate(
                        departureTime
                    )}', '${convertToSqlDate(landingTime)}', ${remainingTickets});`
                );
                totalFlights++;
            }
        }
        console.log('Added flights');
        return totalFlights;
    } catch (err) {
        console.log('Could not create flights:\n', err);
    }
};

async function generateTickets(totalFlights) {
    try {
        for (let i = 0; i < scale.customers; i++) {
            const flightId = getRandom(1, totalFlights);
            await db.raw(`select * from sp_insert_ticket('${flightId}','${i + 1}')`);
        }
        console.log('Added tickets');
    } catch (err) {
        console.log('Could not create tickets:\n', err);
    }
}

function getRandom(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function convertToSqlDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

init();
