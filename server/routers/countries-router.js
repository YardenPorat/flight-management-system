const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const router = Router();

router.get('/', anonymousController.getAllCountries);

module.exports = router;
