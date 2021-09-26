const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
// const adminController = require('../controllers/admin-controller');
// const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/by-airline/:id', anonymousController.getFlightsByAirlineId);
router.get('/by-parameters', anonymousController.getFlightsByParameters);
router.get('/arrivals/:countryId', anonymousController.getArrivalFlights);
router.get('/departures/:countryId', anonymousController.getDepartureFlights);
router.get('/:id', anonymousController.getFlightById);
router.get('/', anonymousController.getAllFlights);
// router.post('/', requireAuth, adminController.insertAirline);

module.exports = router;
