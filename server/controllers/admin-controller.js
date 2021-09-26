const bl = require('../flight-service-bl');

async function insertAirline(req, res) {
    try {
        const airlineId = await bl.insertAirline(JSON.stringify(req.body));
        await res.status(200).json(airlineId);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = { insertAirline };
