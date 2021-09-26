const bl = require('../flight-service-bl');

async function getAllAirlines(req, res) {
    try {
        const airlines = await bl.getAllAirlines();
        await res.status(200).json(airlines);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getAirlineById(req, res) {
    const id = req.params.id;
    try {
        const airline = await bl.getAirlineById(JSON.stringify({ id }));
        await res.status(200).json(airline);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllAirlines, getAirlineById };
