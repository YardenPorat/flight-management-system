const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const adminController = require('../controllers/admin-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/airlines/:id', anonymousController.getAirlineById);
router.get('/airlines', anonymousController.getAllAirlines);
router.post('/airlines', requireAuth, adminController.insertAirline);

module.exports = router;
