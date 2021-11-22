const { Router } = require('express');
const { requireAuth } = require('../middleware/auth-middleware');
const anonymousController = require('../controllers/anonymous-controller');
const customerController = require('../controllers/customer-controller');
const adminController = require('../controllers/admin-controller');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewCustomer:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the customer
 *         lastName:
 *           type: string
 *           description: The last name of the customer
 *         address:
 *           type: string
 *           description: The address of the customer
 *         phoneNo:
 *           type: string
 *           description: The phone number of the customer
 *         creditCardNo:
 *           type: string
 *           description: The credit card number of the customer
 *         userId:
 *           type: number
 *           description: The user id associated the customer
 *       example:
 *          {
 *            "firstName": "fname",
 *            "lastName": "lname",
 *            "address": "pt",
 *            "phoneNo": "911asdasdzasd1111",
 *            "creditCardNo": "asdasdzz99",
 *            "userId": 82
 *          }
 *
 *     Customer:
 *       allOf:
 *         - $ref: '#/components/schemas/NewCustomer'
 *         - type: object
 *           properties:
 *             id:
 *               type: number
 *               description: The auto-generated id of the customer
 *             firstName:
 *               type: string
 *               description: The first name of the customer
 *             lastName:
 *               type: string
 *               description: The last name of the customer
 *             address:
 *               type: string
 *               description: The address of the customer
 *             phoneNo:
 *               type: string
 *               description: The phone number of the customer
 *             creditCardNo:
 *               type: string
 *               description: The credit card number of the customer
 *             userId:
 *               type: number
 *               description: The user id associated the customer
 *           example:
 *              {
 *                "id": 2,
 *                "firstName": "fname",
 *                "lastName": "lname",
 *                "address": "pt",
 *                "phoneNo": "911asdasdzasd1111",
 *                "creditCardNo": "asdasdzz99",
 *                "userId": 82
 *              }
 */

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer's ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Customer'
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
router.get('/:id', requireAuth, customerController.getCustomerById);

router.post('/get-customer-by-username', requireAuth, customerController.getCustomerByUsername);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
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
router.get('/', requireAuth, adminController.getAllCustomers);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create new customer
 *     tags: [Customers]
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/NewCustomer'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customerId:
 *                   type: string,
 *                   description: the new customer's ID
 *                   example: "1"
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
router.post('/', anonymousController.insertCustomer);

/**
 * @swagger
 * /customers:
 *   put:
 *     summary: Update existing customer
 *     tags: [Customers]
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/Customer'
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
router.put('/', requireAuth, customerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer's id
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
router.delete('/:id', requireAuth, adminController.deleteCustomer);

module.exports = router;
