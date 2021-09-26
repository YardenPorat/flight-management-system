const bl = require('../flight-service-bl');
const { isAuthorized } = require('./utils/is-authorized');

async function insertAirline(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'admin');
        const airlineId = await bl.insertAirline(JSON.stringify(req.body));
        await res.status(200).json(airlineId);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function deleteAirline(req, res) {
    const { id } = req.params;
    try {
        isAuthorized(res.locals.token.role, 'admin');
        const deleteCount = await bl.deleteAirline(JSON.stringify({ id }));
        await res.status(200).json({ deleteCount });
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}
async function deleteCustomer(req, res) {
    const { id } = req.params;
    try {
        isAuthorized(res.locals.token.role, 'admin');
        const deleteCount = await bl.deleteCustomer(JSON.stringify({ id }));
        await res.status(200).json({ deleteCount });
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getAllCustomers(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'admin');
        const airlines = await bl.getAllCustomers();
        await res.status(200).json(airlines);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getAllUsers(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'admin');
        const airlines = await bl.getAllUsers();
        await res.status(200).json(airlines);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getUserById(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'admin');
        const airline = await bl.getUserById(JSON.stringify({ id: req.params.id }));
        await res.status(200).json(airline);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = { insertAirline, deleteAirline, getAllCustomers, deleteCustomer, getAllUsers, getUserById };
