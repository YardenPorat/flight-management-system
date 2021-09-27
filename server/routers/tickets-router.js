const { Router } = require('express');
const { requireAuth } = require('../middleware/auth-middleware');
const customerController = require('../controllers/customer-controller');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the ticket
 *         flight_id:
 *           type: string
 *           description: The flight's id
 *         customer_id:
 *           type: string
 *           description: The customer's id
 *       example:
 *         id: 10
 *         flight_id: 9
 *         customer_id: 10
 */

/**
 * @swagger
 * /tickets/by-customer/{customerId}:
 *   get:
 *     summary: Get ticket by customerId
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         description: The customer's ID
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 *         content:
 *           html:
 *             example: Please login
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *               type: object
 *               example: { "message": "Internal server error"}
 */
router.get('/by-customer/:customerId', requireAuth, customerController.getTicketsByCustomerId);

/**
 * @swagger
 * /tickets:
 *   post:
 *     summary: Insert new ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *             flightId:
 *               type: string,
 *               description: the flight's ID
 *               example: 1
 *             customerId:
 *               type: number,
 *               description: the customer's ID
 *               example: 2
 *         required: true
 *         description: The ticket's details
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *               example:
 *                 ticketId: 51
 *       401:
 *         description: Unauthorized
 *         content:
 *           html:
 *             example: Please login
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *               type: object
 *               example: { "message": "Internal server error"}
 */
router.post('/', requireAuth, customerController.insertTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     summary: Delete ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ticket id
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *               example:
 *                 deleteCount: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           html:
 *             example: Please login
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *               type: object
 *               example: { "message": "Internal server error"}
 */
router.delete('/:id', requireAuth, customerController.deleteTicket);

module.exports = router;
