import express from 'express';
import controller from '../controllers/UserControl';
import { authenticateToken } from '../middleware/authendicateToken';

const router = express.Router();
   /**
 * @swagger
 * /sample:
 *   get:
 *     summary: Returns a sample message
 *     responses:
 *       200:
 *         description: A successful response
 */

 router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
 router.get('/', (req, res, next) => res.status(200).json({ message: 'BHuvan Server connected' }));
router.post('/register', controller.userController.register);
 /*
     * @openapi
     * '/api/login':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Login as a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: bhuvan
     *              password:
     *                type: string
     *                default: bhuvan@123
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post('/login', controller.userController.login);
router.post('/logout', authenticateToken, controller.userController.logout);

export = router;
