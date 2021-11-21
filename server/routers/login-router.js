const { Router } = require('express');
const loginController = require('../controllers/login-controller');
const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login the users
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { "user": "101"}
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { "message": "Invalid username or password"}
 */
router.post('/login', loginController.login);
/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           html:
 *              example: Logged out
 */
router.get('/logout', loginController.logout);

module.exports = router;
