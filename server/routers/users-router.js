const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const router = Router();

router.get('/check-availability/:username', anonymousController.isUsernameAvailable);

module.exports = router;
