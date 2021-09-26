const bl = require('../flight-service-bl');

async function getAirlineById(req, res) {
    const id = req.params.id;
    try {
        const airline = await bl.getAirlineById(JSON.stringify({ id }));
        await res.status(200).json(airline);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}
async function getFlightById(req, res) {
    const id = req.params.id;
    try {
        const airline = await bl.getFlightById(JSON.stringify({ id }));
        await res.status(200).json(airline);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}
async function getAllAirlines(req, res) {
    try {
        const airlines = await bl.getAllAirlines();
        await res.status(200).json(airlines);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getAllCountries(req, res) {
    try {
        const countries = await bl.getAllCountries();
        await res.status(200).json(countries);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await bl.getAllFlights();
        await res.status(200).json(flights);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function isUsernameAvailable(req, res) {
    const { username } = req.params;
    try {
        const isAvailable = await bl.isUsernameAvailable(JSON.stringify({ username }));
        await res.status(200).json({ isAvailable });
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function insertCustomer(req, res) {
    try {
        const customerId = await bl.insertCustomer(JSON.stringify(req.body));
        await res.status(200).json(customerId);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getFlightsByAirlineId(req, res) {
    const { id } = req.params;
    try {
        const flights = await bl.getFlightsByAirlineId(JSON.stringify({ airlineId: id }));
        await res.status(200).json(flights);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getFlightsByParameters(req, res) {
    try {
        const flights = await bl.getFlightsByParameters(JSON.stringify(req.body));
        await res.status(200).json(flights);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getArrivalFlights(req, res) {
    const { countryId } = req.params;
    try {
        const flights = await bl.getArrivalFlights(JSON.stringify({ countryId }));
        await res.status(200).json(flights);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

async function getDepartureFlights(req, res) {
    const { countryId } = req.params;
    try {
        const flights = await bl.getDepartureFlights(JSON.stringify({ countryId }));
        await res.status(200).json(flights);
    } catch (err) {
        await res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllAirlines,
    getDepartureFlights,
    getAirlineById,
    insertCustomer,
    isUsernameAvailable,
    getAllFlights,
    getFlightById,
    getFlightsByAirlineId,
    getFlightsByParameters,
    getArrivalFlights,
    getAllCountries,
};
