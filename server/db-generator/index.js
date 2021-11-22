const config = require('config');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dbConfig = config.get('db');
const scale = config.get('scale');
const { resetDb } = require('./utils');

const knex = require('./knex-connector');
const db = knex(dbConfig);

async function init() {
    await resetDb(db);
    const totalCountries = await generateCountries();
    await generateUsersAndCustomers();
    await generateAirlines(totalCountries);
    const totalFlights = await generateFlights(totalCountries);
    await generateTickets(totalFlights);
    process.exit();
}

const randomDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const currentMonth = now.getMonth();
    const month = getRandom(currentMonth, 11);
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = getRandom(1, daysInMonth);
    const hours = getRandom(1, 24);
    const minutes = getRandom(1, 60);
    const seconds = getRandom(1, 24);
    return new Date(year, month, day, hours, minutes, seconds);
};

async function generateCountries() {
    try {
        const countries = JSON.parse(fs.readFileSync(path.join(__dirname, './data/countries.json')));

        for (const { name } of countries) {
            const cleanedName = name.common.replace(/'/g, '');
            await db.raw(`select * from sp_insert_country('${cleanedName}');`);
        }
        console.log('Added countries');
        return countries.length;
    } catch (err) {
        console.log('Error inserting countries:\n', err);
    }
}

async function generateUsersAndCustomers() {
    try {
        const response = await axios.get(`https://randomuser.me/api/?results=${scale.users}&seed=bbb`);

        let i = 0;
        for (const { name, login, email, location, phone } of response.data.results) {
            const query = `select * from sp_insert_user('${login.username}', '${login.password}', '${email}', '${
                i <= scale.customers ? 'customer' : 'user'
            }');`;
            const result = await db.raw(query);
            if (++i <= scale.customers) {
                const userId = result.rows[0]['sp_insert_user'];

                await db.raw(
                    `select * from sp_insert_customer('${name.first}', '${name.last}', '${location.city}', '${phone}', '${login.uuid}', ${userId});`
                );
            }
        }
        await db.raw(`select * from sp_insert_user('admin', 'admin', 'yardenporat@gmail.com', 'admin');`);
        await db.raw(`select * from sp_insert_user('airline', 'airline', 'airline@gmail.com', 'airline');`);
        await db.raw(`select * from sp_insert_user('customer', 'customer', 'customer@gmail.com', 'customer');`);
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
            const maxFlightsPerAirline = scale.flights_per_airline;
            const airlineFlightCount = getRandom(parseInt(maxFlightsPerAirline / 2), maxFlightsPerAirline);
            for (let j = 0; j < airlineFlightCount; j++) {
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

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertToSqlDate(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

init();
