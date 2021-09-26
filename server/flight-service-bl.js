const anonymousDao = require('../dao/anonymous-dao');
const adminDao = require('../dao/admin-dao');
const airlineDao = require('../dao/airline-dao');
const { logAction } = require('./action-logger');
const { ACTIONS } = require('./const');
const { updateUser } = require('../dao/admin-dao');

async function deleteAirline(data) {
    const { id } = JSON.parse(data);
    const airlineExist = await anonymousDao.getAirlineById(id);
    if (!airlineExist) {
        return new Error(`Airline id doesn't exist`);
    }
    await logAction(ACTIONS.deleteAirline, data);
    const result = await adminDao.deleteAirline(id);
    return result;
}

async function deleteCustomer(data) {
    const { id } = JSON.parse(data);
    const customerExist = await anonymousDao.getCustomerById(id);
    if (!customerExist) {
        return new Error(`Customer id doesn't exist`);
    }
    await logAction(ACTIONS.deleteAirline, data);
    const result = await adminDao.deleteCustomer(id);
    return result;
}

async function deleteFlight(data) {
    const { id } = JSON.parse(data);
    const flightExist = await anonymousDao.getFlightById(id);
    if (!flightExist) {
        return new Error(`Flight id doesn't exist`);
    }
    await logAction(ACTIONS.deleteFlight, data);
    const result = await airlineDao.deleteFlight(id);
    return result;
}
async function deleteTicket(data) {
    const { id } = JSON.parse(data);
    const ticketExist = await anonymousDao.getTicketById(id);
    if (!ticketExist) {
        return new Error(`Ticket id doesn't exist`);
    }
    await logAction(ACTIONS.deleteTicket, data);
    const result = await adminDao.deleteTicket(id);
    return result;
}

async function getAllAirlines() {
    const airlines = await anonymousDao.getAllAirlines();
    return airlines;
}
async function getAllCountries() {
    const countries = await anonymousDao.getAllCountries();
    return countries;
}
async function getAllCustomers() {
    const customers = await anonymousDao.getAllCustomers();
    return customers;
}
async function getAllFlights() {
    const flights = await anonymousDao.getAllFlights();
    return flights;
}
async function getAllUsers() {
    const users = await anonymousDao.getAllUsers();
    return users;
}
async function getAirlineById(data) {
    const { id } = JSON.parse(data);
    const airline = await anonymousDao.getAirlineById(id);
    if (!airline) {
        return new Error(`Airline doesn't exist`);
    }
    return airline;
}
async function getAirlineByUsername(data) {
    const { username } = JSON.parse(data);
    const usernameExist = await anonymousDao.getUserByUsername(username);
    if (!usernameExist) {
        return new Error(`Username doesn't exist`);
    }
    const airline = await anonymousDao.getAirlineByUsername(username);
    return airline;
}
async function getArrivalFlights(data) {
    const { countryId } = JSON.parse(data);
    const countryExist = await anonymousDao.getCountryById(countryId);
    if (!countryExist) {
        return new Error(`Country id doesn't exist`);
    }
    const arrivalFlights = await anonymousDao.getArrivalFlights(countryId);
    return arrivalFlights;
}
async function getCustomerById(data) {
    const { id } = JSON.parse(data);
    const customer = await anonymousDao.getCustomerById(id);
    if (!customer) {
        return new Error(`Customer id doesn't exist`);
    }
    return customer;
}
async function getCustomerByUsername(data) {
    const { username } = JSON.parse(data);
    const usernameExist = await anonymousDao.getUserByUsername(username);
    if (!usernameExist) {
        return new Error(`Username doesn't exist`);
    }
    const customer = await anonymousDao.getCustomerByUsername(username);
    return customer;
}

async function getDepartureFlights(data) {
    const { countryId } = JSON.parse(data);
    const countryExist = await anonymousDao.getCountryById(countryId);
    if (!countryExist) {
        return new Error(`Country id doesn't exist`);
    }
    const flights = await anonymousDao.getDepartureFlights(countryId);
    return flights;
}

async function getFlightById(data) {
    const { id } = JSON.parse(data);
    const flight = await anonymousDao.getFlightById(id);
    if (!flight) {
        return new Error(`Flight id doesn't exist`);
    }
    return flight;
}
async function getFlightsByAirlineId(data) {
    const { airlineId } = JSON.parse(data);
    const airlineExist = await anonymousDao.getAirlineById(airlineId);
    if (!airlineExist) {
        return new Error(`Airline doesn't exist`);
    }
    const flights = await anonymousDao.getFlightsByAirlineId(airlineId);
    return flights;
}
async function getFlightsByParameters(data) {
    const { originCountryId, destinationCountryId, date } = JSON.parse(data);
    const originCountryExist = await anonymousDao.getCountryById(originCountryId);
    if (!originCountryExist) {
        return new Error(`Origin country id doesn't exist`);
    }
    const destinationCountryExist = await anonymousDao.getCountryById(destinationCountryId);
    if (!destinationCountryExist) {
        return new Error(`Destination country id doesn't exist`);
    }
    const flights = await anonymousDao.getFlightsByParameters(originCountryId, destinationCountryId, date);
    return flights;
}

