const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const airlineController = require('../controllers/airline-controller');
const { requireAuth } = require('../middleware/auth-middleware');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     FlightByParams:
 *       type: object
 *       required: true
 *       description: The flight origin and destination countries, and date
 *       properties:
 *         originCountryId:
 *           type: integer,
 *           description: the origin's ID
 *           example: 1
 *         destinationCountryId:
 *           type: integer,
 *           description: the airline's ID
 *           example: 2
 *         date:
 *           type: string,
 *           description: the departure date of the flight "YYYY-MM-DD"
 *           example: '2021-10-29'
 *     NewFlight:
 *       type: object
 *       required: true
 *       description: The new flight's details
 *       properties:
 *         airlineId:
 *           type: integer,
 *           description: the airline's ID
 *           example: 1
 *         departureTime:
 *           type: string,
 *           description: the departure date "YYYY-MM-DD HH:MM:SS"
 *           example:  "2020-09-15"
 *         landingTime:
 *           type: string,
 *           description: the landing date "YYYY-MM-DD HH:MM:SS"
 *           example:  "2020-09-16"
 *         originCountryId:
 *           type: integer,
 *           description: the origin's ID
 *           example: 1
 *         destinationCountryId:
 *           type: integer,
 *           description: the airline's ID
 *           example: 2
 *     Flight:
 *       allOf:
 *         - $ref: '#/components/schemas/NewFlight'
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: the auto generated flight id
 *               example: 1
 *
 *
 */

/**
 * @swagger
 * /flights/by-airline/{id}:
 *   get:
 *     summary: Get flights by airline ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The airline ID of which you want to get flights
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
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
router.get('/by-airline/:id', anonymousController.getFlightsByAirlineId);

/**
 * @swagger
 * /flights/by-parameters:
 *   get:
 *     summary: Get flights by parameters
 *     tags: [Flights]
 *     parameters:
 *       - in: body
 *         schema:
 *           $ref: '#/components/schemas/FlightByParams'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
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
router.get('/by-parameters', anonymousController.getFlightsByParameters);

/**
 * @swagger
 * /flights/arrivals/{countryId}:
 *   get:
 *     summary: Get arriving flights by countryId
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The country ID of which the flights are arriving
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
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
router.get('/arrivals/:countryId', anonymousController.getArrivalFlights);

/**
 * @swagger
 * /flights/departures/{countryId}:
 *   get:
 *     summary: Get departure flights by countryId
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: countryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The country ID from which the flights are departing
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
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
router.get('/departures/:countryId', anonymousController.getDepartureFlights);

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The flight's ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Flight'
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
router.get('/:id', anonymousController.getFlightById);

/**
 * @swagger
 * /flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flight'
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
router.get('/', anonymousController.getAllFlights);

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Insert new flight
 *     tags: [Flights]
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/NewFlight'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *               example:
 *                 flightId: 51
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
router.post('/', requireAuth, airlineController.insertFlight);

/**
 * @swagger
 * /flights/{id}:
 *   delete:
 *     summary: Delete flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The flight's id
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
router.delete('/:id', requireAuth, airlineController.deleteFlight);

module.exports = router;
