const { Router } = require('express');
const { requireAuth } = require('../middleware/auth-middleware');
const customerController = require('../controllers/customer-controller');
const router = Router();

router.get('/by-customer/:customerId', requireAuth, customerController.getTicketsByCustomerId);
router.post('/', requireAuth, customerController.insertTicket);
router.delete('/:id', requireAuth, customerController.deleteTicket);

module.exports = router;