async function getTicketsByCustomerId(data) {
    const { customerId } = JSON.parse(data);
    const customerExist = await anonymousDao.getCustomerById(customerId);
    if (!customerExist) {
        return new Error(`Customer id doesn't exist`);
    }
    const tickets = await anonymousDao.getAllTickets();
    const customerTickets = tickets.filter((t) => t['customer_id'] == customerId);
    return customerTickets;
}

async function getUserById(data) {
    const { id } = JSON.parse(data);
    const user = await anonymousDao.getUserById(id);
    if (!user) {
        return new Error(`User id doesn't exist`);
    }
    return user;
}
async function getUserByUsername(data) {
    const { username } = JSON.parse(data);

    const user = await anonymousDao.getUserByUsername(username);
    if (!user) {
        return new Error(`Username doesn't exist`);
    }
    return user;
}
async function insertAirline(data) {
    const parsed = JSON.parse(data);
    const result = await adminDao.insertAirline(parsed);
    await logAction(ACTIONS.insertAirline, data);
    setUserRole(JSON.stringify({ userId: parsed.userId, role: 'airline' }));
    return result;
}
async function setUserRole(data) {
    const { userId, role } = JSON.parse(data);
    const user = await anonymousDao.getUserById(userId);
    updateUser({ ...user, role });
}

async function insertCustomer(data) {
    const customer = JSON.parse(data);
    await logAction(ACTIONS.insertCustomer, data);
    const newCustomer = await adminDao.insertCustomer(customer);
    return newCustomer;
}

async function insertFlight(data) {
    const parsed = JSON.parse(data);
    await logAction(ACTIONS.insertFlight, data);
    const result = await airlineDao.insertFlight(parsed);
    return result;
}

async function insertTicket(data) {
    const { flightId, customerId } = JSON.parse(data);
    const flightExist = await anonymousDao.getFlightById(flightId);
    if (!flightExist) {
        return new Error(`Flight id doesn't exist`);
    }
    await logAction(ACTIONS.insertTicket, data);
    const result = await airlineDao.insertTicket(flightId, customerId);
    return result;
}

async function isUsernameAvailable(data) {
    const { username } = JSON.parse(data);
    const users = await anonymousDao.getAllUsers();
    const result = !users.some((user) => user.name === username);
    return result;
}

async function updateAirline(data) {
    const parsed = JSON.parse(data);
    const airlineExist = await anonymousDao.getAirlineById(parsed.id);
    if (!airlineExist) {
        return new Error(`Airline doesn't exist`);
    }
    await logAction(ACTIONS.updateAirline, data);
    const result = await airlineDao.updateAirline(parsed);
    return result.rows[0];
}

async function updateCustomer(data) {
    const customer = JSON.parse(data);
    const customerExist = await anonymousDao.getCustomerById(customer.id);
    if (!customerExist) {
        return new Error(`Customer id doesn't exist`);
    }
    await logAction(ACTIONS.updateCustomer, data);
    const updatedCustomer = await adminDao.updateCustomer(customer);
    return updatedCustomer;
}

async function updateFlight(data) {
    const parsed = JSON.parse(data);
    const flightExist = await anonymousDao.getFlightById(parsed.id);
    if (!flightExist) {
        return new Error(`Flight id doesn't exist`);
    }
    await logAction(ACTIONS.updateFlight, data);
    const updatedFlight = await airlineDao.updateFlight(parsed);
    return updatedFlight;
}

module.exports = {
    deleteAirline,
    updateFlight,
    deleteCustomer,
    getAirlineById,
    getAirlineByUsername,
    getAllAirlines,
    getAllCustomers,
    getAllUsers,
    getCustomerById,
    getCustomerByUsername,
    getUserById,
    getUserByUsername,
    insertAirline,
    insertCustomer,
    updateAirline,
    updateCustomer,
    isUsernameAvailable,
    getAllFlights,
    getFlightById,
    getFlightsByAirlineId,
    getFlightsByParameters,
    getArrivalFlights,
    getDepartureFlights,
    insertFlight,
    deleteFlight,
    getTicketsByCustomerId,
    insertTicket,
    deleteTicket,
    getAllCountries,
};
