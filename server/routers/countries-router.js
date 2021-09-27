const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the country
 *         name:
 *           type: string
 *           description: The name of the country
 *       example:
 *         id: 24,
 *         name: "Puerto Rico"
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
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
router.get('/', anonymousController.getAllCountries);

module.exports = router;
