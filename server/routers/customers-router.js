const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
// const adminController = require('../controllers/admin-controller');
const router = Router();

// router.get('/airlines/:id', anonymousController.getAirlineById);
// router.get('/airlines', anonymousController.getAllAirlines);
router.post('/', anonymousController.insertCustomer);

module.exports = router;
