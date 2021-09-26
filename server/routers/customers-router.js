const { Router } = require('express');
const { requireAuth } = require('../middleware/auth-middleware');
const anonymousController = require('../controllers/anonymous-controller');
const customerController = require('../controllers/customer-controller');
const adminController = require('../controllers/admin-controller');
const router = Router();

router.get('/:id', requireAuth, customerController.getCustomerById);
router.get('/', requireAuth, adminController.getAllCustomers);
router.post('/', anonymousController.insertCustomer);
router.put('/', requireAuth, customerController.updateCustomer);
router.delete('/:id', requireAuth, adminController.deleteCustomer);

module.exports = router;
