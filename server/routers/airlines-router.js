const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const adminController = require('../controllers/admin-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/:id', anonymousController.getAirlineById);
router.get('/', anonymousController.getAllAirlines);
router.post('/', requireAuth, adminController.insertAirline);

module.exports = router;
