const { Router } = require('express');
const { requireAuth } = require('../middleware/auth-middleware');
const anonymousController = require('../controllers/anonymous-controller');
const customerController = require('../controllers/customer-controller');
const router = Router();

router.get('/:id', customerController.getCustomerById);
router.post('/', anonymousController.insertCustomer);
router.put('/', requireAuth, customerController.updateCustomer);

module.exports = router;
