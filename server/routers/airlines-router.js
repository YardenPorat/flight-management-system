const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const adminController = require('../controllers/admin-controller');
const airlineController = require('../controllers/airline-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewAirline:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the airline
 *         countryId:
 *           type: number
 *           description: The country of the airline
 *         userId:
 *           type: number
 *           description: The user id associated the airline
 *       example:
 *         name: "New name"
 *         countryId: 2
 *         userId: 1
 *
 *     Airline:
 *       allOf:
 *         - $ref: '#/components/schemas/NewAirline'
 *         - type: object
 *           properties:
 *             id:
 *               type: number
 *               description: The auto-generated id of the airline
 *
 *           example:
 *             id: 1
 *             name: "New name"
 *             countryId: 2
 *             userId: 1
 */

/**
 * @swagger
 * /airlines/{id}:
 *   get:
 *     summary: Get airline by ID
 *     tags: [Airlines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The airline's ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Airline'
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
router.get('/:id', anonymousController.getAirlineById);

/**
 * @swagger
 * /airlines:
 *   get:
 *     summary: Get all airlines
 *     tags: [Airlines]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Airline'
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
router.get('/', anonymousController.getAllAirlines);

/**
 * @swagger
 * /airlines:
 *   post:
 *     summary: Create new airline
 *     tags: [Airlines]
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/NewAirline'
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
 *                   description: the new airline's ID
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
router.post('/', requireAuth, adminController.insertAirline);

/**
 * @swagger
 * /airlines:
 *   put:
 *     summary: Update existing airline
 *     tags: [Airlines]
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Airline'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/Airline'
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
router.put('/', requireAuth, airlineController.updateAirline);

/**
 * @swagger
 * /airlines/{id}:
 *   delete:
 *     summary: Delete airline by ID
 *     tags: [Airline]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The airline's id
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
router.delete('/:id', requireAuth, adminController.deleteAirline);

module.exports = router;
