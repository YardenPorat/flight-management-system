const bl = require('../flight-service-bl');
const { isAuthorized } = require('./utils/is-authorized');

async function updateAirline(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'airline');
        const airline = await bl.updateAirline(JSON.stringify(req.body));
        await res.status(200).json(airline);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function insertFlight(req, res) {
    try {
        isAuthorized(res.locals.token.role, 'airline');
        const flightId = await bl.insertFlight(JSON.stringify(req.body));
        await res.status(200).json({ flightId });
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function deleteFlight(req, res) {
    const { id } = req.params;
    try {
        isAuthorized(res.locals.token.role, 'airline');
        const deleteCount = await bl.deleteFlight(JSON.stringify({ id }));
        await res.status(200).json(deleteCount);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = {
    insertFlight,
    updateAirline,
    deleteFlight,
};
