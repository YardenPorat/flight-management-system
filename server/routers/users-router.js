const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const adminController = require('../controllers/admin-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/check-availability/:username', anonymousController.isUsernameAvailable);
router.get('/:id', requireAuth, adminController.getUserById);
router.get('/', requireAuth, adminController.getAllUsers);

module.exports = router;
