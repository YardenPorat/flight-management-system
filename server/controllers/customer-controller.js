const bl = require('../flight-service-bl');
const { isAuthorized } = require('./utils/is-authorized');
const { logError } = require('../loggers/error-logger');

const CUSTOMER = 'customer';

async function getCustomerById(req, res) {
    try {
        isAuthorized(res.locals.token.role, CUSTOMER);
        const id = req.params.id;
        const airline = await bl.getCustomerById(JSON.stringify({ id }));
        await res.status(200).json(airline);
    } catch (err) {
        logError('getCustomerById', JSON.stringify(err));
        await res.status(500).json({ message: err.message });
    }
}

async function getTicketsByCustomerId(req, res) {
    try {
        isAuthorized(res.locals.token.role, CUSTOMER);
        const { customerId } = req.params;
        const tickets = await bl.getTicketsByCustomerId(JSON.stringify({ customerId }));
        await res.status(200).json(tickets);
    } catch (err) {
        logError('getTicketsByCustomerId', JSON.stringify(err));
        await res.status(500).json({ message: err.message });
    }
}

async function insertTicket(req, res) {
    try {
        isAuthorized(res.locals.token.role, CUSTOMER);
        const ticketId = await bl.insertTicket(JSON.stringify(req.body));
        await res.status(200).json({ ticketId });
    } catch (err) {
        logError('insertTicket', JSON.stringify(err));
        await res.status(500).json({ message: err.message });
    }
}

async function deleteTicket(req, res) {
    try {
        isAuthorized(res.locals.token.role, CUSTOMER);
        const deleteCount = await bl.deleteTicket(JSON.stringify({ id: req.params.id }));
        await res.status(200).json({ deleteCount });
    } catch (err) {
        logError('deleteTicket', JSON.stringify(err));
        await res.status(500).json({ message: err.message });
    }
}

async function updateCustomer(req, res) {
    try {
        isAuthorized(res.locals.token.role, CUSTOMER);
        const customer = await bl.updateCustomer(JSON.stringify(req.body));
        await res.status(200).json(customer);
    } catch (err) {
        logError('updateCustomer', JSON.stringify(err));
        await res.status(500).json({ message: err.message });
    }
}

module.exports = { getCustomerById, getTicketsByCustomerId, insertTicket, deleteTicket, updateCustomer };
