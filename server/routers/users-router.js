const { Router } = require('express');
const anonymousController = require('../controllers/anonymous-controller');
const adminController = require('../controllers/admin-controller');
const { requireAuth } = require('../middleware/auth-middleware');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: hashed password
 *         email:
 *           type: string
 *           description: user's email
 *         role:
 *           type: string
 *           description: user's role
 *       example:
 *         id: 1,
 *         name: username,
 *         password: wage,
 *         email: mads.poulsen@zexample.com,
 *         role: user
 */

/**
 * @swagger
 * /users/check-availability/{username}:
 *   get:
 *     summary: Login the users
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username to be checked
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { "isAvailable": true}
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *               type: object
 *               example: { "message": "Internal server error"}
 */
router.get('/check-availability/:username', anonymousController.isUsernameAvailable);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/User'
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
router.get('/:id', requireAuth, adminController.getUserById);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
router.get('/', requireAuth, adminController.getAllUsers);

module.exports = router;
